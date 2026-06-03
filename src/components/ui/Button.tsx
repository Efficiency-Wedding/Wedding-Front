import type { ButtonHTMLAttributes } from "react";
import { useState } from "react";
import { colors } from "@/constants/colors";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string;
    icon?: React.ElementType;
    className?: string;
};

export default function Button({
    text,
    icon: Icon,
    className = "",
    ...props
}: ButtonProps) {
    const [hover, setHover] = useState(false);

    return (
        <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                backgroundColor: hover ? colors.primaryDark : colors.primary,
            }}
            className={`inline-flex items-center gap-2 font-medium text-white transition duration-300 rounded-full px-5 py-2 shadow-md w-fit ${className}`}
            {...props}
        >
            {text}
            {Icon && <Icon className="w-4 h-4" />}
        </button>
    );
}