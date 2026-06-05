import type { ButtonHTMLAttributes } from "react";

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
    return (
        <button
            className={`inline-flex max-w-full items-center justify-center gap-2 whitespace-normal break-words text-center font-medium text-white transition duration-300 rounded-full px-5 py-2 shadow-md w-fit bg-primary hover:bg-hover hover:text-black ${className}`}
            {...props}
        >
            {text}
            {Icon && <Icon className="w-4 h-4" />}
        </button>
    );
}
