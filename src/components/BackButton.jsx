// eslint-disable-next-line react/prop-types
import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";

const BackButton = () => {

    const {setScreen} = useContext(AppContext)

    const onBack = () => {
        // if (videoRef.current.srcObject) {
        //     const stream = videoRef.current.srcObject;
        //     if (stream) {
        //         stream.getTracks().forEach(track => track.stop());
        //         videoRef.current.srcObject = null;
        //         console.log("Camera access stopped");
        //     }
        //     videoRef.current.pause();
        // }
        setScreen("landing");
    };

    return (
        <button onClick={onBack}>Back</button>
    );
};

export default BackButton;
