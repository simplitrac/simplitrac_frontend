import React from 'react';
import {
    Container,
    Stack,

} from '@chakra-ui/react';

import SlideSection from "./SlideSection..jsx";

const Body = () => {

    const keyFeatures = [
        {
            title: 'Camera Support',
            text: 'Our AI-driven receipt reader can translate your daily receipts to financial entries.',
        },
        {
            title: 'Advanced Tracking Metrics',
            text: 'Be able to see your spending in real time with our state of the art tracking metrics.',
        },
        {
            title: 'Achievement Progression',
            text: 'Check the Achievements tab to see your progession and how you measure up to other users.',
        },
    ];

    const keyHighlights = [
        {
            title: 'Adaptable Performance',
            text: 'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
        },
        {
            title: 'Great User Experience',
            text: 'Be able to see your spending in real time with our state of the art tracking metrics.',
        },
        {
            title: 'Built to Last',
            text: 'SimpliTrac was built with longevity in mind and will be your finance partner for years to come.',
        },
    ];

    const keyFeedback = [
        {
            title: 'Great Product',
            text: 'I use this application daily to track everyday expenses and stay on budget. Patrick',
        },
        {
            title: 'Easy to Learn',
            text: 'I was able to start using this application and learn the ins-and-outs in a matter of minutes. -Steve',
        },
        {
            title: 'Like No Other',
            text: 'After using this application, I will never go back to a different finance tracker again. -Justin',
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
                    title="Highlights"
                    features={keyHighlights}
                />
                <SlideSection
                    title="User Feedback"
                    features={keyFeedback}
                />
            </Stack>
        </Container>
    );
};

export default Body;