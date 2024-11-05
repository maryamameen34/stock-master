
import React, { useEffect } from "react"
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { LoginForm } from "../components/forms/index";


const Login: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            if (user && user.role === "admin") {
                navigate("/admin-dashboard");
            } else if (user && user.role === "customer") {
                navigate("/customer-dashboard");
            }
            else if (user &&  user.role === "manager"){
                navigate("/manager-dashboard")
            }
            else if (user && user.role === "supplier"){
                navigate("/supplier-dashboard")
            }
        }
    }, [isAuthenticated, user, navigate]);
    return (
        <div className=''>
            <Helmet>
                <title>Sign in Now | Stock Master | Sign in your Account</title>
            </Helmet>
            <LoginForm />
        </div>
    );
};

export default Login;
