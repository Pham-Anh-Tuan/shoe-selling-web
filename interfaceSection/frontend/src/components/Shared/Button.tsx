import React from "react";

interface ButtonProps {
    text: string;
    bgColor: string;
    textColor: string;
}

const Button: React.FC<ButtonProps> = ({ text, bgColor, textColor }) => {
    return <button
        className={`${bgColor} ${textColor}
    cursor-pointer hover:scale-105
    duration-300 py-2 px-8 rounded-full
    relative z-10`}
    > {text}</button>;
}

export default Button;