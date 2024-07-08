// Copied this from:
// https://blog.bitsrc.io/firebase-authentication-with-react-for-beginners-implementing-email-password-and-google-sign-in-e62d9094e22
import { auth , googleProvider, signInWithPopup } from "../config/initializeFirestore.js";
import User from "../models/User.js";
import {useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {Col, Container, Row, Image} from "react-bootstrap";
import logo from './../assets/simplitrac.webp';

export const Login = () => {
    const {setScreen, setUser} = useContext(AppContext);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth,googleProvider);
            const id = result.user.uid;

            let user = await User.getUserFromFirestore(id)

            if(user.isNewUser()){
                user = new User(result.user)
                await createNewUser(new User(result.user))
            }

            setUser(user)
            setScreen("landing")
        } catch (err){
            console.error(err);
        }
    };

    async function createNewUser(user){
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
                    <Col xs={1} md={1}>
                        <Image src={logo} style={{ width: '300px', height: '300px' }} roundedCircle/>
                    </Col>
                </Row>
            </Container>
            <div>
                <button onClick={signInWithGoogle}> Sign In with Google</button>
            </div>
        </>

    );
};

export default Login