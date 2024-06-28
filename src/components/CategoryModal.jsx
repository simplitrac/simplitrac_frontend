import {useState, useRef, useContext} from "react";
// import Modal from "react-modal";
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
        "name": "Miscellaneous"
    }
]

const CategoryModal = () => {
    Modal.setAppElement("#root");
    const firstInputRef = useRef();
    const {user, setUser, modalIsOpen, setModalIsOpen} = useContext(AppContext);
    // const {user, setUser} = {props};
    // const {modalIsOpen, setModalIsOpen} = {props};

    const toggleModalOpenState = (state) => {
        setModalIsOpen(!state);
        handleOnChange()
    };

    const handleOnChange = () => {
        setUser(user)
    };
    // Copied this from: https://stackblitz.com/edit/modal-dialog-with-checkbox?file=src%2FApp.js
    return (
        <div className="source-type">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => toggleModalOpenState(modalIsOpen)}
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
                                    checked={selectedItems[item.name] || false}
                                    onChange={handleOnChange}
                                    name={item.name}
                                    ref={index === 0 ? firstInputRef : null}
                                />
                                {item.name}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="source-type-modal__controls">
                    {/*<button*/}
                    {/*    value="cancel"*/}
                    {/*    className="source-type-modal__control-btn source-type-modal__control-btn--cancel"*/}
                    {/*    onClick={toggleModalOpenState}*/}
                    {/*>*/}
                    {/*    Cancel*/}
                    {/*</button>*/}
                    <button
                        value="apply"
                        className="source-type-modal__control-btn source-type-modal__control-btn--apply"
                        onClick={() => {
                            // console.log("applying source types");
                            // console.log(
                            //     JSON.stringify(
                            //         Object.keys(selectedItems).reduce((items, key) => {
                            //             if (selectedItems[key]) {
                            //                 return [...items, key];
                            //             }
                            //             return items;
                            //         }, [])
                            //     )
                            // );

                            user.categories = Object.entries(selectedItems).map(([key, value]) =>{
                                return { [key]: value}
                            })
                            toggleModalOpenState();
                        }}
                    >
                        Apply
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default CategoryModal;