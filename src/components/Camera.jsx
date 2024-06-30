import {useContext, useEffect, useRef, useState} from 'react';
import {AppContext} from "../context/AppContext.jsx";
import BackButton from "./BackButton.jsx";

const Camera = () => {
    const { capturedPhoto, setCapturedPhoto, setScreen, setOcrData } = useContext(AppContext);

    const [hasPermission, setHasPermission] = useState(null);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const videoContainerRef = useRef(null);

    useEffect(() => {
        const requestCameraAccess = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                setStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
                setHasPermission(true);
            } catch (err) {
                console.error('Error accessing camera:', err);
                setHasPermission(false);
            }
        };

        requestCameraAccess();

        // Cleanup function to stop the video stream when component unmounts
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const imageDataUrl = canvasRef.current.toDataURL('image/png');
            setCapturedPhoto(imageDataUrl);

            // Stop the video stream
            stream.getTracks().forEach(( track) => {
                track.stop()
                stream.removeTrack(track)
                videoContainerRef.current.remove()
                videoContainerRef.current = null;
                setStream(null)
                console.log('Camera access stopped')
            });
            console.log('Camera light turned off')
        }
    };

    const retakePhoto = async () => {
        setCapturedPhoto(null);
        // Reinitialize the camera
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            setStream(newStream);
            if (videoRef.current) {
                videoRef.current.srcObject = newStream;
                videoRef.current.play();
            }
            setHasPermission(true);
        } catch (err) {
            console.error('Error accessing camera:', err);
            setHasPermission(false);
        }
    };

    // Placeholder for now - need to wire to send to OCR
    const submitPhoto = async () =>{
        const blob = imageToBlob(capturedPhoto);
        const url = "";
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            body: blob
        };
        const ocrResult = await fetch(url, init)
        setOcrData(ocrResult);
        setScreen("landing")
    }

    if (hasPermission === null) {
        return <div>Requesting camera permission...</div>
    }
    if (!hasPermission) {
        return <p>No access to camera</p>
    }

    return (
        <div style={styles.container}>
            {!capturedPhoto && (
                <div>
                    <div ref={videoContainerRef}>
                        <video ref={videoRef} style={{ width: '100%', height: '100%' }} />\
                    </div>
                    <button onClick={capturePhoto}>Capture Photo</button>
                </div>
            )}
            <BackButton />
            {capturedPhoto && (
                <div>
                    <div style={styles.imageContainer}>
                        <p>Captured Photo:</p>
                        <img src={capturedPhoto} alt="Captured" style={styles.image} />
                    </div>
                    <button onClick={submitPhoto}>Submit</button>
                    <button onClick={retakePhoto}>Retake</button>
                </div>
            )}
            <canvas ref={canvasRef} style={styles.hiddenCanvas}></canvas>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    cameraContainer: {
        width: '100%',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    imageContainer: {
        marginTop: '10px',
    },
    image: {
        width: '300px',
        height: '200px',
    },
    hiddenCanvas: {
        display: 'none',
    },
};

function imageToBlob(image){
    // Convert base64 string to Blob
    const byteCharacters = atob(capturedPhoto);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/png' });
}

export default Camera;
