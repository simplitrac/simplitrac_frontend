import React, {useContext} from 'react';
import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    Icon,
    Stack,
    HStack,
    Spacer, Divider,
} from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import {auth, googleProvider, signInWithPopup} from "../config/initializeFirestore.js";
import User from "../models/User.js";
import {AppContext} from "../context/AppContext.jsx";
import login from "./Login.jsx";

const Header = () => {

    const { setScreen, setUser, isUpdating, setIsUpdating } = useContext(AppContext);

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
        <Container maxW="container.xl">
            <HStack py={4}>
                <Spacer />
                <Button
                    leftIcon={<Icon as={FaGoogle} />}
                    colorScheme="red"
                    variant="outline"
                    fontSize={['sm', 'md', 'lg']}
                    mr={2}
                    onClick={async () => await existingUserSignUp()}
                >
                    Log in
                </Button>
                <Button
                    leftIcon={<Icon as={FaGoogle} />}
                    // colorScheme="red"
                    bgColor= 'oxfordBlue.400'
                    variant="solid"
                    textShadow= 'true'
                    fontSize={['sm', 'md', 'lg']}
                    mr={2}
                    onClick={async () => await newUserSignUp()}
                >
                    Sign up
                </Button>
            </HStack>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={10} py={5} align="center">
                <Box flex={1}>
                    <Heading as="h2" size="2xl" mb={4}>
                        <Text as="span" position="relative" _after={{
                            content: "''",
                            width: 'full',
                            height: '30%',
                            position: 'absolute',
                            bottom: 1,
                            left: 0,
                            bg: 'red.400',
                            zIndex: -1,
                        }}>
                            Track Finances
                        </Text>
                        <br />
                        <Text as="span" color="#778DA9">
                            Simpli.
                        </Text>
                    </Heading>
                    <Text color="gray.500" mb={6}>
                        SimpliTrac uses a number of different features to enhance the user experience
                        and ensure accurate recording of day-to-day expenses while providing ample
                        feedback on user activity and giving financial peace of mind.
                    </Text>

                </Box>

                <Box flex={1}>
                    <Image
                        src='/assets/pictures/simplitrac_logo.png'
                        backgroundColor= '#3a506b'
                        fallbackSrc="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                        alt="SimpliTrac Logo"
                        borderRadius="full"
                        boxShadow="lg"
                        objectFit="cover"
                        w="full"
                        h={{ base: '200px', md: '300px' }}
                    />
                </Box>
            </Stack>
            <Divider />
        </Container>
    );
};

export default Header;