import { useContext, useEffect, useState } from "react";
import { Container, Col, Image } from "react-bootstrap";
import ExpensesTable from "./ExpensesTable.jsx";
import CategoryModal from "./CategoryModal.jsx";
import SignOut from "./SignOut.jsx";
import { AppContext } from "../context/AppContext.jsx";
import OCRModal from "./OCRModal.jsx";
import User from "../models/User.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import { AchievementProvider } from "react-achievements";
import achievementConfig from "../config/achievementConfig.js";
import '../App.css';
import JoyrideTour from "./JoyRideTour.jsx";
import logo from '../../docs/pictures/simplitrac_logo.png';
import Confetti from "react-confetti";
import HamburgerMenu from "./HamburgerMenu.jsx";

const LandingComponent = () => {
    const { setScreen, ocrData, serverResponse, setServerResponse, user, setUser, setIsUpdating } = useContext(AppContext);
    const [showCategories, setShowCategories] = useState(false);
    const [runTour, setRunTour] = useState(false);
    const [categoriesSelected, setCategoriesSelected] = useState(false);
    useEffect(() => {
        if (user.isNewUser && user.isNewUser() && categoriesSelected) {
            setRunTour(true);
        }
    }, [user, categoriesSelected]);

    const renderNewScreen = (screen) => {
        if (screen === undefined) {
            return;
        }
        setScreen(screen);
    };

    // useEffect(() => {
    //     if (serverResponse) {
    //         setServerResponse(null);
    //     }
    // }, [user]);

    useEffect(() => {
        setUser(user)
    }, [serverResponse])

    const toggleCategoriesList = () => {
        setShowCategories(!showCategories);
    };

    const handleDeleteCategory = async (user, categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            setIsUpdating(true)
            const result = await user.deleteCategory(categoryId);

            if (result instanceof User) {
                setUser(result);
                setServerResponse('Category Successfully Deleted');
            } else {
                setServerResponse('Failed to delete category');
            }
        }
        setIsUpdating(false)
    }

    return (
        <AchievementProvider config={achievementConfig} initialState={user.serialize()} badgesButtonPosition={'top-right'}>
            <Container fluid={true} className="landing-container">
                <HamburgerMenu setRunTour={setRunTour} />
                {< JoyrideTour run={runTour} setRun={setRunTour} />}
                {user.first_name && (
                    <>
                        <p>
                            Welcome {user.first_name} {user.last_name}
                        </p>
                        {user.isNewUser() && !categoriesSelected && (
                            <CategoryModal onCategoriesSelected={() => setCategoriesSelected(true)} />
                        )}
                        {ocrData && <OCRModal />}
                        {serverResponse && <ConfirmationModal />}
                    </>
                )}
                <div className="landing-header">
                    <h1><Col xs={1} md={1}>
                        <Image src={logo} role="logo" style={{ width: '300px', height: '300px' }} roundedCircle />
                    </Col></h1>
                </div>
                <div className="landing-content">
                    <ExpensesTable />
                </div>
                <div className="buttons-container">
                    {/*<button className="custom-button" onClick={handleSubmit}>Submit</button>*/}
                    <button className="custom-button" onClick={() => renderNewScreen("camera")}>Camera</button>
                    <button className="custom-button" onClick={() => renderNewScreen("chart")}>Chart</button>
                    <button className="custom-button" onClick={() => renderNewScreen("edit")}>Edit Transactions</button>
                    <button className="custom-button" onClick={(toggleCategoriesList)}>
                        {showCategories ? "Hide Categories" : "Show Categories"}
                    </button>
                </div>
                {showCategories && (
                    <div className="categories-list">
                        <h3>Your Categories</h3>
                        <ul className="category-list">
                            {user.categories.map((category) => (
                                <li key={category.category_id} className="category-item">
                                    <span>{category.category_name}</span>
                                    <button
                                        className="delete-button custom-button"
                                        onClick={() => handleDeleteCategory(user, category.category_id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="landing-content">
                    <SignOut />
                </div>
            </Container>
        </AchievementProvider>
    );
};

export default LandingComponent;