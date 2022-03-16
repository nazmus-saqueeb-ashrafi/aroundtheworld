const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
       Noto: ["Noto Serif Display", "serif"],
       Asap: ['Asap', 'sans-serif'],
       Abril: ['Abril Fatface', 'cursive']
      },
    },
    screen:{
      
      ...defaultTheme.screens,

    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald','Mistral','Noto Serif Display'],
      'body': ['"Open Sans"'],
    },
    
  },
  plugins: [require("daisyui",'flowbite/plugin')],
}
