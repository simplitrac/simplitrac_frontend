import React from 'react';
import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';
import {FaTwitter, FaYoutube, FaInstagram, FaLinkedin} from 'react-icons/fa';
import Slider from "./Slider.jsx";

const ListHeader = ({children}) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

const Footer = () => {
    return (
        <Slider>
            <Box
                bg={useColorModeValue('gray.50', 'gray.900')}
                color={useColorModeValue('gray.700', 'gray.200')}
            >
                {/*<Container as={Stack} maxW={'6xl'} py={10}>*/}
                {/*    <SimpleGrid columns={{base: 1, sm: 2, md: 4}} spacing={8}>*/}
                {/*        <Stack align={'flex-start'}>*/}
                {/*            <ListHeader>Company</ListHeader>*/}
                {/*            <Link href={'#'}>About Us</Link>*/}
                {/*            <Link href={'#'}>Blog</Link>*/}
                {/*            <Link href={'#'}>Careers</Link>*/}
                {/*            <Link href={'#'}>Contact Us</Link>*/}
                {/*        </Stack>*/}

                {/*        <Stack align={'flex-start'}>*/}
                {/*            <ListHeader>Support</ListHeader>*/}
                {/*            <Link href={'#'}>Help Center</Link>*/}
                {/*            <Link href={'#'}>Safety Center</Link>*/}
                {/*            <Link href={'#'}>Community Guidelines</Link>*/}
                {/*        </Stack>*/}

                {/*        <Stack align={'flex-start'}>*/}
                {/*            <ListHeader>Legal</ListHeader>*/}
                {/*            <Link href={'#'}>Cookies Policy</Link>*/}
                {/*            <Link href={'#'}>Privacy Policy</Link>*/}
                {/*            <Link href={'#'}>Terms of Service</Link>*/}
                {/*            <Link href={'#'}>Law Enforcement</Link>*/}
                {/*        </Stack>*/}

                {/*        <Stack align={'flex-start'}>*/}
                {/*            <ListHeader>Install App</ListHeader>*/}
                {/*            <Link href={'#'}>Android</Link>*/}
                {/*            <Link href={'#'}>iOS</Link>*/}
                {/*            <Link href={'#'}>Windows</Link>*/}
                {/*            <Link href={'#'}>MacOS</Link>*/}
                {/*        </Stack>*/}
                {/*    </SimpleGrid>*/}
                {/*</Container>*/}


                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{base: 'column', md: 'row'}}
                    spacing={4}
                    justify={{md: 'space-between'}}
                    align={{md: 'center'}}
                >
                    <Text>© 2023 Snippy. All rights reserved</Text>
                    <Stack direction={'row'} spacing={6}>
                        <IconButton
                            aria-label="Twitter"
                            icon={<FaTwitter/>}
                            size="md"
                            color={'white'}
                            bg={'twitter.400'}
                            _hover={{
                                bg: 'twitter.500',
                            }}
                        />
                        <IconButton
                            aria-label="YouTube"
                            icon={<FaYoutube/>}
                            size="md"
                            color={'white'}
                            bg={'red.400'}
                            _hover={{
                                bg: 'red.500',
                            }}
                        />
                        <IconButton
                            aria-label="Instagram"
                            icon={<FaInstagram/>}
                            size="md"
                            color={'white'}
                            bg={'pink.400'}
                            _hover={{
                                bg: 'pink.500',
                            }}
                        />
                        <IconButton
                            aria-label="LinkedIn"
                            icon={<FaLinkedin/>}
                            size="md"
                            color={'white'}
                            bg={'linkedin.400'}
                            _hover={{
                                bg: 'linkedin.500',
                            }}
                        />
                    </Stack>
                </Container>
            </Box>
        </Slider>
    );
};

export default Footer;