import {useContext, useEffect, useRef, useState} from 'react';
import {AppContext} from "../context/AppContext.jsx";

const CameraFunction = ({ onBack }) => {
    const {capturedPhoto, setCapturedPhoto} = useContext(AppContext);

    const [hasPermission, setHasPermission] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {


        const requestCameraAccess = async () => {
            try {
                navigator.mediaDevices.getUserMedia({
                    video: true,
                })
                    .then( (stream) => {
                        if (!videoRef.current) {
                            // Create a video element if it doesn't already exist
                            videoRef.current = document.createElement('video');
                            videoRef.current.style.width = '100%';
                            videoRef.current.style.height = '100%';
                            videoRef.current.autoplay = true;
                        } else {
                            // Set the video stream and play
                            videoRef.current.srcObject = stream;
                            console.log('Camera access granted');
                        }
                        setHasPermission(true);
                    })
                    .catch((err) => {
                        console.error('Error accessing camera:', err);
                        setHasPermission(false);
                    })
            } catch (err) {
                console.error('Error accessing camera:', err);
                setHasPermission(false);
            }
        };

        requestCameraAccess();

        // Cleanup function to stop the video stream when component unmounts
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                let tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [hasPermission]);

    const capturePhoto = () => {
        console.log(videoRef)
        console.log(canvasRef)
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const imageDataUrl = canvasRef.current.toDataURL('image/png');
            setCapturedPhoto(imageDataUrl);
        }
    };

    if (hasPermission === null) {
        return <div>Requesting camera permission...</div>
    }
    if (!hasPermission) {
        return <p>No access to camera</p>
    }
    if(hasPermission && videoRef.current && videoRef.current.srcObject) {
        document.getElementById("video-container").appendChild(videoRef.current);
    }
    const retakePhoto = () => {
        setCapturedPhoto(null);
    };
    const submitPhoto = () => {
        // Logic to submit the photo to the database
        submitPhotoToDatabase(capturedPhoto);
    };

    return (
        <div style={styles.container}>
            <div id={"video-container"} />
            <button onClick={capturePhoto}>Capture Photo</button>
            <button onClick={onBack}>Back</button>
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

export default CameraFunction;
