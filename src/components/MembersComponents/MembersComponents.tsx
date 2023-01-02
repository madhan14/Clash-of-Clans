import { Card, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './MembersComponents.css';
import { useSearchParams } from "react-router-dom";
import { env } from "../../environment/environment";

const Members: React.FC = () => {

    if(!localStorage.getItem('playerID')){
        window.location.href = '/';
    }
    
    const [member, setMember] = useState<any>();
    const [activeTabKey, setActiveTabKey] = useState<string>('About You');
    const [searchParams] = useSearchParams();

    const tabList = [
        {
          key: 'About You',
          tab: 'About You',
        },
        {
          key: 'Achievements',
          tab: 'Achievements',
        },
        {
          key: 'Heroes',
          tab: 'Heroes',
        },
        {
          key: 'Troops',
          tab: 'Troops',
        },
        {
          key: 'Spells',
          tab: 'Spells',
        },
    ];
      
    const contentList: Record<any, React.ReactNode> = {
        'About You': <Table 
                dataSource={[
                    {
                        key: '1',
                        name: 'Name',
                        value: member?.name,
                    },
                    {
                        key: '2',
                        name: 'Role',
                        value: String(member?.role).toUpperCase(),
                    },
                    {
                        key: '3',
                        name: 'Experience Level',
                        value: member?.expLevel,
                    },
                    {
                        key: '4',
                        name: 'Town Hall',
                        value: member?.townHallLevel,
                    },
                    {
                        key: '5',
                        name: 'League',
                        value: member?.league.name,
                    },
                    {
                        key: '6',
                        name: 'Heighest Town Hall Trophies',
                        value: member?.bestTrophies,
                    },
                    {
                        key: '7',
                        name: 'Current Town Hall Trophies',
                        value: member?.trophies,
                    },
                    {
                        key: '8',
                        name: 'Builder Hall',
                        value: member?.builderHallLevel,
                    },
                    {
                        key: '9',
                        name: 'Heighest Builder Hall Trophies',
                        value: member?.bestVersusTrophies,
                    },
                    {
                        key: '10',
                        name: 'Current Builder Hall Trophies',
                        value: member?.versusTrophies,
                    },
                    {
                        key: '11',
                        name: 'Clan Capital Contributions',
                        value: member?.clanCapitalContributions,
                    },
                    {
                        key: '12',
                        name: 'Clan Name',
                        value: member?.clan.name,
                    },
                    {
                        key: '13',
                        name: 'Clan Level',
                        value: member?.clan.clanLevel,
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
        Achievements: <Table
                        dataSource={member?.achievements}
                        columns = {[
                            {
                                title: 'Achievement Name',
                                dataIndex: 'name',
                                key: 'name'
                            },
                            {
                                title: 'Achievement Info',
                                dataIndex: 'info',
                                key: 'info'
                            },
                            {
                                title: 'Stars',
                                dataIndex: 'stars',
                                key: 'stars'
                            },
                            {
                                title: 'Village',
                                dataIndex: 'village',
                                key: 'village'
                            }
                        ]}
                      />,
        Heroes: <Table
                    dataSource={member?.heroes}
                    columns= {[
                        {
                            title: 'Hero Name',
                            dataIndex: 'name',
                            key: 'name'
                        },
                        {
                            title: 'Level',
                            dataIndex: 'level',
                            key: 'level'
                        },
                        {
                            title: 'Base',
                            dataIndex: 'village',
                            key: 'village'
                        }
                    ]}
                />,
        Troops: <Table 
                    dataSource={member?.troops}
                    columns= {[
                        {
                            title: 'Troop Name',
                            dataIndex: 'name',
                            key: 'name'
                        },
                        {
                            title: 'Level',
                            dataIndex: 'level',
                            key: 'level'
                        },
                        {
                            title: 'Base',
                            dataIndex: 'village',
                            key: 'village'
                        }
                    ]}
                />,
        Spells: <Table 
                    dataSource={member?.spells}
                    columns= {[
                        {
                            title: 'Spell Name',
                            dataIndex:'name',
                            key:'name'
                        },
                        {
                            title: 'Level',
                            dataIndex: 'level',
                            key: 'level'
                        },
                        {
                            title: 'Base',
                            dataIndex: 'village',
                            key: 'village'
                        }
                    ]}
                />,
    };
    
    const onTabChange = (key: string) => {
        setActiveTabKey(key);
    };

    useEffect(() =>{
        axios
            .post(env.API_PATH, {
                "PlayerID": searchParams.get('member')
            })
            .then((response) => {
                setMember(response.data);
            })
            // eslint-disable-next-line
    }, [])

    return(
        <>
            <Card
                style={{ width: '100%' }}
                title={member?.name}
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={(key) => {
                    onTabChange(key);
                }}
                extra={<a href="/clan">Clan</a>}
            >
                { member ? contentList[activeTabKey] : '' }
            </Card>
        </>
    );

};

export default Members;