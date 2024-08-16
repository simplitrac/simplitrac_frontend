// Copied this from:
// https://blog.bitsrc.io/firebase-authentication-with-react-for-beginners-implementing-email-password-and-google-sign-in-e62d9094e22
import { auth, googleProvider, signInWithPopup } from "../config/initializeFirestore.js";
import User from "../models/User.js";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Col, Container, Row, Image } from "react-bootstrap";
import logo from '../../public/assets/simplitrac.webp';
import '../App.css';

export const Login = () => {
    const { setScreen, setUser } = useContext(AppContext);

    let storedUser = new User(JSON.parse(localStorage.getItem('user')))

    if (localStorage.length !== 0) {
        setUser(storedUser)
        setScreen("landing")
        return
    }

    const newUserSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const id = result.user.uid;

            let user = await User.getUserFromFirestore(id)

            if (!user.isNewUser()) {
                alert("Sorry, you already have an account.")
                setScreen()
                return
            }

            user = new User(result.user)
            await createNewUser(new User(user))
            setUser(user)
            localStorage.setItem('user', user)
            setScreen("landing")
        } catch (err) {
            console.log(err);
        }
    };

    const existingUserSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const id = result.user.uid;

            let user = await User.getUserFromFirestore(id)

            if (user.isNewUser()) {
                alert("Sorry. You do not have an account.")
                setScreen("")
                return
            }

            setUser(user)
            localStorage.setItem('user', user)
            setScreen("landing")
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
        const endpoint = import.meta.env.VITE_DEV_CREATE_USER_ENDPOINT
        const result = await fetch(endpoint, init)
        console.log(result)
    }



    return (
        <>
            <Container>
                <Row>
                    <Col xs={1} md={1}>
                        <Image src={logo} role="logo" style={{ width: '300px', height: '300px' }} roundedCircle />
                    </Col>
                </Row>
            </Container>
            <div>
                <button onClick={newUserSignUp}> New User Sign Up</button>
                <button onClick={existingUserSignUp}> Existing User Sign In</button>
            </div>
        </>

    );
};

export default Login