import React from "react";
// import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { playerData } from "./player";

const PlayerComponent: React.FC = () => {

    const [ searchParams ] = useSearchParams();
    console.log(searchParams.get('id'));
    console.log(playerData)

    return(
        <>
        
        </>
    );

};

export default PlayerComponent;