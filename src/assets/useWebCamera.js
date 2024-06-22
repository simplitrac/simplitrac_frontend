// useWebCamera.js
import { useEffect } from 'react';

/**
 * Custom hook to handle webcam access in a web environment.
 * @param {React.RefObject} videoRef - Reference to the video element.
 */
export const useWebCamera = (videoRef) => {
    useEffect(() => {
        // Check if the browser supports media devices
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const constraints = {
                video: true, // Request video access
            };

            // Access the user's camera
            navigator.mediaDevices.getUserMedia(constraints)
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream; // Set the video stream to the video element
                    }
                })
                .catch((err) => {
                    console.error("Error accessing media devices.", err);
                });

            // Cleanup function to stop the video stream
            return () => {
                if (videoRef.current && videoRef.current.srcObject) {
                    const tracks = videoRef.current.srcObject.getTracks();
                    tracks.forEach(track => track.stop()); // Stop each track of the video stream
                }
            };
        } else {
            console.error("Media devices API not supported in this browser.");
        }
    }, [videoRef]);
};
