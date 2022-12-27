import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { createSearchParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { env } from "../../environment/environment";
// import { playerData } from "./player";

const PlayerComponent: React.FC = () => {

    // const [ searchParams ] = useSearchParams();
    const [player, setPlayer] = useState();

    useEffect(() =>{
        axios
            .post(env.API_PATH, {
                // "PlayerID": searchParams.get("id")
                "PlayerID": localStorage.getItem('playerID')
            })
            .then((response) => {
                setPlayer(response.data);  
            })
    }, [])
    console.log(player);
    return(
        <>
            <Card title="Player" >

            </Card>
        </>
    );

};

export default PlayerComponent;