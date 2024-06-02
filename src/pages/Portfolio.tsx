import axios from "axios";
import { useState, useEffect, ReactElement } from "react";
import { BlockMapType } from "react-notion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BsCalendarDate } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { motion, AnimatePresence } from "framer-motion";

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
      className="flex flex-col sm:flex-row items-center text-left gap-4 rounded-lg shadow-sm dark:border px-6 py-6 md:py-2 mt-4 lg:mt-0 cursor-pointer bg-zinc-950"
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
          {description.length > 120
            ? description.substring(0, 120) + "..."
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
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("open"); // State untuk menyimpan tab aktif

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://be-daf2a.vercel.app/api/notion-portfolio"
        );

        if (response.status !== 200) {
          throw new Error("Notion API request failed");
        }
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Notion data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCardClick = (portfolio: Portfolio): void => {
    setSelectedPortfolio(portfolio);
  };

  const handleBackClick = (): void => {
    setSelectedPortfolio(null);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            <p className="text-zinc-400 text-sm mt-6">
              Fetching data from Notion...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {selectedPortfolio ? (
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: "easeInOut",
          }}
          className=""
        >
          <div className="p-8 md:p-16 item-left text-left bg-zinc-200 relative">
            <Button
              onClick={handleBackClick}
              variant="outline"
              className="mb-4 -mt-4 sticky top-20 md:left-4 left-2"
            >
              Back to Project List
            </Button>
            <div className="self-start">
              <NotionRenderer blockMap={selectedPortfolio.properties} />
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="fixed top-0 -z-50 h-screen w-full">
            <div className="h-screen w-full dark:bg-transparent bg-white dark:bg-dot-white/[0.15] bg-dot-black/[0.15] items-center justify-center"></div>
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full md:mt-6 md:w-10/12 items-center justify-center mx-auto"
          >
            <TabsList className="rounded-none w-full">
              <TabsTrigger value="open" className="w-1/2 mx-4">
                Open Project
              </TabsTrigger>
              <TabsTrigger value="close" className="w-1/2 mx-4">
                Close Project
              </TabsTrigger>
            </TabsList>
            <TabsContent value="open">
              <div className="py-4 lg:grid lg:grid-cols-2 lg:gap-4 mx-6">
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
              <div className="py-4 lg:grid lg:grid-cols-2 lg:gap-4 mx-6">
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
        </>
      )}
    </>
  );
}
