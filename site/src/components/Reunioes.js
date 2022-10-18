import React from "react";
import { useHref, useParams } from "react-router-dom";

export default function Reunioes(){

    const { user } = useParams();

    return(
        <div>
            <text>{useHref}</text>
        </div>
    )
}