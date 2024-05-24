import axios from "axios";
import { useState, useEffect } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const loadingStates = [
  {
    text: "Fetching data from Notion",
  },
  {
    text: "Building the gallery",
  },
  {
    text: "Adding finishing touches",
  },
];

interface GalleryItem {
  name: string;
  description: string;
  date: string;
  img: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://be-daf2a.vercel.app/api/notion-gallery"
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

        setItems(transformedItems);
      } catch (error) {
        console.error("Error fetching Notion data:", error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && (
        <Loader
          loadingStates={loadingStates}
          loading={isLoading}
          duration={1500}
        />
      )}
      <div className="fixed top-0 -z-50 h-screen w-full">
        <div className="h-screen w-full dark:bg-transparent bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.05] items-center justify-center"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      </div>
      <BentoGrid className="max-w-full mx-auto text-left py-4 px-8 md:py-14 md:px-32">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.name}
            description={item.date}
            imageUrl={item.img}
            className={
              (i + 2) % 7 === 3 || (i + 2) % 7 === 4 ? "md:col-span-2" : ""
            }
          />
        ))}
      </BentoGrid>
    </>
  );
}
