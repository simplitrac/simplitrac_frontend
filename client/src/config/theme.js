import { background, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    config: {
        useSystemColorMode: true,

    },
    colors: {
        primary: {
            main: '#1b263b', //home page buttons
            hover: '#0056b3',
        },
        text: '#495057',
        background: '#415A77',
        border: '#ced4da',
        error: {
            main: '#dc3545',
            hover: '#c82333',
        },
        // app color palatte, the numbers are shades of the color
        richBlack: {
            50: '#e5e6e8',
            100: '#bcc1c4',
            200: '#929b9f',
            300: '#68767b',
            400: '#48585e',
            500: '#0d1b2a',  // Original color
            600: '#0b1624',
            700: '#08111d',
            800: '#060c16',
            900: '#03080f',
          },
          oxfordBlue: {
            50: '#e7e8ea',
            100: '#c2c5ca',
            200: '#9da1a9',
            300: '#777e89',
            400: '#5c626f',
            500: '#1b263b',  // Original color
            600: '#172134',
            700: '#131b2c',
            800: '#0e1525',
            900: '#0a0f1e',
          },
          yinmnBlue: {
            50: '#ebedf0',
            100: '#cdd2da',
            200: '#aeb7c4',
            300: '#8f9bad',
            400: '#79879d',
            500: '#415a77',  // Original color
            600: '#3a506b',
            700: '#33475f',
            800: '#2b3d52',
            900: '#243446',
          },
          silverLakeBlue: {
            50: '#f0f2f4',
            100: '#d8dde1',
            200: '#bfc7cd',
            300: '#a7b1b9',
            400: '#929ca6',
            500: '#778da9',  // Original color
            600: '#6a7e98',
            700: '#5d7087',
            800: '#506176',
            900: '#434e65',
          },
          platinum: {
            50: '#f7f7f7',
            100: '#eeeeee',
            200: '#e5e5e5',
            300: '#dcdcdc',
            400: '#d3d3d3',
            500: '#e0e1dd',  // Original color
            600: '#bcbcb8',
            700: '#999993',
            800: '#75756e',
            900: '#52524a',

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
                    bg: '#415a77',
                    color: 'white',
                    _hover: {
                        bg: '#999993',
                    },
                },
                delete: {
                    bg: 'error.main',
                    background: '#999993',
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