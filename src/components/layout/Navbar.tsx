import logo from "@/assets/images/icons/logo.jpg";
import Button from "@/components/ui/Button";

const menuItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" }
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-background shadow-md">
            <nav className="flex justify-between items-center px-6 md:px-10 py-4">
                <a href="#home" className="flex items-center">
                    <img
                        src={logo}
                        alt="Efficiency Event logo"
                        className="w-40 h-10 object-contain cursor-pointer hover:scale-105 transition"
                    />
                </a>
                <div className="hidden md:flex gap-8 font-medium text-gray-700">
                    {menuItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="relative group transition"
                        >
                            <span className="group-hover:text-primary transition-colors duration-300">
                                {item.label}
                            </span>

                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>
                <Button
                    text="Planifier mon mariage"
                    onClick={() =>
                        document.getElementById("contact")?.scrollIntoView({
                            behavior: "smooth"
                        })
                    }
                />
            </nav>
        </header>
    );
}