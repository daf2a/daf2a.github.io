// src/pages/Portfolio.tsx
import axios from "axios";
import { useState, useEffect, ReactElement } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BlockMapType } from "react-notion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsCalendarDate } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { motion, AnimatePresence } from "framer-motion";
import LottieAnimationCat from "@/components/ui/LottieAnimationCat";

interface PortfolioPost {
  title: string;
  description: string;
  date: string;
  image: string;
  type: string;
  techstack: string;
  onClick: () => void;
}

interface Portfolio {
  id: string;
  title: string;
  deskripsi: string;
  img_url: string;
  date: string;
  type: string;
  techstack: string;
  properties: BlockMapType;
}

function PortfolioCard({
  title,
  description,
  date,
  image,
  type,
  techstack,
  onClick,
}: PortfolioPost): ReactElement {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const colorPairs = [
    { text: "text-green-100", bg: "bg-green-900/40" },
    { text: "text-cyan-100", bg: "bg-cyan-900/40" },
    { text: "text-blue-100", bg: "bg-blue-900/40" },
    { text: "text-red-100", bg: "bg-red-900/40" },
    { text: "text-yellow-100", bg: "bg-yellow-900/40" },
    { text: "text-indigo-100", bg: "bg-indigo-900/40" },
    { text: "text-purple-100", bg: "bg-purple-900/40" },
    { text: "text-pink-100", bg: "bg-pink-900/40" },
  ];

  return (
    <div
      className="flex flex-col sm:flex-row items-center text-left gap-4 rounded-lg shadow-sm dark:border px-6 py-6 md:py-2 mt-4 lg:mt-0 cursor-pointer bg-zinc-950 hover:bg-zinc-900"
      onClick={onClick}
    >
      {!isImageLoaded && (
        <Skeleton className="w-full sm:w-[30%] h-[110px] rounded-lg" />
      )}
      <img
        src={image || "/placeholder.svg"}
        alt="Blog Image"
        width={200}
        height={110}
        className={`w-full sm:w-[30%] h-[110px] rounded-lg object-cover bg-zinc-900 ${isImageLoaded ? "block" : "hidden"}`}
        onLoad={() => setIsImageLoaded(true)}
        onError={(e) => {
          e.currentTarget.src = "/placeholder.svg";
          setIsImageLoaded(true);
        }}
      />
      <div className="space-y-1 w-full sm:w-[70%] md:p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {techstack.split(",").map((tech, index) => {
            const colorPair =
              colorPairs[Math.floor(Math.random() * colorPairs.length)];
            return (
              <span
                key={index}
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${colorPair.text} ${colorPair.bg} mr-1`}
              >
                {tech.trim()}
              </span>
            );
          })}
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>
        <div className="hidden items-center text-xs text-gray-500 dark:text-gray-400">
          <BsCalendarDate className="mr-1 h-3 w-3" />
          <span>Published on {date}</span>
          <span>type {type}</span>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio(): ReactElement {
  const [data, setData] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("open"); // State untuk menyimpan tab aktif
  const navigate = useNavigate();
  const location = useLocation();
  const isPortfolioRoute = location.pathname === "/portfolio";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  });

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("portfolioData");
      
      if (cachedData) {
        setData(JSON.parse(cachedData));
      } else {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://be-daf2a.vercel.app/api/notion-portfolio`
          );

          if (response.status !== 200) {
            throw new Error("Notion API request failed");
          }

          const sortedData = sortByDate(response.data);
          localStorage.setItem("portfolioData", JSON.stringify(sortedData));
          setData(sortedData);
        } catch (error) {
          console.error("Error fetching Notion data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  const sortByDate = (data: Portfolio[]): Portfolio[] => {
    return data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCardClick = (portfolio: Portfolio): void => {
    navigate(`${portfolio.type}/${portfolio.id}`, { state: { portfolio } });
  };

  const fadeStyle = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
  };

  return (
    <div>
      <AnimatePresence>
        {isLoading && isPortfolioRoute && (
          <motion.div
            className="fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <LottieAnimationCat />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed top-0 -z-50 h-screen w-full">
        <div className="h-screen w-full dark:bg-transparent bg-white dark:bg-dot-white/[0.15] bg-dot-black/[0.15] items-center justify-center"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      </div>
      {isPortfolioRoute && (
        <Tabs
          value={activeTab}
          style={fadeStyle}
          onValueChange={setActiveTab}
          className="w-full md:mt-6 md:w-10/12 items-center justify-center mx-auto"
        >
          <TabsList className="rounded-none w-full">
            <TabsTrigger value="open" className="w-1/2 mx-4">
              Open Project
            </TabsTrigger>
            <TabsTrigger value="close" className="w-1/2 mx-4">
              Private Project
            </TabsTrigger>
          </TabsList>
          <TabsContent value="open">
            <div className="py-4 -mt-2 md:mt-0 lg:grid lg:grid-cols-2 lg:gap-4 mx-6">
              {data
                .filter((portfolio) => portfolio.type === "open")
                .map((portfolio) => (
                  <PortfolioCard
                    key={portfolio.id}
                    title={portfolio.title}
                    description={portfolio.deskripsi}
                    date={formatDate(portfolio.date)}
                    image={portfolio.img_url}
                    type={portfolio.type}
                    techstack={portfolio.techstack}
                    onClick={() => handleCardClick(portfolio)}
                  />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="close">
            <div className="py-4 -mt-2 md:mt-0 lg:grid lg:grid-cols-2 lg:gap-4 mx-6">
              {data
                .filter((portfolio) => portfolio.type === "close")
                .map((portfolio) => (
                  <PortfolioCard
                    key={portfolio.id}
                    title={portfolio.title}
                    description={portfolio.deskripsi}
                    date={formatDate(portfolio.date)}
                    image={portfolio.img_url}
                    type={portfolio.type}
                    techstack={portfolio.techstack}
                    onClick={() => handleCardClick(portfolio)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
      <Outlet context={data} />
    </div>
  );
}
