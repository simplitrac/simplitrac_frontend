import { useContext, useState } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import ExpensesTable from "./ExpensesTable.jsx";
import CategoryModal from "./CategoryModal.jsx";
import SignOut from "./SignOut.jsx";
import { AppContext } from "../context/AppContext.jsx";
import OCRModal from "./OCRModal.jsx";
import User from "../models/User.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import { AchievementProvider } from "react-achievements";
import achievementConfig  from "../config/achievementConfig.js";

const LandingComponent = () => {
    const { setUser, setScreen, ocrData, serverResponse, setServerResponse } = useContext(AppContext);
    const user = new User(JSON.parse(localStorage.getItem('user')))
    const [showCategories, setShowCategories] = useState(false);
    const renderNewScreen = (screen) => {
        if (screen === undefined) {
            return;
        }
        setScreen(screen);
    };
    const toggleCategoriesList = () => {
        setShowCategories(!showCategories);
    };
    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            const updatedUser = new User(user);
            const result = await updatedUser.deleteCategory(categoryId);
    
            if (result instanceof User) {
                setUser(result);
                setServerResponse('Category Successfully Deleted');
            } else {
                setServerResponse('Failed to delete category');
            }
        }
     };

    const handleSubmit = async () => {
        // const userWithUpdates = new User(user);
        // userWithUpdates.transactions.push(ocrData);
        // const result = await user.updateFirebase();
        // setServerResponse(result);
    };

    return (
        <AchievementProvider  config={achievementConfig} initialState={user.serialize()} badgesButtonPosition={'top-right'}>
                <Container fluid={true} className="landing-container">
                    {user.first_name && (
                        <>
                            <p>
                                Welcome {user.first_name} {user.last_name}
                            </p>
                            {user.isNewUser() && <CategoryModal />}
                            {ocrData && <OCRModal />}
                            {serverResponse && <ConfirmationModal />}
                        </>
                    )}
                    <div className="landing-header">
                        <h1>SimpliTrac</h1>
                    </div>
                    <div className="landing-content">
                        <ExpensesTable />
                    </div>
                    <div className="buttons-container">
                        {/*<button className="custom-button" onClick={handleSubmit}>Submit</button>*/}
                        <button className="custom-button" onClick={() => renderNewScreen("camera")}>Camera</button>
                        <button className="custom-button" onClick={() => renderNewScreen("chart")}>Chart</button>
                        <button className="custom-button" onClick={() => renderNewScreen("edit")}>Edit Transactions</button>
                        <button className="custom-button" onClick={toggleCategoriesList}>
                            {showCategories ? "Hide Categories" : "Show Categories"}
                        </button>

                    </div>
                    {showCategories && (
                <div className="categories-list">
                    <h3>Your Categories</h3>
                    <ListGroup>
                        {user.categories.map((category) => (
                            <ListGroup.Item key={category.category_id} className="d-flex justify-content-between align-items-center">
                                {category.category_name}
                                <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={() => handleDeleteCategory(category.category_id)}
                                >
                                    Delete
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
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
