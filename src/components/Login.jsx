import User from "../models/User.js";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Spinner } from "react-bootstrap";

import '../App.css';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Body from "./Body.jsx";
import { Container, VStack } from "@chakra-ui/react";
import Updating from "./Updating.jsx";


export const Login = () => {
    const { setScreen, setUser, setIsUpdating, isUpdating} = useContext(AppContext);

    let storedUser = new User(JSON.parse(localStorage.getItem('user')))

    if (!storedUser.isEmptyUser()) {
        setIsUpdating(true)
        setUser(storedUser)
        setScreen("landing")
        setIsUpdating(false)
        return
    }

    return (
        <Container maxWidth='container.2xl' padding={0}>
            {isUpdating && <Updating />}
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