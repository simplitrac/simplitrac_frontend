import { useContext } from "react";
import { Container } from "react-bootstrap";
import ExpensesTable from "./ExpensesTable.jsx";
import CategoryModal from "./CategoryModal.jsx";
import SignOut from "./SignOut.jsx";
import { AppContext } from "../context/AppContext.jsx";
import OCRModal from "./OCRModal.jsx";
import User from "../models/User.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import { Achievement, AchievementProvider } from "react-achievements";

const LandingComponent = () => {
    const { setScreen, ocrData, serverResponse, setServerResponse } = useContext(AppContext);
    const user = localStorage.getItem('user');
    console.log(user)
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
        <AchievementProvider>

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

                </div>
                <div className="landing-content">
                    <SignOut />
                </div>
            </Container>
            <Achievement metric={user.transactions} threshold={1} onAchieve={() => alert("hello")} message={"asdf"} />
        </AchievementProvider>
    );
};

export default LandingComponent;
