import { useState, useRef, useContext, useEffect } from "react";
import Modal from "react-modal";
import { AppContext } from "../context/AppContext.jsx";
import User from "../models/User.js";
import Category from "../models/Category.js";

const categories = [
    { id: 1, name: "Vehicle" },
    { id: 2, name: "Insurance/Health" },
    { id: 3, name: "Rent/Mortgage" },
    { id: 4, name: "Meals" },
    { id: 5, name: "Travel" },
    { id: 6, name: "Supplies" },
    { id: 7, name: "Cell Phone" },
    { id: 8, name: "Utilities" },
];

const CategoryModal = () => {
    Modal.setAppElement("#root");
    const firstInputRef = useRef();
    const { user, setUser } = useContext(AppContext);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleModalOpenState = (state) => {
        setModalIsOpen(!state);
        handleOnChange();
    };

    const handleOnChange = (event) => {
        const tempArray = [...selectedItems];
        if (event?.target) {
            tempArray.push(
                new Category({
                    name: event.target.name,
                    id: event.target.id,
                })
            );
            setSelectedItems(tempArray);
        }
    };

    const submitCategories = () => {
        const tempUser = new User(user);
        tempUser.categories = selectedItems.map((item) => new Category(item));
        setUser(tempUser);
        toggleModalOpenState(modalIsOpen);
    };

    return (
        <div className="source-type">
            <Modal
                isOpen={modalIsOpen}
                className="modal-content"
                overlayClassName="modal-overlay"
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
};

export default CategoryModal;
