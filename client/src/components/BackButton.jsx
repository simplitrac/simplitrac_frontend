// eslint-disable-next-line react/prop-types
import {useContext} from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Button } from "@chakra-ui/react";


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
        <Button onClick={onBack}>Back</Button>
    );
};

export default BackButton;
