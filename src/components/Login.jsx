// Copied this from:
// https://blog.bitsrc.io/firebase-authentication-with-react-for-beginners-implementing-email-password-and-google-sign-in-e62d9094e22
import { auth, googleProvider, signInWithPopup } from "../config/initializeFirestore.js";
import User from "../models/User.js";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Col, Container, Row, Image } from "react-bootstrap";
import logo from '../../public/assets/simplitrac.webp';
import FeaturesList from './Features.jsx';
import Updating from "./Updating.jsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';

export const Login = () => {
    const { setScreen, setUser, isUpdating, setIsUpdating } = useContext(AppContext);

    let storedUser = new User(JSON.parse(localStorage.getItem('user')))

    if (localStorage.length !== 0) {
        setUser(storedUser)
        setScreen("landing")
        return
    }

    const newUserSignUp = async () => {
        try {
            setIsUpdating(true)
            const result = await signInWithPopup(auth, googleProvider);
            const id = result.user.uid;

            let user = await User.getUserFromFirestore(id)

            if (!user.isNewUser()) {
                alert("Sorry, you already have an account.")
                setScreen()
                setIsUpdating(false)
                return
            }

            user = new User(result.user)
            await createNewUser(new User(user))
            setUser(user)
            localStorage.setItem('user', user)
            setScreen("landing")
            setIsUpdating(false)
        } catch (err) {
            console.log(err);
        }
    };

    const existingUserSignUp = async () => {
        try {
            setIsUpdating(true)
            const result = await signInWithPopup(auth, googleProvider);
            const id = result.user.uid;

            let user = await User.getUserFromFirestore(id)

            if (user.isNewUser()) {
                alert("Sorry. You do not have an account.")
                setScreen("")
                setIsUpdating(false)
                return
            }

            setUser(user)
            localStorage.setItem('user', user)
            setScreen("landing")
            setIsUpdating(false)
        } catch (err) {
            console.error(err);
        }
    };

    async function createNewUser(user) {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(user)
        };
        // In order to run locally, you need to change the endpoint to your local endpoint:
        // This should be in your .env file
        const endpoint = import.meta.env.VITE_PROD_CREATE_USER_ENDPOINT
        const result = await fetch(endpoint, init)
        console.log(result)
    }



    return (
        <>
            <Container>
                <Row>
                    <Col xs={12} className="d-flex justify-content-center">
                        <Image src={logo} role="logo" style={{ width: '300px', height: '300px' }} roundedCircle />
                    </Col>
                </Row>
            </Container>
            <div>
                {isUpdating && <Updating />} {/* Show overlay when isUpdating is true */}
                <Button onClick={newUserSignUp}> New User Sign Up</Button>
                <div></div>
                <Button onClick={existingUserSignUp}> Existing User Sign In</Button>
                <div><FeaturesList /></div>
            </div>
        
        </>

    );
};

export default Login