import type { Config } from 'tailwindcss';
import * as colors from 'tailwindcss/colors';

export default <Partial<Config>>{
    darkMode: 'class',
    theme: {
        colors: {
            primary: '#25A18E',
            secondary: '#302425',
            'primary-element': '#25A18E',
            'primary-element-hover': '#302425',
            ...colors,
            // 'blue': '#1fb6ff',
            // 'purple': '#7e5bef',
            // 'pink': '#ff49db',
            // 'orange': '#ff7849',
            // 'green': '#13ce66',
            // 'yellow': '#ffc82c',
            // 'gray-dark': '#273444',
            // 'gray': '#8492a6',
            // 'gray-light': '#d3dce6',
        },
        fontFamily: {
            sans: ['ITC Avant Guard', 'sans-serif'],
            serif: ['Jimmy Script', 'serif'],
        }
    }
}
