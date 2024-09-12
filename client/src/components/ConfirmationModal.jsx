import {useState, useRef, useContext, useEffect} from "react";
import Modal from "react-modal";
import {AppContext} from "../context/AppContext.jsx";
import Transaction from "../models/Transaction.js";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize'
import { Button } from "@chakra-ui/react";




const ConfirmationModal = () => {
    Modal.setAppElement("#root");
    const firstInputRef = useRef();
    const {serverResponse, setServerResponse, setOcrData} = useContext(AppContext);
    const [modalOpen, setModalOpen] = useState(serverResponse ? true : false)
    const {width, height} = useWindowSize()


    const toggleModalOpenState = (state) => {
        setModalOpen(!state);
    };


    const handleOnClick = (e) => {
        toggleModalOpenState(modalOpen)
        setServerResponse("")
        setOcrData(new Transaction())
    }

    const displayConfirmation = () => {
        const list = [serverResponse]
        return list
            // .filter(entry => entry[1] !== null && entry[1] !== undefined)
            .map((entry, index) => (
                <li key={index} className="source-type-modal__list-item">
                    <label al>
                        {entry}
                    </label>
                </li>
            ));
    }


    // Copied this from: https://stackblitz.com/edit/modal-dialog-with-checkbox?file=src%2FApp.js
    return (
        <div className="source-type">
            <Modal
                style={customStyles}
                isOpen={modalOpen}
                className="source-type-modal"
                aria-labelledby="source-type-dialog-label"
                onAfterOpen={() => {
                    setTimeout(() => firstInputRef.current?.focus(), 0);
                }}
                align="center"
            >
                <ul
                    className="source-type-modal__list"
                    role="group"
                    aria-labelledby="source-type-dialog-label"
                    align="center"
                >
                    {displayConfirmation(serverResponse)}
                </ul>
                <div className="source-type-modal__controls" style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        value="Okay"
                        className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                        onClick={handleOnClick}
                        style={{
                            background: "#52524a",
                            padding: "12px 20px",
                        }}
                    >Okay
                    </Button>
                </div>
            </Modal>
            {modalOpen && <Confetti width={width} height={height}/>}
        </div>
    );
}

const customStyles = {
    content: {
        position: 'relative',
        width: '300px', /* Adjust the width as needed */
        maxWidth: '80%',
        padding: '20px',
        background: '#fff',
        borderRadius: '8px',
        outline: 'none',
        margin: 'auto',
        inset: 'auto'
    },
    overlay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)' /* Adjust the overlay color and opacity */
    }
};

export default ConfirmationModal;