import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type CarouselProps = {
    images?: string[];
};

export default function Carousel({ images = [] }: CarouselProps) {
    const [index, setIndex] = useState<number>(0);

    const nextImage = (): void => {
        if (images.length === 0) return;
        setIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="w-full">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img
                    src={images[index]}
                    alt="carousel image"
                    className="w-full h-full object-cover transition-all duration-300"
                />
                <button
                    onClick={nextImage}
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"
                >
                    <FaArrowRight />
                </button>

            </div>
        </div>
    );
}