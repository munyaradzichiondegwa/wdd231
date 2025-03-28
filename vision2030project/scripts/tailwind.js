const tailwind = {};
tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#5D5CDE',
                        secondary: '#CE1126',
                        accent: '#F9CA24',
                        success: '#008751',
                        dark: {
                            bg: '#181818',
                            card: '#262626',
                            text: '#E5E5E5'
                        },
                        light: {
                            bg: '#FFFFFF',
                            card: '#F5F5F5',
                            text: '#333333'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }