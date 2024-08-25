// Copied this from:
// https://blog.bitsrc.io/firebase-authentication-with-react-for-beginners-implementing-email-password-and-google-sign-in-e62d9094e22
import { auth, googleProvider, signInWithPopup } from "../config/initializeFirestore.js";
import User from "../models/User.js";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import {Col, Row, Image, Spinner} from "react-bootstrap";
import logo from '../../docs/pictures/simplitrac_logo.png';
import FeaturesList from './Features.jsx';
import '../App.css';
import Updating from "./Updating.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Body from "./Body.jsx";
import {Container, Flex, VStack, Divider} from "@chakra-ui/react";

export const Login = () => {
    const { setScreen, setUser, isUpdating, setIsUpdating } = useContext(AppContext);

    let storedUser = new User(JSON.parse(localStorage.getItem('user')))

    if (!storedUser.isEmptyUser()) {
        setUser(storedUser)
        setScreen("landing")
        return
    }

    // const newUserSignUp = async () => {
    //     try {
    //         setIsUpdating(true)
    //         const result = await signInWithPopup(auth, googleProvider);
    //         const id = result.user.uid;
    //
    //         let user = await User.getUserFromFirestore(id)
    //
    //         if (!user.isNewUser()) {
    //             alert("Sorry, you already have an account.")
    //             setScreen()
    //             setIsUpdating(false)
    //             return
    //         }
    //
    //         user = new User(result.user)
    //         await createNewUser(new User(user))
    //         setUser(user)
    //         localStorage.setItem('user', user)
    //         setScreen("landing")
    //         setIsUpdating(false)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    //
    // const existingUserSignUp = async () => {
    //     try {
    //         setIsUpdating(true)
    //         const result = await signInWithPopup(auth, googleProvider);
    //         const id = result.user.uid;
    //
    //         let user = await User.getUserFromFirestore(id)
    //
    //         if (user.isNewUser()) {
    //             alert("Sorry. You do not have an account.")
    //             setScreen("")
    //             setIsUpdating(false)
    //             return
    //         }
    //
    //         setUser(user)
    //         localStorage.setItem('user', user)
    //         setScreen("landing")
    //         setIsUpdating(false)
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // async function createNewUser(user) {
    //     const init = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //         },
    //         body: JSON.stringify(user)
    //     };
    //     // In order to run locally, you need to change the endpoint to your local endpoint:
    //     // This should be in your .env file
    //     const endpoint = import.meta.env.VITE_PROD_CREATE_USER_ENDPOINT
    //     const result = await fetch(endpoint, init)
    //     console.log(result)
    // }

    return (
        <Container maxWidth='container.2xl' padding={0}>
            {/*<div>*/}
            {/*    <Container>*/}
            {/*        <Row>*/}
            {/*            <Col xs={1} md={3}>*/}
            {/*                <Image src={logo} role="logo" style={{width: '300px', height: '300px'}} roundedCircle/>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Container>*/}
            {/*    <div>*/}
            {/*        {isUpdating && <Updating/>} /!* Show overlay when isUpdating is true *!/*/}
            {/*        <button onClick={newUserSignUp}> New User Sign Up</button>*/}
            {/*        <div></div>*/}
            {/*        <button onClick={existingUserSignUp}> Existing User Sign In</button>*/}
            {/*        /!*<FeaturesList />*!/*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*</div>*/}
                    <VStack
                        p={10}
                        bg='gray.50'
                        color='gray.800'
                        fontFamily='body'
                        fontSize='lg'
                    >
                        <Header />
                        <Body />
                        <Footer />
                    </VStack>
                <Spinner />
            </Container>
    );
};

export default Login