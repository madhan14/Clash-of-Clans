import { Card, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { env } from "../../environment/environment";

const Player: React.FC = () => {
    const [clan, setClan] = useState<any>();
    const [activeTabKey, setActiveTabKey] = useState<string>('About Clan');
    const clanID = localStorage.getItem('clanID');
    const navigate = useNavigate();
    const tabList = [
        {
          key: 'About Clan',
          tab: 'About Clan',
        },
        {
          key: 'Clan Capital',
          tab: 'Clan Capital',
        },
        {
          key: 'Clan Members',
          tab: 'Clan Members',
        },
        {
          key: 'Clan War',
          tab: 'Clan War',
        },
    ];
      
    const clanMember = (props: any) => {
        var member_id = props.innerHTML.split('#')[1];
        navigate({
            pathname: '/clanMember',
            search: createSearchParams({
                'member': member_id,
            }).toString()
        });
    }
    const contentList: Record<any, React.ReactNode> = {
        'About Clan': <Table 
                        dataSource={[
                            {
                                key: '1',
                                name: 'Name',
                                value: clan?.name,
                            },
                            {
                                key: '2',
                                name: 'Description',
                                value: clan?.description,
                            },
                            {
                                key: '3',
                                name: 'Location',
                                value: clan?.location.name,
                            },
                            {
                                key: '4',
                                name: 'Clan Level',
                                value: clan?.clanLevel,
                            },
                            {
                                key: '5',
                                name: 'Clan Points',
                                value: clan?.clanPoints,
                            },
                            {
                                key: '6',
                                name: 'Clan Versus Points',
                                value: clan?.clanVersusPoints,
                            },
                            {
                                key: '7',
                                name: 'Join type',
                                value: clan?.type,
                            },
                            {
                                key: '8',
                                name: 'Required Towh Hall Level to join',
                                value: clan?.requiredTownhallLevel,
                            },
                            {
                                key: '9',
                                name: 'Required Trophies to join',
                                value: clan?.requiredTrophies,
                            },
                            {
                                key: '10',
                                name: 'Required Versus Trophies Level to join',
                                value: clan?.requiredVersusTrophies,
                            },
                        ]}
                        columns={[
                            {
                              title: 'Name',
                              dataIndex: 'name',
                              key: 'name',
                            },
                            {
                              title: 'Value',
                              dataIndex: 'value',
                              key: 'value',
                            },
                        ]}
                      />,
        'Clan Capital': <div>
                            <Table 
                                dataSource={[
                                    {
                                        key: '1',
                                        name: 'Capital Hall Level',
                                        value: clan?.clanCapital.capitalHallLevel,
                                    },
                                    {
                                        key: '2',
                                        name: 'Capital Points',
                                        value: clan?.clanCapitalPoints,
                                    },
                                    {
                                        key: '3',
                                        name: 'Capital League',
                                        value: clan?.capitalLeague.name,
                                    },
                                ]}
                                columns={[
                                    {
                                        title: 'Name',
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                    {
                                        title: 'Value',
                                        dataIndex: 'value',
                                        key: 'value',
                                    }
                                ]}
                            />
                            <Table 
                                dataSource={clan?.clanCapital.districts}
                                columns={[
                                    {
                                        title: 'Districts',
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                    {
                                        title: 'Level',
                                        dataIndex: 'districtHallLevel',
                                        key: 'value',
                                    }
                                ]}
                            />
                        </div>,
        'Clan Members': <Table
                            dataSource={clan?.memberList}
                            columns= {[
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    key: 'name',
                                },
                                {
                                    title: 'Player Tag',
                                    dataIndex: 'tag',
                                    render: (text: string)=> <a href={text} onClick={(e) => clanMember(e.target)}>{text}</a>,
                                    key: 'name',
                                },
                                {
                                    title: 'Role',
                                    dataIndex: 'role',
                                    key: 'role',
                                },
                                {
                                    title: 'Experience',
                                    dataIndex: 'expLevel',
                                    key: 'expLevel',
                                },
                                {
                                    title: 'Trophies',
                                    dataIndex: 'trophies',
                                    key: 'trophies',
                                },
                                {
                                    title: 'Versus Trophies',
                                    dataIndex: 'versusTrophies',
                                    key: 'versusTrophies',
                                },
                                {
                                    title: '',
                                    key: '',
                                }
                            ]}
                        />,
        'Clan War': <Table 
                        dataSource={[
                            {
                                key: '1',
                                name: 'War League',
                                value: clan?.warLeague.name,
                            },
                            {
                                key: '2',
                                name: 'War wins',
                                value: clan?.warWins,
                            },
                            {
                                key: '3',
                                name: 'War loses',
                                value: clan?.warLosses,
                            }
                        ]}
                        columns={[
                            {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                            },
                            {
                            title: 'Value',
                            dataIndex: 'value',
                            key: 'value',
                            },
                        ]}
                    />,
    };
    
    const onTabChange = (key: string) => {
        setActiveTabKey(key);
    };

    useEffect(() =>{
        axios
            .post(env.API_PATH, {
                "ClanID": clanID?.split('#')[1]
            })
            .then((response) => {
                setClan(response.data);
            })
            // eslint-disable-next-line
    }, [])

    return(
        <>
            <Card
                style={{ width: '100%' }}
                title={clan?.name}
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={(key) => {
                    onTabChange(key);
                }}
                extra={<a href="/player">About you</a>}
            >
                {contentList[activeTabKey]}
            </Card>
        </>
    );

};

export default Player;