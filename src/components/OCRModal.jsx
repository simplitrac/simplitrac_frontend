import {useState, useRef, useContext, useEffect} from "react";
import Modal from "react-modal";
import {AppContext} from "../context/AppContext.jsx";
import FormData from "../models/FormData.js"


const OCRModal = () => {
    Modal.setAppElement("#root");
    const firstInputRef = useRef();
    const {ocrData, user, setFormData, ocrModalOpen, setOcrModalOpen} = useContext(AppContext);

    const toggleModalOpenState = (state) => {
        setOcrModalOpen(!state);
    };

    const submitTransaction = (data) => {
        user.addTransaction(data)
        return user.updateFirebase()
    }

    const getFormData = () => {
        return new FormData(ocrData)
    }

    const handleOnClick = (e) => {
        const button = e.target.value;
        switch(button){
            case "edit":
                setFormData(getFormData())
                break;
            case "submit":
                if(ocrData.isNotComplete()){
                    alert("Data not complete. Switching to edit mode");
                    setFormData(getFormData())
                    break;
                }
                submitTransaction(ocrData)
                break;
        }
        toggleModalOpenState(ocrModalOpen)
    }

    const displayConfirmation = (transaction) => {
        return Object.entries(transaction)
            .filter(entry => entry[1] !== null && entry[1] !== undefined)
            .map((entry, index) => {

                if(entry[0] === "transactionId") return;

                return (
                    <li key={index} className="source-type-modal__list-item">
                        <label>
                            {entry[0]}
                        </label>
                        <div>
                            {entry[1]}
                        </div>
                    </li>
                )

            });
    }


    // Copied this from: https://stackblitz.com/edit/modal-dialog-with-checkbox?file=src%2FApp.js
    return (
        <div className="source-type">
            <Modal
                style={customStyles}
                isOpen={ocrModalOpen}
                className="source-type-modal"
                aria-labelledby="source-type-dialog-label"
                onAfterOpen={() => {
                    setTimeout(() => firstInputRef.current?.focus(), 0);
                }}
            >
                <ul
                    className="source-type-modal__list"
                    role="group"
                    aria-labelledby="source-type-dialog-label"
                >
                    {displayConfirmation(ocrData)}
                </ul>
                <div className="source-type-modal__controls">
                    <button
                        value="edit"
                        className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                        onClick={handleOnClick}
                    >Edit Info
                    </button>
                    <button
                        value="submit"
                        className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                        onClick={handleOnClick}
                    >Submit
                    </button>
                </div>
            </Modal>
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

export default OCRModal;