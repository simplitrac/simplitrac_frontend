import {Button, Col, Container, Row} from "react-bootstrap";
import ExpensesTable from "./expensestable.jsx";

const LandingComponent = (props) => {

    // eslint-disable-next-line react/prop-types
    const setScreen = props.setScreen
    const user = props.user;

    const renderNewScreen = (screen) =>{
        if (screen === undefined){
            return;
        }
        setScreen(screen)
    }

    return (
        <Container>
            <>
            {`Welcome ${user.displayName}`}
            </>
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
                    <Button variant="primary" onClick={() => renderNewScreen("landing")}>Expense</Button>
                    <Button variant="primary" onClick={() => renderNewScreen("camera")}>Camera</Button>
                    <Button variant="primary" onClick={() =>renderNewScreen("chart")}>Chart</Button>
                    {/* <button onClick={logOut}> logOut</button> */}
                </Col>
            </Row>
        </Container>
    );
}



export default LandingComponent;