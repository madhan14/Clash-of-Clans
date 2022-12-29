import { Card, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './MembersComponents.css';
import { useSearchParams } from "react-router-dom";
import { env } from "../../environment/environment";

const Members: React.FC = () => {
    const [player, setPlayer] = useState<any>();
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
                        value: player?.name,
                    },
                    {
                        key: '2',
                        name: 'Role',
                        value: String(player?.role).toUpperCase(),
                    },
                    {
                        key: '3',
                        name: 'Experience Level',
                        value: player?.expLevel,
                    },
                    {
                        key: '4',
                        name: 'Town Hall',
                        value: player?.townHallLevel,
                    },
                    {
                        key: '5',
                        name: 'League',
                        value: player?.league.name,
                    },
                    {
                        key: '6',
                        name: 'Heighest Town Hall Trophies',
                        value: player?.bestTrophies,
                    },
                    {
                        key: '7',
                        name: 'Current Town Hall Trophies',
                        value: player?.trophies,
                    },
                    {
                        key: '8',
                        name: 'Builder Hall',
                        value: player?.builderHallLevel,
                    },
                    {
                        key: '9',
                        name: 'Heighest Builder Hall Trophies',
                        value: player?.bestVersusTrophies,
                    },
                    {
                        key: '10',
                        name: 'Current Builder Hall Trophies',
                        value: player?.versusTrophies,
                    },
                    {
                        key: '11',
                        name: 'Clan Capital Contributions',
                        value: player?.clanCapitalContributions,
                    },
                    {
                        key: '12',
                        name: 'Clan Name',
                        value: player?.clan.name,
                    },
                    {
                        key: '13',
                        name: 'Clan Level',
                        value: player?.clan.clanLevel,
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
                        dataSource={player?.achievements}
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
                    dataSource={player?.heroes}
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
                    dataSource={player?.troops}
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
                    dataSource={player?.spells}
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
                "PlayerID": searchParams.get('member')?.split('#')[1]
            })
            .then((response) => {
                localStorage.setItem('clanID', response.data.clan.tag);
                setPlayer(response.data);
            })
            // eslint-disable-next-line
    }, [])

    return(
        <>
            <Card
                style={{ width: '100%' }}
                title={player?.name}
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={(key) => {
                    onTabChange(key);
                }}
                extra={<a href="/clan">Clan</a>}
            >
                {contentList[activeTabKey]}
            </Card>
        </>
    );

};

export default Members;