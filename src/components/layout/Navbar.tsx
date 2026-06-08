import { useState } from "react";
import logo from "@/assets/images/icons/logo.jpg";
import Button from "@/components/ui/Button";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const menuItems = [
    { id: "", label: "Home" },
    { id: "apropos", label: "A propos" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" }
];

const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
        behavior: "smooth"
    });
};

const Menu = ({ onClick }: { onClick?: () => void }) => (
    <>
        {menuItems.map((item) => (
            <Link
                key={item.id}
                to={`/${item.id}`}
                onClick={() => {
                    onClick?.();
                    scrollTo(item.id);
                }}
                className="relative group border border-transparent text-[#3a3287]/90 font-medium py-2 px-3 rounded-lg hover:border-[#ae4264]/45 hover:bg-[#fce2fb]/75 transition w-full whitespace-nowrap"
            >
                <span className="group-hover:text-[#ae4264] transition-colors duration-300">
                    {item.label}
                </span>

                <span className="absolute left-3 right-3 -bottom-1 h-[2px] origin-left scale-x-0 bg-[#ae4264] transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
        ))}
    </>
);

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <motion.header
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-50 backdrop-blur-md border-b border-[#f7c0f7]/35 shadow-sm shadow-[#f7c0f7]/15"
            style={{
                background:
                    "linear-gradient(180deg, rgba(250,203,249,0.92) 0%, rgba(252,226,251,0.95) 30%, rgba(254,254,252,0.96) 72%)"
            }}
        >
            <nav className="flex justify-between items-center px-4 lg:px-10 py-3 md:py-4 gap-4">
                <Link
                    to="/"
                    className="flex items-center shrink-0 z-50"
                >
                    <img
                        src={logo}
                        alt="logo"
                        className="w-[140px] h-10 object-contain cursor-pointer hover:scale-105 transition shrink-0"
                    />
                </Link>
                <div className="hidden lg:flex gap-3 xl:gap-6 text-sm">
                    <Menu />
                </div>

                <div className="hidden lg:block">
                    <Button
                        text="Réserver"
                        onClick={() => scrollTo("contact")}
                    />
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden p-2 rounded-lg hover:bg-rose-soft/80 transition flex items-center justify-center shrink-0 z-50 text-foreground"
                >
                    {open ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </nav>

            {open && (
                <div
                    className="lg:hidden border-t border-[#f7c0f7]/35 px-6 py-5 flex flex-col gap-4"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(254,254,252,0.98) 0%, rgba(252,226,251,0.96) 100%)"
                    }}
                >
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
        </motion.header>
    );
}
