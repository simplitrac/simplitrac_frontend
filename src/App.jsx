import './App.css'
// import ExpensesTable from './components/expensestable'
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import {useWebCamera} from "./assets/useWebCamera.js";
// import CameraComponent from "./components/CameraComponent.jsx";
import ExpenseTable from "./components/ExpenseTable.jsx";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import db from './assets/initializeFirestore.js'
import {useEffect, useState} from "react";

function App() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                await db.collection('myCollection').doc().set({"test": "test"});
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run once on component mount


    // const auth = getAuth();
    // const provider = new GoogleAuthProvider();
    // let token;
    //
    // signInWithPopup(auth, provider)
    //     .then((result) => {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         token = credential.accessToken;
    //         // The signed-in user info.
    //         const user = result.user;
    //         // IdP data available using getAdditionalUserInfo(result)
    //         // ...
    //     }).catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //
    // });


    // [user, userState] = useState()
    // [transaction, transactionState] = useState()

    // useEffect (() => {

    // },[user, transaction])

    return (
        <ExpenseTable/>
        //   <Container>
        //     <Row className="mt-3">
        //       <Col>
        //         <h1 className="text-center">
        //           SimpliTrac
        //         </h1>
        //       </Col>
        //     </Row>
        //     <Row>
        //       <Col>
        //         <ExpensesTable />
        //       </Col>
        //     </Row>
        //     <Row className="mt-3">
        //       <Col className="d-flex justify-content-around">
        //         <Button variant="primary">Expense</Button>
        //         <Button variant="primary" onPress={CameraComponent()}>Camera</Button>
        //         <Button variant="primary">Chart</Button>
        //       </Col>
        //     </Row>
        //   </Container>
        //
    );
}

export default App
