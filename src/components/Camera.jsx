import {useContext, useEffect, useRef, useState} from 'react';
import {AppContext} from "../context/AppContext.jsx";
import BackButton from "./BackButton.jsx";
import Transaction from "../models/Transaction.js";
import {Button, Spinner} from "react-bootstrap";

const Camera = () => {
    const { capturedPhoto, setCapturedPhoto, screen, setScreen, ocrData, setOcrData } = useContext(AppContext);

    const [hasPermission, setHasPermission] = useState(null);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    // const videoContainerRef = useRef(null);

    useEffect(() => {
        if (screen !== "landing") {
            retakePhoto()
                .then(() => {
                    console.log('Camera light turned on')
                })
        }
        // Cleanup function to stop the video stream when component unmounts
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [ocrData, videoRef]);

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
                // videoContainerRef.current.remove()
                // videoContainerRef.current = null;
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
                    let liveStream;
                    let numInputDevices = await navigator.mediaDevices.enumerateDevices()

                    // Needed to access the back camera on mobile devices, but front camera on desktop
                    if (numInputDevices > 1){
                        liveStream = await navigator.mediaDevices.getUserMedia({
                            video: true,
                            facingMode: 'environment'
                        });
                    } else {
                        liveStream = await navigator.mediaDevices.getUserMedia({
                            video: true,
                        });
                    }
            setStream(liveStream);
            if (videoRef.current) {
                videoRef.current.srcObject = liveStream;
                videoRef.current.play();
            }
            setHasPermission(true);
        } catch (err) {
            console.error('Error accessing camera:', err);
            setHasPermission(false);
        }
    };

    const submitPhoto = async () => {
        try {

            const url = import.meta.env.VITE_PROD_OCR_ENDPOINT;
            const formData = imageToFormData(capturedPhoto);
            const init = {
                method: 'POST',
                body: formData,
            };
            const response = await fetch(url, init);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const ocrResult = await response.json();

            const transaction = new Transaction(ocrResult);
            setOcrData(transaction);
            setScreen("landing");
        } catch (error) {
            console.error('Error submitting photo:', error);
        }
    };
    if (hasPermission === null) {
        return <>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
            </Button>{' '}
        </>
    }
    if (!hasPermission) {
        return <>
            <p>No access to camera</p>
            <BackButton />
            </>

    }

    return (
        <div style={styles.container}>
            {!capturedPhoto && (
                <div>
                    <video ref={videoRef} style={{ width: '100%', height: '100%' }} />
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


function imageToBlob(image) {
    const byteString = atob(image.split(',')[1]);
    const mimeString = image.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
}

function imageToFormData(image) {
    const formData = new FormData();
    const blob = imageToBlob(image);
    formData.append('file', blob, 'image.png');
    return formData;
}
export default Camera;
