import {Button, Col, Container, Row} from "react-bootstrap";
import ExpensesTable from "./expensestable.jsx";
import {useContext, useState} from "react";
import CategoryModal from "./CategoryModal.jsx";
import SignOut from "./SignOut.jsx";
import {AppContext} from "../context/AppContext.jsx";

const LandingComponent = (props) => {

    // eslint-disable-next-line react/prop-types
    const {user, setUser, screen, setScreen, modalIsOpen, setModalIsOpen} = useContext(AppContext);
    // const setScreen = props.setScreen
    // const user = props.user
    // const setUser = props.setUser
    // const [modalIsOpen, setModalIsOpen] = useState(true);

    const renderNewScreen = (screen) =>{
        if (screen === undefined){
            return;
        }
        setScreen(screen)
    }

    // useEffect(() => {
    //
    //
    //
    // }, [user])

    return (
        <Container>
            {user.first_name && (
                <>
                    <p>
                        Welcome {user.first_name} {user.last_name}
                    </p>
                    {user.categories.length === 0 || user.categories.length === undefined && (
                        <CategoryModal
                            user={user}
                            setUser={setUser}
                            modalIsOpen={modalIsOpen}
                            setModalIsOpen={setModalIsOpen}
                        />
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
                    <Button variant="primary" onClick={() => renderNewScreen("landing")}>Expense</Button>
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