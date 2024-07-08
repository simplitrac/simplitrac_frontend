import {Button, Col, Container, Row} from "react-bootstrap";
import ExpensesTable from "./ExpensesTable.jsx";
import {useContext, useEffect, useState} from "react";
import CategoryModal from "./CategoryModal.jsx";
import SignOut from "./SignOut.jsx";
import {AppContext} from "../context/AppContext.jsx";
import OCRModal from "./OCRModal.jsx";
import User from "../models/User.js";
import ConfirmationModal from "./ConfirmationModal.jsx";

const LandingComponent = () => {

    // eslint-disable-next-line react/prop-types
    const {user, setScreen, ocrData, serverResponse, setServerResponse } = useContext(AppContext);

    const renderNewScreen = (screen) =>{
        if (screen === undefined){
            return;
        }
        setScreen(screen)
    }

    const handleSubmit = async () => {
        const userWithUpdates = new User(user)
        userWithUpdates.transactions.push(ocrData)
        const result = await user.updateFirebase()
        setServerResponse( result )
    }

    return (

        <Container>
            {user.first_name && (
                <>
                    <p>
                        Welcome {user.first_name} {user.last_name}
                    </p>
                    {user.isNewUser() && (
                        <CategoryModal />
                    )}
                    {ocrData && (
                        <OCRModal />
                    )}
                    {serverResponse && (
                        <ConfirmationModal />
                    )}
                </>
            )}
            <Row className="mt-3">
                <Col>
                    <h1 className="text-center">
                        SimpliTrac
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ExpensesTable />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="d-flex justify-content-around">
                    <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                    <Button variant="primary" onClick={() => renderNewScreen("camera")}>Camera</Button>
                    <Button variant="primary" onClick={() =>renderNewScreen("chart")}>Chart</Button>
                </Col>
            </Row>
            <Row className="mt-3">
                <SignOut />
            </Row>
        </Container>
    );
}


export default LandingComponent;