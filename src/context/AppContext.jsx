import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [screen, setScreen] = useState();
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        categories: []
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [show, setShow] = useState(false);

    return (
        <AppContext.Provider value={{ screen, setScreen, user, setUser, modalIsOpen, setModalIsOpen, show, setShow }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
