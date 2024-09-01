import { useContext, useEffect, useState } from "react";
import {
    Box,
    Container,
    Heading,
    Image,
    VStack,
    HStack,
    Button,
    Text,
    List,
    ListItem,
} from "@chakra-ui/react";
import ExpensesTable from "./ExpensesTable.jsx";
import CategoryModal from "./CategoryModal.jsx";
import SignOut from "./SignOut.jsx";
import { AppContext } from "../context/AppContext.jsx";
import OCRModal from "./OCRModal.jsx";
import User from "../models/User.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import { AchievementProvider } from "react-achievements";
import achievementConfig from "../config/achievementConfig.js";
import JoyrideTour from "./JoyRideTour.jsx";
import logo from '../../docs/pictures/simplitrac_logo.png';
import Confetti from "react-confetti";
import ReactConfetti from "react-confetti";
// import { reactAchievementsEventEmitter } from "react-achievements";
import HamburgerMenu from "./HamburgerMenu.jsx";

const LandingComponent = () => {
    const { setScreen, ocrData, serverResponse, setServerResponse, user, setUser, setIsUpdating, renderNewScreen, categoriesSelected, setCategoriesSelected } = useContext(AppContext);
    const [showCategories, setShowCategories] = useState(false);
    const [runTour, setRunTour] = useState(false);
    useEffect(() => {
        if (user.isNewUser && user.isNewUser() && categoriesSelected) {
            setRunTour(true);
        }
    }, [user, categoriesSelected]);


    useEffect(() => {
        setUser(user)
        // reactAchievementsEventEmitter.emit("checkAchievements", user.serialize())
    }, [serverResponse]);

    const handleDeleteCategory = async (user, categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {

            setIsUpdating(true);
            const result = await user.deleteCategory(categoryId);

            if (result instanceof User) {
                setUser(result);
                setServerResponse('Category Successfully Deleted');
            } else {
                setServerResponse('Failed to delete category');
            }
            setIsUpdating(false);
        }
    }

    return (
        <AchievementProvider config={achievementConfig} initialState={user.serialize()} badgesButtonPosition={'top-right'}>
            <Container maxW="container.xl" py={4}>
                <HamburgerMenu setRunTour={setRunTour} />
                <Box>
                    <JoyrideTour run={runTour} setRun={setRunTour} />
                    {user.first_name && (
                        <>
                            <Text fontSize="xl" fontWeight="bold">
                                Welcome {user.first_name} {user.last_name}
                            </Text>
                            {user.isNewUser() && <CategoryModal />}
                            {ocrData && <OCRModal />}
                            {serverResponse && <ConfirmationModal />}
                        </>
                    )}
                </Box>
                <VStack spacing={8}>
                    <HStack justify="center">
                        {/*<Image src={logo} alt="SimpliTrac Logo" boxSize="300px" borderRadius="full" />*/}
                    </HStack>
                    <ExpensesTable />
                    <HStack spacing={4}>
                        <Button
                            width="100%"
                            onClick={() => renderNewScreen("camera")}>Camera</Button>
                        <Button
                            width="100%"
                            onClick={() => renderNewScreen("chart")}>Chart</Button>

                    </HStack>
                    {showCategories && (
                        <Box w="100%">
                            <Heading as="h3" size="lg" mb={4}>
                                Your Categories
                            </Heading>
                            <List spacing={3}>
                                {user.categories.map((category) => (
                                    <ListItem key={category.category_id}>
                                        <HStack justify="space-between">
                                            <Text>{category.category_name}</Text>
                                            <Button colorScheme="red" onClick={() => handleDeleteCategory(user, category.category_id)}>
                                                Delete
                                            </Button>
                                        </HStack>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}
                </VStack>
            </Container>
        </AchievementProvider>
    );
};

export default LandingComponent;
