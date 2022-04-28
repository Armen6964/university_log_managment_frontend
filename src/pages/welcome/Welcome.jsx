import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./_Welcome.scss";
import logo from "../../assets/logo.png";

export default function WelcomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/dashboard/student");
        }, 2000);
    }, []);

    return (
        <div className="welcome-page">
            <img src={logo} />
        </div>
    );
}
