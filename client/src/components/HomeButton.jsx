// eslint-disable-next-line react/prop-types
import {useContext} from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Button } from "@chakra-ui/react";


const HomeButton = () => {

    const {setScreen} = useContext(AppContext)

    const onHome = () => {
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
        <Button
            onClick={onHome}
            background="none"
            color="#415a77"
            fontSize="30px"
            _hover={{ 
                border: 'none', 
                boxShadow: 'none', 
                background: 'none'
            }}
            position="absolute"
            top="1rem"
            left="50%"
            transform="translateX(-50%)"
            zIndex="10"
            border='none'

        >
            <h2 style={{ margin: 0, fontWeight: 'bold' }}>SimpliTrac</h2>
            {/* <Image
                src="../simplitrac_frontend/public/assets/pictures/background_logo.png"
                alt="Home"
                width="100%"
                height="100%"
                objectFit="cover"
            /> */}
        </Button>
    );
}

export default HomeButton;
