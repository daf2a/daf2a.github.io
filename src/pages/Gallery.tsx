import axios from "axios";
import { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import LottieAnimationCat from "@/components/ui/LottieAnimationCat";

interface GalleryItem {
  name: string;
  description: string;
  date: string;
  img: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCaption, setShowCaption] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const toggleCaption = () => setShowCaption(!showCaption);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  });

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = sessionStorage.getItem("galleryData");
      
      if (cachedData) {
        setItems(JSON.parse(cachedData));
      } else {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://be-daf2a.vercel.app/api/notion-gallery`
          );

          if (response.status !== 200) {
            throw new Error("Notion API request failed");
          }

          const data = response.data;
          const transformedItems = data.map((item: any) => ({
            name: item.name,
            description: item.description,
            date: item.date,
            img: item.img,
          }));

          sessionStorage.setItem("galleryData", JSON.stringify(transformedItems));
          setItems(transformedItems);
        } catch (error) {
          console.error("Error fetching Notion data:", error);
        } finally {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  const fadeStyle = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 1s ease-in-out',
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
      <div className="fixed top-0 -z-50 h-screen w-full">
        <div className="h-screen w-full dark:bg-transparent bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05] items-center justify-center"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      </div>

      <div style={fadeStyle} className="fixed z-50 bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-zinc-950 border dark:border-white/[0.2] border-gray/[0.2] rounded-full px-3 py-2 flex items-center space-x-2 md:hidden">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Caption
        </span>
        <Switch
          checked={showCaption}
          onCheckedChange={toggleCaption}
          className="rounded-full"
        />
      </div>

      <div style={fadeStyle}>
        <BentoGrid className="max-w-full mx-auto text-left py-8 px-8 md:py-14 md:px-32">
              {items.map((item, i) => (
                <BentoGridItem
                  key={i}
                  title={item.name}
                  description={item.date}
                  imageUrl={item.img}
                  showCaption={showCaption}
                  className={
                    (i + 2) % 7 === 3 || (i + 2) % 7 === 4 ? "md:col-span-2" : ""
                  }
                />
              ))}
            </BentoGrid>
      </div>

    </>
  );
}
