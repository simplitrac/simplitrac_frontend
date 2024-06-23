import {Button, Col, Container, Row} from "react-bootstrap";
import ExpensesTable from "./expensestable.jsx";
import CameraFunction from "../scripts/CameraFunction.jsx";

const LandingComponent = (props) => {

    const setScreen = props.setScreen

    const renderNewScreen = (screen) =>{
        if (screen === undefined){
            return;
        }
        setScreen(screen)
    }

    return (
        <Container>
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
                    <Button variant="primary" onClick={() => {renderNewScreen("expenses")}}>Expense</Button>
                    <Button variant="primary" onClick={() => renderNewScreen("camera")}>Camera</Button>
                    <Button variant="primary" onClick={() =>renderNewScreen("chart")}>Chart</Button>
                </Col>
            </Row>
        </Container>
    );
}



export default LandingComponent;