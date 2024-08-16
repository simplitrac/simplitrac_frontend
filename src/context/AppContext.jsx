import React, { createContext, useState, useEffect } from 'react';
import { isMobile, isTablet, isDesktop } from 'react-device-detect';
import Transaction from "../models/Transaction.js";
import FormData from "../models/FormData.js"
import User from "../models/User.js"


const AppContext = createContext({});

const AppProvider = ({ children }) => {

    const detectDevice = () => {
        if (isDesktop) return 'desktop'

        return 'mobile'
    }

    const [screen, setScreen] = useState();
    const [user, setUser] = useState(new User(JSON.parse(localStorage.getItem('user'))));
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [show, setShow] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [ocrData, setOcrData] = useState(new Transaction());
    const [device, setDevice] = useState(detectDevice())
    const [serverResponse, setServerResponse] = useState();
    const [ocrModalOpen, setOcrModalOpen] = useState(false);
    const [formData, setFormData] = useState(new FormData());

    // updating user data based on state
    const fetchUserData = async () => {
        const endpoint = import.meta.env.VITE_DEV_GET_USER_ENDPOINT;

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

    const resetAppState = () => {
        // if (storedUser) {
        //     setScreen('landing')
        //     if (storedUser) {
        //         setUser({
        //             first_name: storedUser.first_name,
        //             last_name: storedUser.last_name,
        //             categories: storedUser.categories
        //         })
        //     }
        // } else {
        setScreen('login');
        setUser({
            first_name: '',
            last_name: '',
            categories: []
        });
        // }
        setModalIsOpen(true);
        setShow(false);
        setCapturedPhoto(null);
        setOcrData(new Transaction());
        setDevice(detectDevice());
        setServerResponse();
        setOcrModalOpen(false);
        setFormData(new FormData());
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
        formData, setFormData,
        resetAppState,
    };


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
