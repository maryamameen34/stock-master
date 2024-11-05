import React, { useEffect } from "react"
import OverviewGrid from "./astimate-grids"
import OrdersChart from "./charts/order-chart"
import UsersChart from "./charts/users-chart"
import HomepageUser from "./HomepageUser"


const OverView: React.FC = () => {


    return (
        <div className="p-1 mt-16 ">
            <OverviewGrid />
            <div className="lg:flex md:flex justify-center items-center">
                <OrdersChart />
                <UsersChart />
            </div>
            <HomepageUser />
        </div>
    )
}

export default OverView