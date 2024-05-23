import axios from "axios";
import { useState, useEffect } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { PinContainer } from "@/components/ui/3d-pin";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface Pin {
  name: string;
  description: string;
  title: string;
  href: string;
  img: string;
}

const loadingStates = [
  {
    text: "Better viewed on desktop mode",
  },
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
      }
    };

    fetchData()
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
      <div className="h-[40rem] w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-4 mt-14 md:p-8 md:scale-100 scale-90">
        {pins.map((pin, index) => (
          <Drawer key={index}>
            <DrawerTrigger asChild>
              <div onClick={() => {}}>
                <PinContainer title={pin.title}>
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
                      <span className="text-slate-500 ">{pin.description}</span>
                    </div>
                  </div>
                </PinContainer>
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <div className="container py-24 lg:py-32">
                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                  <div>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                      {pin.name}
                    </h1>
                    <p className="mt-3 text-xl text-muted-foreground">
                      {pin.description}
                    </p>
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
    </>
  );
}
