import React, { useContext, useEffect } from 'react';
import User from '../models/User.js';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    VStack,
    useDisclosure,
    Button,
    Text
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {AppContext} from '../context/AppContext.jsx';
import SignOut from "./SignOut.jsx";
import { set } from 'react-hook-form';

// const HamburgerMenu = ({setRunTour}) => {
const HamburgerMenu = () => {
    const {
        showHamburger,
        setShowHamburger,
        renderNewScreen,
        showCategories,
        toggleCategoriesList,
        user, setRunTour, setIsUpdating,
        setServerResponse, setScreen, resetAppState
    } = useContext(AppContext);
    const {isOpen, onOpen, onClose} = useDisclosure();

    useEffect(() => {
        if (showHamburger) {
            onOpen();
        } else {
            onClose();
        }
    }, [showHamburger, onOpen, onClose]);

    const startTour = () => {
        setShowHamburger(false);
        setRunTour(true);
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            setIsUpdating(true)
            console.log(user.user_id)
            const userToDelete = new User(user)
            localStorage.removeItem('user')
            // const result = await userToDelete.deleteUser(user.user_id)
            userToDelete.deleteUser(user.user_id)
            // setServerResponse(result)
            resetAppState()
        }
    }

    return (
        <>
            <IconButton
                aria-label="Open Menu"
                icon={<HamburgerIcon/>}
                onClick={() => setShowHamburger(true)}
                display={{base: "block", md: "block"}}
                position="fixed"
                background="#415a77"
                top="20px"
                left="20px"
                zIndex="1000"
                colorScheme="teal"
            />

            <Drawer placement="left" onClose={() => setShowHamburger(false)} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton color='#bd1f36'/>
                        <DrawerHeader
                            textAlign="center"
                            color="yinmnBlue.500"
                            fontSize="2xl"
                            fontWeight="bold"
                        >Menu</DrawerHeader>
                        <DrawerBody>
                            <VStack align="center" spacing={4}>
                                <Text
                                    fontSize="xl"
                                    fontWeight="bold"
                                >
                                    Welcome {user.first_name}
                                </Text>
                                <Button
                                    onClick={startTour}
                                    variant="ghost"
                                    w="100%"
                                    aria-label="Start Tour"
                                >
                                    Start Tour
                                </Button>
                                <Button
                                    variant="ghost"
                                    w="100%"
                                    data-tour="expense-chart"
                                    onClick={() => renderNewScreen("chart")}>Expense Chart</Button>
                                <Button
                                    variant="ghost"
                                    w="100%"
                                    onClick={toggleCategoriesList}>
                                    {showCategories ? "Hide Categories" : "Show Categories"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    w="100%"
                                    onClick={handleDeleteAccount}>
                                    Delete Account
                                </Button>
                                <SignOut
                                    variant="outline"
                                    w="100%"
                                    color="white"
                                    backgroundColor="#bd1f36"
                                />

                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};

export default HamburgerMenu;
