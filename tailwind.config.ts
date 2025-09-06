import type { Config } from "tailwindcss";

const config: Config = {
  
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Montserrat", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-blue':'#6c85b1'
      },
     
    },
  },
  plugins: [],
};
export default config;