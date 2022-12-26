import { Form, Input, Modal } from "antd";
import { ArrowRightOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { clanData } from "./clan";
import './ClanComponents.css'

const ClanComponent: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const[playerName, setPlayerName] = useState(String);
    const[playerName, setPlayerName] = useState('');
    const[playerRole, setPlayerRole] = useState('');
    const[playerTrophies, setPlayerTrophies] = useState('');
    const[playerVTrophies, setPlayerVTrophies] = useState('');
    const[playerLeague, setPlayerLeague] = useState('');
    const[playerExpLevel, setPlayerExpLevel] = useState('');
    const[playerRank, setPlayerRank] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const removePlayer = () => {
        setPlayerName('');
        setPlayerRole('');
        setPlayerTrophies('');
        setPlayerVTrophies('');
        setPlayerLeague('');
        setPlayerExpLevel('');
        setPlayerRank('');
    }

    const setPlayer = (element: any) => {
        setPlayerName(element.name);
        setPlayerRole(element.role);
        setPlayerTrophies(element.trophies);
        setPlayerVTrophies(element.versusTrophies);
        setPlayerLeague(element.league.name);
        setPlayerExpLevel(element.expLevel);
        setPlayerRank(element.clanRank);
        showModal();
    }

    // console.log(clanData);
    return (
        <>
            <div className="transparent">
                <Form 
                    name="Clan Detail"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <label><h3>Clan</h3></label>
                    <Input addonBefore="Clan name" defaultValue={clanData.name} readOnly={true} />
                    <Input addonBefore="Clan description" defaultValue={clanData.description} readOnly={true} />
                    <Input addonBefore="Location" defaultValue={clanData.location.name} readOnly={true} />
                    <Input addonBefore="Join type" defaultValue={clanData.type} readOnly={true} />
                    <Input addonBefore="Required TownHall to join" defaultValue={clanData.requiredTownhallLevel} readOnly={true} />
                    <Input addonBefore="Required trophies to join" defaultValue={clanData.requiredTrophies} readOnly={true} />
                    <Input addonBefore="Level" defaultValue={clanData.clanLevel} readOnly={true} />
                    <Input addonBefore="Points" defaultValue={clanData.clanPoints} readOnly={true} />
                    <label><h3>Wars</h3></label>
                    <Input addonBefore="War league" defaultValue={clanData.warLeague.name} readOnly={true} />
                    <Input addonBefore="War frequency" defaultValue={clanData.warFrequency} readOnly={true} />
                    <Input addonBefore="Total war winned" defaultValue={clanData.warWins} readOnly={true} />
                    <label><h3>Members</h3></label>
                    <Input addonBefore="Total members" defaultValue={clanData.members} readOnly={true} />
                    <label><h3>Leader</h3></label>
                    {
                        clanData.memberList.map((element, key) => {
                            if(element.role === 'leader'){
                                return(
                                    <a 
                                        href="#"
                                        onClick={()=> {
                                            removePlayer();
                                            setPlayer(element);
                                        }} 
                                        key={key} 
                                        className="playerLink"
                                    >
                                        <p> {element.name} </p>
                                        <ArrowRightOutlined style={{ color: 'blue' }}/>
                                    </a>
                                );
                            }
                        })
                    }
                    <label><h3>Co-Leader</h3></label>
                    {
                        clanData.memberList.map((element, key) => {
                            if(element.role === 'coLeader'){
                                return(
                                    <a 
                                        href="#"
                                        onClick={()=> {
                                            removePlayer();
                                            setPlayer(element);
                                        }}
                                        key={key} 
                                        className="playerLink"
                                    >
                                        <p> {element.name} </p>
                                        <ArrowRightOutlined style={{ color: 'blue' }}/>
                                    </a>
                                );
                            }
                        })
                    }
                    <label><h3>Admin</h3></label>
                    {
                        clanData.memberList.map((element, key) => {
                            if(element.role === 'admin'){
                                return(
                                    <a 
                                        href="#"
                                        onClick={()=> {
                                            removePlayer();
                                            setPlayer(element);
                                        }}
                                        key={key} 
                                        className="playerLink"
                                    >
                                        <p> {element.name} </p>
                                        <ArrowRightOutlined style={{ color: 'blue' }}/>
                                    </a>
                                );
                            }
                        })
                    }
                    <label><h3>Member</h3></label>
                    {
                        clanData.memberList.map((element, key) => {
                            if(element.role === 'member'){
                                return(
                                    <a 
                                        href="#"
                                        onClick={()=> {
                                            removePlayer();
                                            setPlayer(element);
                                        }}
                                        key={key} 
                                        className="playerLink"
                                    >
                                        <p> {element.name} </p>
                                        <ArrowRightOutlined style={{ color: 'blue' }}/>
                                    </a>
                                );
                            }
                        })
                    }
                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Input addonBefore="Name" defaultValue={playerName} readOnly={true} />
                        <Input addonBefore="Role" defaultValue={playerRole} readOnly={true} />
                        <Input addonBefore="Trophies" defaultValue={playerTrophies} readOnly={true} />
                        <Input addonBefore="Versus trophies" defaultValue={playerVTrophies} readOnly={true} />
                        <Input addonBefore="League" defaultValue={playerLeague} readOnly={true} />
                        <Input addonBefore="EXP Level" defaultValue={playerExpLevel} readOnly={true} />
                        <Input addonBefore="Clan rank" defaultValue={playerRank} readOnly={true} />
                    </Modal>
                </Form>
            </div>
        </>
    );
}

export default ClanComponent;