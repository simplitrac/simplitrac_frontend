import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    config: {
        useSystemColorMode: true,

    },
    colors: {
        primary: {
            main: '#007BFF',
            hover: '#0056b3',
        },
        text: '#495057',
        background: 'black',
        border: '#ced4da',
        error: {
            main: '#dc3545',
            hover: '#c82333',
        },
    },
    fonts: {
        body: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        heading: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    styles: {
        global: {
            body: {
                lineHeight: 1.5,
                color: 'text',
                bg: 'background',
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'normal',
                borderRadius: '5px',
            },
            variants: {
                solid: {
                    bg: 'primary.main',
                    color: 'white',
                    _hover: {
                        bg: 'primary.hover',
                    },
                },
                delete: {
                    bg: 'error.main',
                    color: 'white',
                    _hover: {
                        bg: 'error.hover',
                    },
                },
            },
        },
        Form: {
            baseStyle: {
                width: '100%',
                padding: '2rem',
                bg: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
        },
        FormLabel: {
            baseStyle: {
                marginBottom: '0.5rem',
                fontWeight: 'bold',
            },
        },
        Input: {
            baseStyle: {
                field: {
                    width: '100%',
                    padding: '0.75rem',
                    borderColor: 'border',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    _focus: {
                        borderColor: 'primary.main',
                        boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
                    },
                },
            },
        },
        Modal: {
            baseStyle: {
                overlay: {
                    bg: 'rgba(0, 0, 0, 0.75)',
                },
                dialog: {
                    width: '90%',
                    maxWidth: '500px',
                    padding: '20px',
                    bg: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                },
            },
        },
    },
})

export default theme