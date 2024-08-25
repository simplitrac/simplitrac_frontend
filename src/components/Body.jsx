import React from 'react';
import {
    Container,
    Stack,

} from '@chakra-ui/react';

import SlideSection from "./SlideSection..jsx";

const Body = () => {

    const keyFeatures = [
        {
            title: 'Cloud Sync',
            text: 'Access your snippets from anywhere, anytime. Our cloud sync feature ensures your code is always up to date.',
        },
        {
            title: 'Smart Categorization',
            text: 'Organize your snippets effortlessly with our intelligent categorization system. Find what you need in seconds.',
        },
        {
            title: 'Collaboration Tools',
            text: 'Share and collaborate on snippets with your team. Boost productivity with real-time editing and commenting.',
        },
    ];

    return (
        <Container maxW="container.xl" py={10}>
            <Stack spacing={50}>

                <SlideSection
                    title="Key Features"
                    features={keyFeatures}
                />
                <SlideSection
                    title="Key Features"
                    features={keyFeatures}
                />
                <SlideSection
                    title="Key Features"
                    features={keyFeatures}
                />
            </Stack>
        </Container>
    );
};

export default Body;