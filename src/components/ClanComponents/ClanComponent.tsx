import React from "react";
import { clanData } from "./clan";
import './ClanComponents.css'

const ClanComponent: React.FC = () => {

    console.log(clanData);
    console.log(clanData.memberList);
    console.log(clanData.members);
    return (
        <>
            <div className="container">
                <div className="flex">
                    <div className="ClanName flex">
                        <h3>Clan Name</h3>
                        <p>{clanData.name}</p>
                    </div>
                    <div className="location flex">
                        <h3>Location</h3>
                        <p>{clanData.location.name}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClanComponent;