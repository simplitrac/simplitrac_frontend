import React from 'react';
import {Box, Heading, Text, VStack, SimpleGrid, Stack, Divider} from '@chakra-ui/react';
import Slider from "./Slider.jsx";


function SlideSection({title, description, features}) {
    return (
        <>
        <Slider>
            <Box p={4} bg="gray.100" borderRadius="md" shadow="md" textAlign="center">
                <Heading as="h2" size="xl" mb={4}>
                    {title}
                </Heading>
                {description && (
                    <Text mb={0} color={'gray.600'} maxW="2xl" mx="auto">
                        {description}
                    </Text>
                )}
                <VStack spacing={0}>
                    <SimpleGrid columns={{base: 1, md: 3}} spacing={10}>
                        {features.map((feature, index) => (
                            <Box key={index}>
                                <Heading as="h3" size="lg" mb={2}>
                                    {feature.title}
                                </Heading>
                                <Text>{feature.text}</Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Box>

        </Slider>
            <Divider orientation='horizontal'/>
        </>
    );
}

export default SlideSection;
