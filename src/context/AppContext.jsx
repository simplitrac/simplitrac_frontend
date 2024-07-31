import React, { createContext, useState, useEffect } from 'react';
import { isMobile, isTablet, isDesktop } from 'react-device-detect';
import Transaction from "../models/Transaction.js";
import FormData from "../models/FormData.js"


const AppContext = createContext();

const AppProvider = ({ children }) => {

    const detectDevice = () => {
        if(isDesktop) return 'desktop'

        return 'mobile'
    }

    const [screen, setScreen] = useState();
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        categories: []
    });
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [show, setShow] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [ocrData, setOcrData] = useState(new Transaction());
    const [device, setDevice ] = useState(detectDevice())
    const [serverResponse, setServerResponse] = useState();
    const [ocrModalOpen, setOcrModalOpen] = useState(false);
    const [formData, setFormData] = useState(new FormData());

    // updating user data based on state
    const fetchUserData = async () => {
        const endpoint = import.meta.env.MODE === 'development'
            ? import.meta.env.VITE_DEV_GET_USER_ENDPOINT
            : import.meta.env.VITE_PROD_GET_USER_ENDPOINT;
    
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Network response issue exists');
            }
            const data = await response.json();
            // console.log('Fetched user data:', data); //testing fetching user data
            setUser(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // updating data based on user state
    useEffect(() => {
        fetchUserData(); 
    }, []);

    const value = {
        screen, setScreen,
        user, setUser,
        modalIsOpen, setModalIsOpen,
        show, setShow,
        capturedPhoto, setCapturedPhoto,
        ocrData, setOcrData,
        device, setDevice,
        serverResponse, setServerResponse,
        ocrModalOpen, setOcrModalOpen,
        fetchUserData, //updating value with user data
        formData, setFormData
    };


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
