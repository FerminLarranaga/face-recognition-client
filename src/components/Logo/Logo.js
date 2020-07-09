import React from "react";
import Tilt from "react-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2 b--rA" options={{ max : 66 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img alt="brain" src={brain} width="100" height="100"/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;