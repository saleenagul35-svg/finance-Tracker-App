import react from "react"
import { createContext, useEffect, useState } from "react"



export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
    const [Theme, setTheme] = useState(true);
    const toggleTheme = () => {
        setTheme(!Theme)
    }
    useEffect(() => {
        if (Theme) {
            document.body.classList.add("Dark");
        } else {
            document.body.classList.remove("Dark");
        }
    }, [Theme]);
    return (
        <ThemeContext.Provider value={{ Theme, toggleTheme }}>
         
            {children}
        
        </ThemeContext.Provider>
    )

}