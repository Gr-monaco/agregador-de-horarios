import React from "react";
import { useHref, useParams, useSearchParams } from "react-router-dom";
import axios from 'axios'
export default function Reunioes(){

    const [queryParameters] = useSearchParams();

    React.useState(async () => {
        axios.get(`${process.env.REACT_APP_API_URL}`).then((res) => console.log(res))
    }, [])

    return(
        <div>
        <p>usuariao: {queryParameters.get("user")}</p>
        </div>
    )
}