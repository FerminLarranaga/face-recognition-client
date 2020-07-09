import React from "react";

const Navigation = ({ onRouteChange, route }) => {
    switch (route) {
        case "signin":
            return(
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p
                    onClick={() => onRouteChange("register")}
                    className="f3 link dim black ma4 pointer"
                >Registry</p>
            </nav>);
        case "register":
            return(
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p
                    onClick={() => onRouteChange("signin")}
                    className="f3 link dim black ma4 pointer"
                >Sign in</p>
            </nav>);
        case "home":
            return(
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p
                    onClick={() => onRouteChange("signin")}
                    className="f3 link dim black ma4 pointer"
                >Sign Out</p>
            </nav>);
        default:
            return (
                <div></div>
            );
    }
}

export default Navigation;