import { useState } from "react";
import logo from "@/assets/images/icons/logo.jpg";
import Button from "@/components/ui/Button";
import { FaBars, FaTimes } from "react-icons/fa";

const menuItems = [
    { id: "home", label: "Home" },
    { id: "apropos", label: "A propos" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" }
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth"
        });
    };

    const Menu = ({ onClick }: { onClick?: () => void }) => (
        <>
            {menuItems.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                        onClick?.();
                        scrollTo(item.id);
                    }}
                    className="relative group text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-100 transition w-full whitespace-nowrap"
                >
                    <span className="group-hover:text-primary transition-colors duration-300">
                        {item.label}
                    </span>

                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
            ))}
        </>
    );

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-200">
            <nav className="flex justify-between items-center px-4 md:px-10 py-4">
                <a
                    href="#home"
                    className="flex items-center shrink-0 z-50"
                >
                    <img
                        src={logo}
                        alt="logo"
                        className="w-[140px] h-10 object-contain cursor-pointer hover:scale-105 transition shrink-0"
                    />
                </a>
                <div className="hidden md:flex gap-10 text-sm">
                    <Menu />
                </div>

                <div className="hidden md:block">
                    <Button
                        text="Réserver"
                        onClick={() => scrollTo("contact")}
                    />
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition flex items-center justify-center shrink-0 z-50"
                >
                    {open ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </nav>

            {open && (
                <div className="md:hidden bg-background border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <Menu onClick={() => setOpen(false)} />
                    </div>
                    <div className="pt-2">
                        <Button
                            text="Réserver"
                            onClick={() => {
                                setOpen(false);
                                scrollTo("contact");
                            }}
                        />
                    </div>
                </div>
            )}
        </header>
    );
}