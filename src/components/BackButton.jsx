// eslint-disable-next-line react/prop-types
const BackButton = ({ setScreen }) => {
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
