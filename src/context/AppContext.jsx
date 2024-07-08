import React, { createContext, useState } from 'react';
import { isMobile, isTablet, isDesktop } from 'react-device-detect';
import Transaction from "../models/Transaction.js";


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

    const value = {
        screen, setScreen,
        user, setUser,
        modalIsOpen, setModalIsOpen,
        show, setShow,
        capturedPhoto, setCapturedPhoto,
        ocrData, setOcrData,
        device, setDevice,
        serverResponse, setServerResponse,
        ocrModalOpen, setOcrModalOpen
    };



    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
