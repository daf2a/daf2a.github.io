import axios from "axios";
import { useState, useEffect } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { TracingBeam } from "@/components/ui/tracing-beam";

const loadingStates = [
  {
    text: "Better viewed on desktop mode",
  },
  {
    text: "Fetching data from Notion",
  },
  {
    text: "Building the background",
  },
  {
    text: "Adding finishing touches",
  },
];

interface BackgroundItem {
  name: string;
  description: string;
  title: string;
  img: string;
}

export default function Background() {
  const [content, setContent] = useState<BackgroundItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://be-daf2a.vercel.app/api/notion-background"
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

        setContent(transformedContent);
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
          duration={1000}
        />
      )}
      <div className="fixed top-0 -z-50 w-full">
        <div className="h-screen w-full dark:bg-transparent bg-white dark:bg-grid-small-white/[0.15] bg-grid-small-black/[0.15] items-center justify-center"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      </div>

      <div className="md:pt-10 mt-8 mx-6">
        <TracingBeam>
          <div className="max-w-xl md:max-w-3xl mx-auto antialiased pt-4 relative md:px-8 text-left">
            {content.map((item, index) => (
              <div key={`content-${index}`} className="mb-10">
                <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                  {item.title}
                </h2>

                <p className="text-xl mb-4 text-left">{item.name}</p>
                <div className="text-sm prose prose-sm dark:prose-invert text-slate-300">
                  {item?.img && (
                    <img
                      src={item.img}
                      alt="blog thumbnail"
                      style={{
                        width: "400px",
                        height: "200px",
                      }}
                      className="rounded-lg object-cover border-gray-200/50 dark:border-gray-800/50 border-4"
                    />
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
