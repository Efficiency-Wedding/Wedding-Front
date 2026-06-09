import type { ElementType } from "react";

export type ServiceCardProps = {
    image: string;
    icon: ElementType;
    title: string;
    description: string;
};

export default function Card({
    image,
    icon: Icon,
    title,
    description,
}: ServiceCardProps) {
    return (
        <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative p-4 pb-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-56 sm:h-64 object-cover rounded-2xl"
                />
                <div className="absolute -bottom-8 right-8 sm:right-16 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-dark shadow-lg flex items-center justify-center bg-pink-100">
                    <Icon className="text-primary text-2xl sm:text-3xl" />
                </div>
            </div>
            <div className="pt-14 sm:pt-16 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 truncate" title={title}>
                    {title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8 overflow-hidden"
                   style={{
                     display: "-webkit-box",
                     WebkitLineClamp: 3,
                     WebkitBoxOrient: "vertical" as const,
                   }}>
                    {description}
                </p>
            </div>
        </div>
    );
}
