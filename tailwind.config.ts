import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    darkMode: 'class',
    theme: {
        colors: {
            primary: '#fecb3b',
            secondary: '#141c3d',
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
