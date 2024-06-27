// CameraFunction.jsx
import {useEffect, useRef, useState} from 'react';

const CameraFunction = ({ onBack }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Request camera access
        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current = document.createElement('video');
                if (videoRef.current) {
                    // input type of select image or take a picture, this will bypass authorization by passing to camera app
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    // console.log(videoRef)
                    // videoRef.current.srcObject = stream
                    // videoRef.addEventListener("loadedmetadata", ()=>{
                    //     videoRef.play()
                    // })
                    console.log('Camera access granted')
                    setHasPermission(true);
                }
            } catch (err) {
                console.error('Error accessing camera:', err);
                setHasPermission(false);
            }
        })();
    }, [videoRef]);

    const capturePhoto = () => {
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

    return (
        <div style={styles.container}>
            <div style={styles.cameraContainer}>
                <video ref={videoRef} style={styles.camera} autoPlay />
            </div>
            <button onClick={capturePhoto}>Capture Photo</button>
            <button onClick={onBack}>Back</button>
            {capturedPhoto && (
                <div style={styles.imageContainer}>
                    <p>Captured Photo:</p>
                    <img src={capturedPhoto} alt="Captured" style={styles.image} />
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
    camera: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        marginTop: '10px',
    },
    image: {
        width: '200px',
        height: '200px',
    },
    hiddenCanvas: {
        display: 'none',
    },
};

export default CameraFunction;
