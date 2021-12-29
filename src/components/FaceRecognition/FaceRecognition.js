import React from "react";
import "./FaceRecognition.css"

const FaceRecognition = ({ box, imageUrl }) => {
    console.log(box);
    return (
        <div className="center ma2">
            <div className="grow">
                <img id="inputimage" src={imageUrl} alt="" width="500px" height="auto"/>
                {box? (
                    <div
                        className="bounding-box"
                        style={{top: box.topRow,
                                right: box.rightCol,
                                bottom: box.bottomRow,
                                left: box.leftCo
                            }}
                    />
                ):""}
            </div>
        </div>
    );
}

export default FaceRecognition;