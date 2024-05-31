import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { PinContainer } from "@/components/ui/3d-pin";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LuConstruction } from "react-icons/lu";

interface Pin {
  name: string;
  description: string;
  title: string;
  href: string;
  img: string;
}

const loadingStates = [
  {
    text: "Fetching data from Notion",
  },
  {
    text: "Building the portfolio",
  },
  {
    text: "Adding finishing touches",
  },
];

export default function Portfolio() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [showMoreStates, setShowMoreStates] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleShowMore = (index: number) => {
    setShowMoreStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const handleDrawerOpenChange = (index: number, isOpen: boolean) => {
    if (!isOpen) {
      setShowMoreStates((prevStates) => ({
        ...prevStates,
        [index]: false,
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://be-daf2a.vercel.app/api/notion-portfolio"
        );

        if (response.status !== 200) {
          throw new Error("Notion API request failed");
        }

        const data = response.data;
        const transformedPins = data.map((item: any) => ({
          name: item.name,
          title: item.title,
          description: item.description,
          href: item.href,
          img: item.img,
        }));

        setPins(transformedPins);
      } catch (error) {
        console.error("Error fetching Notion data:", error);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 1500));
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
      <div className="fixed top-0 -z-50 h-screen w-full">
        <div className="h-screen w-full dark:bg-transparent bg-white dark:bg-dot-white/[0.15] bg-dot-black/[0.15] items-center justify-center"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      </div>
      <Tabs defaultValue="open" className="w-full md:mt-6">
        <TabsList className="rounded-none w-full md:w-10/12">
          <TabsTrigger value="open" className="w-1/2 mx-4">
            Open Project
          </TabsTrigger>
          <TabsTrigger value="close" className="w-1/2 mx-4">
            Close Project
          </TabsTrigger>
        </TabsList>
        <TabsContent value="open">
          <div className="h-[0rem] w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-4 mt-4 p-8 md:scale-100 scale-90">
            {pins.map((pin, index) => (
              <Drawer
                key={index}
                onOpenChange={(isOpen) => handleDrawerOpenChange(index, isOpen)}
              >
                <DrawerTrigger asChild>
                  <div onClick={() => {}}>
                    <PinContainer title="Click for Details">
                      <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[16rem]">
                        <div
                          className="flex flex-1 w-full rounded-lg bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500"
                          style={{
                            backgroundImage: `url(${pin.img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <h3 className="max-w-xs !pb-2 mt-4 font-bold text-base text-slate-100">
                          {pin.name}
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                          <span className="text-slate-500 ">{pin.title}</span>
                        </div>
                      </div>
                    </PinContainer>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="container py-8 md:py-16 lg:pb-24">
                    {/* Grid */}
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                      <div>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                          {pin.name}
                        </h1>
                        <p
                          className={`mt-3 text-xl text-muted-foreground overflow-hidden ${!showMoreStates[index] ? "overflow-ellipsis line-clamp-3" : ""}`}
                          ref={descriptionRef}
                        >
                          {pin.description}
                        </p>

                        {/* Conditional link based on the showMore state for this specific pin */}
                        {!showMoreStates[index] &&
                          pin.description.length > 200 && (
                            <a
                              href="#"
                              className="text-blue-500"
                              onClick={() => toggleShowMore(index)}
                            >
                              Read more
                            </a>
                          )}
                        {/* link pin herf */}
                        <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                          <a
                            href={pin.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                          >
                            Link to Project
                          </a>
                        </div>
                      </div>
                      {/* Col image 800x 600" */}
                      <div className="relative">
                        <AspectRatio ratio={5 / 3}>
                          <img
                            className="object-cover w-full h-full rounded-lg border-4 md:border- border-gray-200/50 dark:border-gray-800/50"
                            src={pin.img}
                            alt="Image Description"
                          />
                        </AspectRatio>
                      </div>
                      {/* End Col */}
                    </div>
                    {/* End Grid */}
                  </div>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </TabsContent>
        <TabsContent
          value="close"
          className="justify-center h-[35rem] items-center flex"
        >
          <div className="py-3 flex gap-4 items-center justify-center text-zinc-400 mx-6">
            <LuConstruction className="text-zinc-400 flex-shrink-0 w-16 h-16 text-primary-foreground" />
            <p className="text-left font-semibold">
              This page is currently under construction. Please check back
              later.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
