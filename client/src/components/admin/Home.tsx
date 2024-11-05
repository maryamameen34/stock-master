
import React from "react"
import { Helmet } from "react-helmet-async"
import OverView from "./basic/OverView"


const MainPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>  Admin Dashboard  || OverView </title>
            </Helmet>
            <OverView />
        </>
    )
}


export default MainPage