import {useState, useRef, useContext} from "react";
import Modal from "react-modal";
import {AppContext} from "../context/AppContext.jsx";

const categories = [
    {
        "id": 1,
        "name": "Food & Dining"
    },
    {
        "id": 2,
        "name": "Transportation"
    },
    {
        "id": 3,
        "name": "Utilities"
    },
    {
        "id": 4,
        "name": "Entertainment"
    },
    {
        "id": 5,
        "name": "Supplies"
    },
    {
        "id": 6,
        "name": "Marketing"
    },
    {
        "id": 7,
        "name": "Miscellaneous"
    }
]

const CategoryModal = () => {
    Modal.setAppElement("#root");
    const firstInputRef = useRef();
    const {user, setUser, modalIsOpen, setModalIsOpen} = useContext(AppContext);
    const [selectedItems, setSelectedItems] = useState([]);
    // const {user, setUser} = {props};
    // const {modalIsOpen, setModalIsOpen} = {props};

    const toggleModalOpenState = (state) => {
        setModalIsOpen(!state);
        handleOnChange()
    };

    const handleOnChange = (event) => {
        const tempArray = selectedItems
        tempArray.push({
            name: event.target.name,
            id: event.target.id
        })
        setSelectedItems(tempArray)
    };

    const submitCategories = () => {
        console.log("applying source types");

        console.log(
            JSON.stringify(selectedItems)
        );

        user.categories = selectedItems;
        setUser(user);
        toggleModalOpenState(modalIsOpen);
    }

    // Copied this from: https://stackblitz.com/edit/modal-dialog-with-checkbox?file=src%2FApp.js
    return (
        <div className="source-type">
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
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
                    {categories.map((item, index) => (
                        <li key={item.id} className="source-type-modal__list-item">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={handleOnChange}
                                    name={item.name}
                                    ref={index === 0 ? firstInputRef : null}
                                    id={item.id}
                                />
                                {item.name}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="source-type-modal__controls">
                    <button
                        value="apply"
                        className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                        onClick={submitCategories}
                    >
                        Apply
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

export default CategoryModal;