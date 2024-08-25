import { useState, useRef, useContext, useEffect } from "react";
import Modal from "react-modal";
import { AppContext } from "../context/AppContext.jsx";
import User from "../models/User.js";
import Category from "../models/Category.js";
// import '../App.css';

const categories = [
    { category_id: '226984a6-f764-466a-b6c9-4ddf2aab1eb1', category_name: "Vehicle" },
    { category_id: '343713fa-44dd-4b01-b9d2-8ca62a64e335', category_name: "Insurance/Health" },
    { category_id: '3a59c3fa-b2b3-4b0b-a23a-5f9e5b2c5b39', category_name: "Rent/Mortgage" },
    { category_id: 'd1a8f9b6-90a3-4a2d-b4d5-8cf1f7c8d63f', category_name: "Meals" },
    { category_id: '7523cbd7-8e3a-401b-89c2-4c2d43e90837', category_name: "Travel" },
    { category_id: 'd62a78b7-7b5d-4b0a-9c4d-5861a9f6c67f', category_name: "Supplies" },
    { category_id: '835c7a49-0c6f-4d8b-91e5-d0e2f0e8b4a1', category_name: "Cell Phone" },
    { category_id: 'b4168b2d-1d7a-4567-8344-cf8b4f8fdf2b', category_name: "Utilities" },
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
                    category_name: event.target.name,
                    category_id: event.target.id,
                })
            );
            setSelectedItems(tempArray);
        }
    };

    const submitCategories = () => {
        user.categories = selectedItems.map((item) => new Category(item));
        const tempUser = new User(user);
        setUser(tempUser);
        toggleModalOpenState(modalIsOpen);
        onCategoriesSelected();
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
            <h2 id="source-type-dialog-label">Select Your Categories</h2>  <header></header>

                <ul
                    className="source-type-modal__list"
                    role="group"
                    aria-labelledby="source-type-dialog-label"
                >
                    {categories.map((item, index) => (
                        <li key={item.category_id} className="source-type-modal__list-item">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={handleOnChange}
                                    name={item.category_name}
                                    ref={index === 0 ? firstInputRef : null}
                                    id={item.category_id}
                                />
                                {item.category_name}
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
