import type React from "react";

const LoginBtn: React.FC = () => {

    const handleLogin = () => {
        window.location.href = "http://localhost:3000/api/v1/auth/google";
    }

    return (
        <button onClick={handleLogin} className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Login
        </button>
    )
}

export default LoginBtn;