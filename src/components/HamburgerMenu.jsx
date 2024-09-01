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
    Button
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {AppContext} from '../context/AppContext';
import SignOut from "./SignOut.jsx";

const HamburgerMenu = ({setRunTour}) => {
    const {
        showHamburger,
        setShowHamburger,
        renderNewScreen,
        showCategories,
        toggleCategoriesList, 
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
                        <DrawerHeader>Menu</DrawerHeader>
                        <DrawerBody>
                            <VStack align="start" spacing={4}>
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
                                    onClick={() => renderNewScreen("chart")}>Expense Chart</Button>
                                <Button
                                    variant="ghost"
                                    w="100%"
                                    onClick={toggleCategoriesList}>
                                    {showCategories ? "Hide Categories" : "Show Categories"}
                                </Button>
                                <SignOut variant="ghost" w="100%" color="red"/>

                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};

export default HamburgerMenu;
