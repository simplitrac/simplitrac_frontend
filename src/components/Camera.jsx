import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from "../context/AppContext.jsx";
import BackButton from "./BackButton.jsx";
import Transaction from "../models/Transaction.js";
import { Button, Spinner } from "react-bootstrap";
import '../App.css';

const Camera = () => {
    const { capturedPhoto, setCapturedPhoto, screen, setScreen, ocrData, setOcrData, device, setOcrModalOpen } = useContext(AppContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);



    useEffect(() => {
        if (!capturedPhoto && device === 'mobile') {
            fileInputRef.current.click();
        }

        if (device === 'desktop' && !capturedPhoto){
            (async () => {
                if(!videoRef.current?.srcObject){
                    await activateDesktopCamera()
                }
            })()
        }
    }, [capturedPhoto, videoRef, hasPermission]);

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const imageDataUrl = canvasRef.current.toDataURL('image/png');
            setCapturedPhoto(imageDataUrl);

            // Stop the video stream
            stream.getTracks().forEach(track => {
                track.stop();
            });
            setStream(null);
            console.log('Camera light turned off');
        }
    };

    const activateDesktopCamera = async () => {
        setCapturedPhoto(null);
        try {
            let liveStream;
            if (device === "desktop"){
                liveStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
            }
            setStream(liveStream);
            if (videoRef.current) {
                videoRef.current.srcObject = liveStream;
                videoRef.current.play();
                setHasPermission(true);
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
            setHasPermission(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCapturedPhoto(e.target.result);
                if (device === 'mobile'){
                    submitPhoto();
                }
            };
            reader.readAsDataURL(file);
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
            const result = await response.json();
        if (result.error) {
            // Handle error response
            console.error('Error from OCR service:', result.message);
            alert(result.message); // You might want to use a more user-friendly way to display this
        } else {
            const transaction = new Transaction(result);
            setOcrData(transaction);
            setScreen("landing");
            setCapturedPhoto(false);
            setOcrModalOpen(true);
        }
    } catch (error) {
        console.error('Error submitting photo:', error);
        alert('Text is unreadable, please take the photo again.'); // You might want to use a more user-friendly way to display this

        }
    };

    // if (device === 'desktop'){
    //     if(hasPermission && !videoRef.current?.srcObject){
    //         return (<>
    //             <Button variant="primary" disabled>
    //                 <Spinner
    //                     as="span"
    //                     animation="border"
    //                     size="sm"
    //                     role="status"
    //                     aria-hidden="true"
    //                 />
    //                 <span className="visually-hidden">Loading...</span>
    //             </Button>
    //         </>)
    //     } else if (!hasPermission && !videoRef.current?.srcObject) {
    //         return (<>
    //             <p>No access to camera</p>
    //             <BackButton />
    //         </>)
    //     }
    // }

    return (
        <div style={styles.container}>
            {device === 'mobile' && !capturedPhoto && (
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={styles.fileInput}
                    />
                </div>
            )}
            {device === 'desktop' && !capturedPhoto && (
                <div>
                    <video ref={videoRef} style={styles.video} />
                    <button className="custom-button" onClick={capturePhoto} style={styles.button}>Capture Photo</button>
                </div>
            )}
            {capturedPhoto && (
                <div>
                    <div style={styles.imageContainer}>
                        <p>Captured Photo:</p>
                        <img src={capturedPhoto} alt="Captured" style={styles.image} />
                    </div>
                    <button className="custom-button" onClick={submitPhoto} style={styles.button}>Submit</button>
                    <button className="custom-button" onClick={activateDesktopCamera} style={styles.button}>Retake</button>
                </div>
            )}
            <BackButton />

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
        padding: '20px',
    },
    video: {
        width: '100%',
        height: 'auto',
    },
    button: {
        marginTop: '10px',
        padding: '10px 20px',
        fontSize: '16px',
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
    fileInput: {
        display: 'none'
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
