import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import './PlayerComponent.css';
// import { createSearchParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { env } from "../../environment/environment";
// import { playerData } from "./player";

const PlayerComponent: React.FC = () => {
    // const [ searchParams ] = useSearchParams();
    const [player, setPlayer] = useState<any>();
    const [activeTabKey1, setActiveTabKey1] = useState<string>('Me');

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
        Me: <table>
                <tbody>
                    <tr>
                        <td><h3>Name: </h3></td>
                        <td><span className="player_values">{player?.name}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Role: </h3></td>
                        <td><span className="player_values">{String(player?.role).toUpperCase()}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Experience Level: </h3></td>
                        <td><span className="player_values">{player?.expLevel}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Town Hall: </h3></td>
                        <td><span className="player_values">{player?.townHallLevel}</span></td>
                    </tr>
                    <tr>
                        <td><h3>League: </h3></td>
                        <td><span className="player_values">{player?.league.name}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Heighest Town Hall Trophies: </h3></td>
                        <td><span className="player_values">{player?.bestTrophies}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Current Town Hall Trophies: </h3></td>
                        <td><span className="player_values">{player?.trophies}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Builder Hall: </h3></td>
                        <td><span className="player_values">{player?.builderHallLevel}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Heighest Builder Hall Trophies: </h3></td>
                        <td><span className="player_values">{player?.bestVersusTrophies}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Current Builder Hall Trophies: </h3></td>
                        <td><span className="player_values">{player?.versusTrophies}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Clan Capital Contributions: </h3></td>
                        <td><span className="player_values">{player?.clanCapitalContributions}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Clan Name: </h3></td>
                        <td><span className="player_values">{player?.clan.name}</span></td>
                    </tr>
                    <tr>
                        <td><h3>Clan Level: </h3></td>
                        <td><span className="player_values">{player?.clan.clanLevel}</span></td>
                    </tr>
                </tbody>
            </table>,
        Achievements: <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>SI.No</th>
                                        <th>Achievement Name</th>
                                        <th>Achievement Info</th>
                                        <th>Stars gained</th>
                                        <th>Base</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        player?.achievements.map((achievement: any, index: any) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index+1}</td>
                                                    <td>{achievement.name}</td>
                                                    <td>{achievement.info}</td>
                                                    <td>{achievement.stars}</td>
                                                    <td>{achievement.village}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                      </div>,
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
        setActiveTabKey1(key);
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
                activeTabKey={activeTabKey1}
                onTabChange={(key) => {
                    onTab1Change(key);
                }}
            >
                {contentList[activeTabKey1]}
            </Card>
        </>
    );

};

export default PlayerComponent;