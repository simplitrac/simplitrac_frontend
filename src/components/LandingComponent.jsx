import { useContext } from "react";
import { Container } from "react-bootstrap";
import ExpensesTable from "./ExpensesTable.jsx";
import CategoryModal from "./CategoryModal.jsx";
import SignOut from "./SignOut.jsx";
import { AppContext } from "../context/AppContext.jsx";
import OCRModal from "./OCRModal.jsx";
import User from "../models/User.js";
import ConfirmationModal from "./ConfirmationModal.jsx";

const LandingComponent = () => {
    const { user, setScreen, ocrData, serverResponse, setServerResponse } = useContext(AppContext);

    const renderNewScreen = (screen) => {
        if (screen === undefined) {
            return;
        }
        setScreen(screen);
    };

    const handleSubmit = async () => {
        // const userWithUpdates = new User(user);
        // userWithUpdates.transactions.push(ocrData);
        // const result = await user.updateFirebase();
        // setServerResponse(result);
    };

    return (
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
                <button className="custom-button" onClick={handleSubmit}>Submit</button>
                <button className="custom-button" onClick={() => renderNewScreen("camera")}>Camera</button>
                <button className="custom-button" onClick={() => renderNewScreen("chart")}>Chart</button>
            </div>
            <div className="landing-content">
                <SignOut />
            </div>
        </Container>
    );
};

export default LandingComponent;
