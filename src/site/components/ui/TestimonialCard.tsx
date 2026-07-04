import { FaStar } from "react-icons/fa";

type TestimonialCardProps = {
    image1: string;
    image2: string;
    name: string;
    text: string;
    tags?: string[];
    footerTag?: string;
    reverseImages?: boolean;
};

const tagClass = "px-3 py-1.5 text-sm font-medium rounded-full bg-primary text-white cursor-pointer transition-all duration-300 hover:bg-hover hover:-translate-y-1 hover:scale-105 hover:text-black";

export default function TestimonialCard({
    image1,
    image2,
    name,
    text,
    tags,
    footerTag,
    reverseImages = false,
}: TestimonialCardProps) {
    return (
        <div className="px-5 sm:px-8 lg:px-[50px] py-6 flex flex-col lg:flex-row gap-8 items-center bg-primary-light rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-500">
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
                <div className="flex gap-1 text-yellow-400 text-sm">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            className="transition-transform duration-300 hover:scale-125"
                        />
                    ))}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 transition-colors duration-300 hover:text-primary">
                    {name}
                </h2>

                <p className="text-gray-600 leading-relaxed text-sm lg:text-base pb-2">
                    {text}
                </p>

                {tags?.length ? (
                    <div className="flex flex-wrap gap-2 pt-3">
                        {tags.map((tag) => (
                            <span key={tag} className={tagClass}>
                                {tag}
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>

            <div
                className={`w-full lg:w-1/2 flex gap-3 items-center sm:scale-95 lg:scale-90 ${reverseImages ? "flex-row-reverse" : ""
                    }`}
            >
                <div className="w-1/2 bg-white p-2 pb-6 rounded-xl shadow-lg transition-all duration-700 hover:rotate-2 hover:scale-105">
                    <div className="overflow-hidden rounded-md">
                        <img
                            src={image1}
                            alt="testimonial 1"
                            className="w-full h-[190px] sm:h-[240px] lg:h-[260px] object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </div>
                </div>

                <div className="w-1/2 flex flex-col gap-2">
                    <div className="w-full h-[150px] sm:h-[190px] lg:h-[200px] bg-white p-2 pb-6 rounded-xl shadow-lg transition-all duration-700 hover:scale-105 hover:shadow-2xl">
                        <img
                            src={image2}
                            alt="testimonial 2"
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>

                    {footerTag && (
                        <span
                            className={`${tagClass} px-4 py-2 mx-auto w-fit`}
                        >
                            {footerTag}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
