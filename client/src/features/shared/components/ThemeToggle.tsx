import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/Button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const {theme, setTheme} = useTheme()

    const handleToggleTheme = () => {
        setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark')
    }

    return (
        <Button
            variant='ghost' 
            className="justify-start p-2"
            onClick={handleToggleTheme}
        >
            {theme === 'dark'
            ? (
                <>
                    <Sun className="h-6 w-6"/>
                    Light Mode
                </>
            )
            : (
                <>
                    <Moon className="h-6 w-6" />
                    Dark Mode
                </>
            )
        }
        </Button>
    )
}