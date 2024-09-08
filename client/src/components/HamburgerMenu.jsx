import React, {useContext, useEffect} from 'react';
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

// const HamburgerMenu = ({setRunTour}) => {
const HamburgerMenu = () => {
    const {
        showHamburger,
        setShowHamburger,
        renderNewScreen,
        showCategories,
        toggleCategoriesList,
        user, setRunTour
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

    return (
        <>
            <IconButton
                aria-label="Open Menu"
                icon={<HamburgerIcon/>}
                onClick={() => setShowHamburger(true)}
                display={{base: "block", md: "block"}}
                position="fixed"
                top="20px"
                left="20px"
                zIndex="1000"
                colorScheme="teal"
            />

            <Drawer placement="left" onClose={() => setShowHamburger(false)} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton color='red'/>
                        <DrawerHeader
                            textAlign="center"
                            color="blue"
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
                                <SignOut
                                    variant="outline"
                                    w="100%"
                                    color="white"
                                    backgroundColor="red"
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
