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
        <nav className="flex justify-between items-center px-6 md:px-10 py-4 bg-white shadow-md">
            <div className="flex items-center">
                <a href="#home">
                    <img
                        src={logo}
                        alt="Efficiency Event logo"
                        className="w-40 h-10 object-contain cursor-pointer"
                    />
                </a>
            </div>
            <div className="hidden md:flex gap-8 font-medium text-gray-700">
                {menuItems.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="hover:text-primary transition"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
            <Button text="Planifier mon mariage" />
        </nav>
    );
}