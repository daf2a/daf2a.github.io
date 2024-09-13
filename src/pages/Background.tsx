import axios from "axios";
import { useState, useEffect } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import LottieAnimationCat from "@/components/ui/LottieAnimationCat";

interface BackgroundItem {
  name: string;
  description: string;
  title: string;
  img: string;
}

export default function Background() {
  const [content, setContent] = useState<BackgroundItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("backgroundData");

      if (cachedData) {
        setContent(JSON.parse(cachedData));
      } else {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://be-daf2a.vercel.app/api/notion-background`
          );

          if (response.status !== 200) {
            throw new Error("Notion API request failed");
          }

          const data = response.data;
          const transformedContent = data.map((item: any) => ({
            name: item.name,
            description: item.description,
            title: item.title,
            img: item.img,
          }));
          localStorage.setItem("backgroundData", JSON.stringify(transformedContent));

          setContent(transformedContent);
          setLoadedImages(new Array(transformedContent.length).fill(false));
        } catch (error) {
          console.error("Error fetching Notion data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prevLoadedImages) => {
      const newLoadedImages = [...prevLoadedImages];
      newLoadedImages[index] = true;
      return newLoadedImages;
    });
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
            <LottieAnimationCat />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed top-0 -z-50 w-full">
        <div className="h-screen w-full dark:bg-transparent bg-white dark:bg-grid-small-white/[0.15] bg-grid-small-black/[0.15] items-center justify-center"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      </div>

      <div className="md:pt-10 mt-4 mx-6">
        <TracingBeam>
          <div className="max-w-xl md:max-w-3xl -ml-2 md:ml-0 antialiased pt-4 relative md:px-8 text-left">
            {content.map((item, index) => (
              <div key={`content-${index}`} className="mb-10">
                <h2 className="text-zinc-950 font-bold rounded-full text-sm w-fit px-4 py-1 mb-4 bg-gradient-to-r from-green-600 to-green-400">
                  {item.title}
                </h2>

                <p className="text-xl mb-4 text-left font-semibold">
                  {item.name}
                </p>
                <div className="text-sm prose prose-sm dark:prose-invert text-slate-300">
                  {item?.img && (
                    <>
                      {!loadedImages[index] && (
                        <Skeleton className="w-full h-48 md:w-[400px] md:h-[200px] rounded-lg" />
                      )}
                      <img
                        src={item.img}
                        alt="blog thumbnail"
                        className={`rounded-lg object-cover border-gray-200/50 dark:border-gray-800/50 border-4 ${
                          loadedImages[index] ? "block" : "hidden"
                        } w-full h-48 md:w-[400px] md:h-[200px]`}
                        onLoad={() => handleImageLoad(index)}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                          handleImageLoad(index);
                        }}
                      />
                    </>
                  )}
                  <p className="mt-4 text-left">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </>
  );
}
