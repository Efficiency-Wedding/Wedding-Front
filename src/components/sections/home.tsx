import type { FC } from "react";
import Button from "@/components/ui/Button";
import bg from "@/assets/images/home/bck.avif";
import profil1 from "@/assets/images/home/profil1.avif";
import profil2 from "@/assets/images/home/profil2.jpg";
import profil3 from "@/assets/images/home/profil3.jpg";
import verre from "@/assets/images/home/verre.jpg";
import wed1 from "@/assets/images/home/wed1.avif";
import wed2 from "@/assets/images/home/wed2.avif";
import wed3 from "@/assets/images/home/wed.avif";
import { FaArrowRight, FaStar, FaPlus } from "react-icons/fa";
import Carousel from "@/components/ui/Carousel";

type Props = {};

const weddingImages: string[] = [wed1, wed2, wed3];
const profileImages: string[] = [profil1, profil2, profil3];

const Home: FC<Props> = () => {
    return (
        <section
            id="home"
            className="flex flex-col bg-background overflow-x-hidden px-4 sm:px-6 lg:px-[100px]"
        >
            <div className="flex flex-col lg:flex-row py-10 gap-10 lg:gap-0 mt-10">
                <div className="w-full lg:w-1/3 flex items-center px-4 sm:px-10 py-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight text-left">
                            Dites Oui à l'Amour, Nous Faisons le Reste
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg mb-6 text-justify">
                            Wedding planner professionnel à Madagascar.
                            Nous organisons votre mariage de A à Z pour faire de votre grand jour un moment inoubliable.
                        </p>
                        <Button text="Réserver votre Date" icon={FaArrowRight} />
                        <p className="mt-5 text-gray-500 text-sm">
                            Mariage clé en main garantie.
                        </p>
                        <div className="flex items-center mt-5">
                            <img src={profil1} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-white object-cover" />
                            <img src={profil2} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-white -ml-3 object-cover" />
                            <img src={profil3} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-white -ml-3 object-cover" />

                            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gray-900 text-white flex items-center justify-center border-2 border-white -ml-3">
                                <FaPlus size={14} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/3 flex items-center justify-center">
                    <div className="relative w-fit mx-auto">
                        <div className="p-2 border-2 border-black/10 rounded-[250px] w-[260px] sm:w-[320px] lg:w-[380px]">
                            <img
                                src={bg}
                                alt="visual"
                                className="w-full h-full object-cover rounded-[250px]"
                            />
                        </div>
                        <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2">
                            <div className="w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                                <img
                                    src={verre}
                                    alt="badge"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/3 px-4 sm:px-8 py-8 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                        Mariages de Rêve
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        Découvrez quelques-uns de nos plus beaux événements.
                    </p>
                    <div className="mb-10">
                        <div className="block lg:hidden w-full">
                            <Carousel images={weddingImages} />
                        </div>

                        <div className="hidden lg:grid lg:grid-cols-2 gap-4 w-full">
                            <Carousel images={weddingImages} />
                            <Carousel images={profileImages} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-5 flex-wrap">
                        <div className="flex text-yellow-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar className="text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">4.6</p>
                        <p className="text-sm text-gray-500">(46%)</p>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2 justify-start">
                        <Button text="#Moments capturés" />
                        <Button text="#Amour & émotions" />
                        <Button text="#Luxure" />
                        <Button text="#Mariage" />
                        <Button text="#Mariage premium" />
                        <Button text="#Amour & émotions" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-stretch text-center lg:text-left gap-6 lg:gap-0 px-4 sm:px-10 py-6 bg-primary-light rounded-xl mx-2 sm:mx-6 mb-10">
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start lg:pr-8">
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                        Parce que Chaque <br />
                        Mariage est Unique
                    </p>
                </div>
                <div className="w-full lg:w-1/3 flex justify-center items-center lg:px-8 lg:border-l lg:border-r border-gray-300">
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium text-center max-w-sm">
                        Que vous rêviez d'une cérémonie intime ou d'une réception grandiose, nous nous occupons de tout :
                        décoration, salle, traiteur, animation, photo, vidéo et coordination du Jour J.
                    </p>
                </div>
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-end lg:pl-8 lg:border-l border-gray-300">
                    <div className="text-center lg:text-right">
                        <p className="text-3xl sm:text-4xl font-bold text-gray-900">100+</p>
                        <p className="text-xs text-gray-600 mt-1">
                            100+ événements réussis
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Home;