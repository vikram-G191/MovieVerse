import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className=" flex items-center gap-2 rounded-full p-3 shadow-lg transition 
                 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400" />
      )}
      <span className="font-medium text-sm text-gray-700 dark:text-gray-200">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </motion.button>
  );
}

