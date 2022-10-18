import React from "react";
import { useHref, useParams, useSearchParams } from "react-router-dom";

export default function Reunioes(){

    const [queryParameters] = useSearchParams();

    return(
        <div>
        <p>usuario: {queryParameters.get("user")}</p>
        </div>
    )
}