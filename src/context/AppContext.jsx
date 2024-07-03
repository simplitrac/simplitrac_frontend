import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [screen, setScreen] = useState();
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        categories: []
    });
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [show, setShow] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [ocrData, setOcrData] = useState(null);
    const value = {
        screen, setScreen,
        user, setUser,
        modalIsOpen, setModalIsOpen,
        show, setShow,
        capturedPhoto, setCapturedPhoto,
        ocrData, setOcrData
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
