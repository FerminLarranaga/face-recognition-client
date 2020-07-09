import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = ({ onInputChange, onButtonSubmit}) => {
    return (
        <div className="">
            <p className="f3">
                {"This magic brain will detect faces in your pictures. Give it a try."}
            </p>
            <div className="center">
                <div className="form center pa3 br3 shadow-5">
                    <input 
                        className="f4 pa2 w-70 center br2" 
                        type="text"
                        onChange={onInputChange}
                    />
                    <button 
                        className="w-20 br2 f4 ph3 pv2 mh1 dib black bg-lightest-blue"
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;