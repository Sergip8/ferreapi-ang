  /** @type {import('tailwindcss').Config} */
  export default {
      content: ["./src/**/*.{html,ts}"],
        theme: {
          extend: {
            colors: {
              'brand': {
                yellow: {
                  100: '#FFF9C4',
                  200: '#FFF1C4',
                  500: '#FFEB3B',
                  700: '#FBC02D'
                },
                red: {
                  100: '#FFCDD2',
                  500: '#F44336',
                  700: '#D32F2F'
                }
              },
              yellowAccent: '#fcb900',
              orangeAccent: '#ff6900',
              vividRed: '#cf2e2e',
            }
          
          },
        },
        plugins: [],
      }