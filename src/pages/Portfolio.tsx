import { PinContainer } from "@/components/ui/3d-pin";

const pins = [
  {
    title: "/ui.aceternity.com",
    href: "https://daf2a.me",
    description: "Customizable Tailwind CSS and Framer Motion Components.",
  },
  {
    title: "/ui.aceternity.com",
    href: "https://daf2a.me",
    description: "Customizable Tailwind CSS and Framer Motion Components.",
  },
  {
    title: "/ui.aceternity.com",
    href: "https://daf2a.me",
    description: "Customizable Tailwind CSS and Framer Motion Components.",
  },
  {
    title: "/ui.aceternity.com",
    href: "https://daf2a.me",
    description: "Customizable Tailwind CSS and Framer Motion Components.",
  },
  {
    title: "/ui.aceternity.com",
    href: "https://daf2a.me",
    description: "Customizable Tailwind CSS and Framer Motion Components.",
  },
  {
    title: "/ui.aceternity.com",
    href: "https://daf2a.me",
    description: "Customizable Tailwind CSS and Framer Motion Components.",
  },
  {
    title: "/ui.aceternity.com",
    href: "https://daf2a.me",
    description: "Customizable Tailwind CSS and Framer Motion Components.",
  },
  {
    title: "/ui.aceternity.com",
    href: "https://daf2a.me",
    description: "Customizable Tailwind CSS and Framer Motion Components.",
  },
  {
    title: "/ui.aceternity.com",
    href: "https://daf2a.me",
    description: "Customizable Tailwind CSS and Framer Motion Components.",
  },
  {
    title: "/ui.aceternity.com",
    href: "https://daf2a.me",
    description: "Customizable Tailwind CSS and Framer Motion Components.",
  },
];

export default function Portfolio() {
  return (
    <>
      <div className="fixed top-0 -z-50 h-screen w-full">
        <div className="h-screen w-full dark:bg-transparent bg-white dark:bg-dot-white/[0.15] bg-dot-black/[0.15] items-center justify-center"></div>
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-zinc-950 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      </div>
      <div className="h-[40rem] w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-4 mt-14 p-4 md:p-8 ">
        {pins.map((pin, index) => (
          <a href={pin.href} target="_blank" rel="noopener noreferrer">
            <PinContainer key={index} title={pin.title}>
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[16rem] ">
                <div className="flex flex-1 w-full rounded-lg  bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                <h3 className="max-w-xs !pb-2 mt-4 font-bold text-base text-slate-100">
                  {pin.title}
                </h3>
                <div className="text-base !m-0 !p-0 font-normal">
                  <span className="text-slate-500 ">{pin.description}</span>
                </div>
              </div>
            </PinContainer>
          </a>
        ))}
      </div>
    </>
  );
}
