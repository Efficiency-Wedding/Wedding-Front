import { useEffect, useState } from "react";
import Button from "@/site/components/ui/Button";
import bg from "@/assets/images/home/home.jpg";
import photo1 from "@/assets/images/home/photo.jpg";
import photo2 from "@/assets/images/home/photo4.jpg";
import photo3 from "@/assets/images/home/photo2.jpg";
import photo4 from "@/assets/images/home/photo3.jpg";
import photo16 from "@/assets/images/home/photo16.jpg";
import photo17 from "@/assets/images/home/photo17.jpg";
import photo18 from "@/assets/images/home/photo18.jpg";
import blog1 from "@/assets/images/blog/blog1.jpeg";
import photo7 from "@/assets/images/home/photo7.jpg";
import photo8 from "@/assets/images/home/photo8.jpg";
import photo9 from "@/assets/images/home/photo9.jpg";
import photo10 from "@/assets/images/home/photo10.jpg";
import photo11 from "@/assets/images/home/photo11.jpg";
import photo14 from "@/assets/images/home/photo14.jpg";
import photo15 from "@/assets/images/home/photo15.jpg";
import verre from "@/assets/images/home/verre.jpg";
import photo20 from "@/assets/images/home/photo6.jpg";
import photo21 from "@/assets/images/home/photo1.jpg";
import photo22 from "@/assets/images/home/photo5.jpg";
import { FaArrowRight, FaStar, FaPlus } from "react-icons/fa";
import Carousel from "@/site/components/ui/Carousel";
import {
    FaHeart,
    FaGlassCheers,
    FaCamera,
    FaClipboardCheck,
} from "react-icons/fa";
import Card from "../ui/Card";
import StatCard from "../ui/StatCard";
import TestimonialCard from "../ui/TestimonialCard";
import { useNavigate } from "react-router-dom";
import { api, assetUrl } from "@/shared/api";
import type { Article as ApiArticle, Service as ApiService } from "@/shared/api";
import { articles as fallbackBlogArticles } from "@/site/components/blog/data";

const weddingImages: string[] = [photo20, photo21, photo22];
const photoeImages: string[] = [photo1, photo2, photo3];
type FeatureCard = {
    image: string;
    icon: typeof FaHeart;
    title: string;
    description: string;
};

type HomeArticle = {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
};

const defaultFeatureCards: FeatureCard[] = [
    {
        image: photo8,
        icon: FaHeart,
        title: "Organisation Complète",
        description: "Planification et gestion de votre mariage de A à Z pour une expérience sereine et mémorable.",
    },
    {
        image: photo11,
        icon: FaGlassCheers,
        title: "Décoration & Réception",
        description: "Création d'une ambiance élégante et personnalisée pour sublimer chaque instant.",
    },
    {
        image: photo10,
        icon: FaCamera,
        title: "Photo & Vidéo",
        description: "Immortalisez chaque émotion grâce à une couverture photo et vidéo professionnelle.",
    },
    {
        image: photo9,
        icon: FaClipboardCheck,
        title: "Coordination Jour J",
        description: "Nous coordonnons chaque détail afin que vous profitiez pleinement de votre mariage.",
    },
];

function buildFeatureCards(apiServices: ApiService[]) {
    const icons = defaultFeatureCards.map((card) => card.icon);

    return apiServices.map((service, index) => {
        const image = assetUrl(service.image_url || service.image_principale) || defaultFeatureCards[index % defaultFeatureCards.length].image;
        const fallbackCard = defaultFeatureCards[index % defaultFeatureCards.length];

        return {
            ...fallbackCard,
            icon: icons[index % icons.length],
            image,
            title: service.nom,
            description: service.description_courte || service.description_complete || fallbackCard.description,
        };
    });
}

function toHomeArticle(article: ApiArticle): HomeArticle {
    const image = assetUrl(article.image_url || article.image) || blog1;
    const content = article.contenu || "";

    return {
        id: article.id,
        title: article.titre,
        excerpt: content.length > 160 ? `${content.slice(0, 160)}...` : content,
        date: article.date_publication || article.created_at || "",
        image,
    };
}
const stats: {
    number: string;
    label: string;
}[] = [
        {
            number: "3k+",
            label: "Projects",
        },
        {
            number: "200+",
            label: "Clients",
        },
        {
            number: "350+",
            label: "Awards",
        },
        {
            number: "16+",
            label: "Years",
        },
    ];

const Home = () => {
    const navigate = useNavigate();
    const [featureCards, setFeatureCards] = useState(defaultFeatureCards);
    const [recentArticles, setRecentArticles] = useState<HomeArticle[]>(
        fallbackBlogArticles.slice(0, 3).map((article) => ({
            id: article.id,
            title: article.title,
            excerpt: article.excerpt,
            date: article.date,
            image: article.image,
        })),
    );

    useEffect(() => {
        let cancelled = false;

        Promise.allSettled([api.getActiveServices(), api.getArticles()]).then(
            ([servicesResult, articlesResult]) => {
                if (cancelled) {
                    return;
                }

                if (servicesResult.status === "fulfilled" && servicesResult.value.length > 0) {
                    setFeatureCards(buildFeatureCards(servicesResult.value));
                }

                if (articlesResult.status === "fulfilled" && articlesResult.value.length > 0) {
                    setRecentArticles(articlesResult.value.slice(0, 3).map(toHomeArticle));
                }
            },
        );

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <section
            id="home"
            className="flex flex-col bg-background overflow-x-hidden px-4 sm:px-6 lg:px-12 xl:px-[100px]"
        >
            <div className="flex flex-col lg:flex-row py-8 sm:py-10 gap-10 lg:gap-6 mt-6 sm:mt-10">
                <div className="w-full lg:w-1/3 flex items-center px-1 sm:px-6 lg:px-4 py-4 sm:py-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight text-left">
                            Dites Oui à l'Amour, Nous Faisons le Reste
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg mb-6 text-justify">
                            Wedding planner professionnel à Madagascar.
                            Nous organisons votre mariage de A à Z pour faire de votre grand jour un moment inoubliable.                        </p>
                        <Button text="Réserver votre Date" icon={FaArrowRight} onClick={() => navigate("/reservation")} />
                        <p className="mt-5 text-gray-500 text-sm">
                            Mariage clé en main garantie.
                        </p>
                        <div className="flex items-center mt-5">
                            <img src={photo1} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-white object-cover" />
                            <img src={photo2} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-white -ml-3 object-cover" />
                            <img src={photo3} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-white -ml-3 object-cover" />

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

                <div className="w-full lg:w-1/3 px-1 sm:px-6 lg:px-4 py-8 flex flex-col justify-center">
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
                            <Carousel images={photoeImages} />
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
                        <Button text="#Satisfaction 100 % garantie." onClick={() => navigate("/gallery")} />
                        <Button text="#Amour & émotions" onClick={() => navigate("/gallery")} />
                        <Button text="#Prestations 100 % assurées" onClick={() => navigate("/services")} />
                        <Button text="#Mariage" onClick={() => navigate("/services")} />
                        <Button text="#Mariage premium" onClick={() => navigate("/services")} />
                        <Button text="#Amour & émotions" onClick={() => navigate("/gallery")} />
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

            <div className="flex flex-col lg:flex-row gap-10 py-14 sm:py-20 items-center">
                <div className="w-full lg:w-1/2 flex gap-4 items-end">

                    <div className="w-full bg-white p-2 pb-4 rounded-xl shadow-md transition-all duration-700 hover:scale-105 hover:shadow-2xl">
                        <img
                            src={photo7}
                            alt="Mariage"
                            className="w-full h-[240px] sm:h-[350px] object-cover rounded-2xl"
                        />
                    </div>

                    <div className="w-full bg-white p-2 pb-4 rounded-xl shadow-md transition-all duration-700 hover:scale-105 hover:shadow-2xl mt-10">
                        <img
                            src={photo4}
                            alt="Mariage"
                            className="w-full h-[190px] sm:h-[250px] object-cover rounded-2xl"
                        />
                    </div>

                </div>

                <div className="w-full lg:w-1/2">
                    <div className="flex items-center text-sm font-semibold text-primary pb-5">
                        <span>01</span>

                        <span className="mx-3 min-w-0 flex-1 border-b border-dotted border-primary/40" />

                        <span>A propos</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        Nous Créons des Mariages Élégants et Inoubliables
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Notre équipe accompagne les futurs mariés dans chaque étape
                        de l'organisation. De la conception du thème à la coordination
                        du Jour J, nous transformons vos idées en une expérience
                        exceptionnelle remplie d'émotions et de souvenirs.
                    </p>
                    <Button
                        text="Découvrir nos services"
                        icon={FaArrowRight}
                        onClick={() => navigate("/services")}
                    />
                </div>
            </div>

            <div className="pb-20">
                <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-end mb-12">

                    <div className="max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Pour votre grand jour
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-3">
                        <div className="flex items-center text-sm font-semibold text-primary">
                            <span>03</span>

                            <span className="mx-3 w-24 sm:w-40 md:w-64 border-b border-dotted border-primary/40" />

                            <span>Prestations</span>
                        </div>

                        <p className="text-gray-600 text-sm text-left md:text-right max-w-xs">
                            Des prestations soignées pour un mariage inoubliable, élégant et plein d’émotions.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {featureCards.slice(0, 4).map((card) => (
                        <Card
                            key={card.title}
                            image={card.image}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center mt-16 bg-primary-light p-4 sm:p-8 rounded-xl">

                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`p-4
                ${index !== stats.length - 1 ? "md:border-r border-gray-300" : ""}
                ${index < 2 ? "border-b md:border-b-0" : ""}
            `}
                        >
                            <StatCard
                                number={stat.number}
                                label={stat.label}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-20 flex flex-col gap-6">
                <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-end mb-12">

                    <div className="max-w-2xl">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Histoires vécues par nos clients
                        </h2>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-3">
                        <div className="flex items-center text-sm font-semibold text-primary">
                            <span>03</span>

                            <span className="mx-3 w-24 sm:w-40 md:w-64 border-b border-dotted border-primary/40" />

                            <span>Témoignages</span>
                        </div>

                        <p className="text-gray-600 text-sm text-left md:text-right max-w-xs">
                            Des couples heureux partagent leur expérience et les moments inoubliables de leur mariage.
                        </p>
                    </div>
                </div>
                <TestimonialCard
                    image1={photo3}
                    image2={photo16}
                    name="Niaiko & Sitraka"
                    text="Un moment magique du début à la fin. L’organisation était fluide, élégante et sans stress. Nous avons pu profiter pleinement de notre journée."
                    tags={["Amour", "Luxe", "Mariage"]}
                    footerTag="#Moments capturés"
                />
                <TestimonialCard
                    image1={photo18}
                    image2={photo17}
                    name="Miarinaja & Larissa"
                    text="Chaque détail était parfaitement pensé. La décoration, l’ambiance et la coordination ont dépassé toutes nos attentes."
                    tags={["Élégance", "Romance"]}
                    footerTag="#Souvenirs inoubliables"
                    reverseImages
                />
                <TestimonialCard
                    image1={photo14}
                    image2={photo15}
                    name="Fara & Hery"
                    text="Une expérience inoubliable. L’équipe a su transformer notre vision en un mariage élégant et rempli d’émotions."
                    tags={["Émotion", "Prestige", "Joie"]}
                    footerTag="#Love Story"
                />
            </div>

            {recentArticles.length > 0 && (
                <div className="py-20">
                    <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-end mb-12">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                Derniers articles publiés
                            </h2>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-3">
                            <div className="flex items-center text-sm font-semibold text-primary">
                                <span>04</span>

                                <span className="mx-3 w-24 sm:w-40 md:w-64 border-b border-dotted border-primary/40" />

                                <span>Blog</span>
                            </div>

                            <p className="text-gray-600 text-sm text-left md:text-right max-w-xs">
                                Les contenus publiés dans l'admin s'affichent ici automatiquement.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recentArticles.map((article) => (
                            <div
                                key={article.id}
                                className="overflow-hidden rounded-2xl bg-white shadow-md border border-black/5 transition-transform hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="h-52 overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <p className="text-xs uppercase tracking-[0.18em] text-[#b73f68]">
                                        {article.date ? new Date(article.date.replace(" ", "T")).toLocaleDateString("fr-FR") : "Blog"}
                                    </p>
                                    <h3 className="mt-3 text-xl font-bold text-gray-900 leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-gray-600">
                                        {article.excerpt}
                                    </p>
                                    <div className="mt-6">
                                        <Button text="Lire l'article" onClick={() => navigate("/blog")} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </section >
    );
};

export default Home;
