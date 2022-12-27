import { Card, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './PlayerComponent.css';
// import { createSearchParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { env } from "../../environment/environment";
// import { playerData } from "./player";

const Player: React.FC = () => {
    // const [ searchParams ] = useSearchParams();
    const [player, setPlayer] = useState<any>();
    const [activeTabKey, setActiveTabKey] = useState<string>('Me');
    const [achievements, setAchievements] = useState<any>([]);

    const tabList = [
        {
          key: 'Me',
          tab: 'Me',
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
        Me: <Table 
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
                        dataSource={[
                            achievements
                        ]}

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
        Heroes: <table>
                    <thead>
                        <tr>
                            <th>SI.No</th>
                            <th>Hero Name</th>
                            <th>Hero Level</th>
                            <th>Base</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            player?.heroes.map((hero: any, index: any) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{hero.name}</td>
                                        <td>{hero.level}</td>
                                        <td>{hero.village}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>,
        Troops: <table>
                    <thead>
                        <tr>
                            <td>SI.No</td>
                            <th>Troop Name</th>
                            <th>Troop Level</th>
                            <th>Base</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            player?.troops.map((troop: any, index: any) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{troop.name}</td>
                                        <td>{troop.level}</td>
                                        <td>{troop.village}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>,
        Spells: <table>
                    <thead>
                        <tr>
                            <th>SI.No</th>
                            <th>Spell Name</th>
                            <th>Spell Level</th>
                            <th>Base</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            player?.spells.map((spell: any, index: any) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{spell.name}</td>
                                        <td>{spell.level}</td>
                                        <td>{spell.village}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>,
    };
    
    const onTab1Change = (key: string) => {
        setActiveTabKey(key);
        if(key === 'Achievements') {
            player?.achievements.map((achievement: any, index: any) =>{
                setAchievements({
                    key: index+1,
                    name: achievement.name,
                    info: achievement.info,
                    stars: achievement.stars,
                    village: achievement.village
                })
            })
        }
    };

    

    useEffect(() =>{
        axios
            .post(env.API_PATH, {
                // "PlayerID": searchParams.get("id")
                "PlayerID": localStorage.getItem('playerID')
            })
            .then((response) => {
                console.log(response.data);
                setPlayer(response.data);
            })
    }, [])
    return(
        <>
            <Card
                style={{ width: '100%' }}
                title="Player"
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={(key) => {
                    onTab1Change(key);
                }}
            >
                {contentList[activeTabKey]}
            </Card>
        </>
    );

};

export default Player;