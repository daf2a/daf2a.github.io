import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Dashboard() {
  const words = [
    {
      text: "Muhammad",
      className: "text-slate-700 dark:text-slate-300",
    },
    {
      text: "Daffa",
      className: "text-cyan-600 dark:text-cyan-400",
    },
    {
      text: "Ashdaqfillah",
      className: "text-slate-700 dark:text-slate-300",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center gap-4 px-4"
      >
        <div className="flex flex-col justify-center h-[40rem]">
          {" "}
          <p className="flex text-neutral-600 dark:text-neutral-200 text-base mb-8">
            sek, masih kosongan..
          </p>
          <TypewriterEffect words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10 mb-20">
            <a
              href="https://www.linkedin.com/in/daf2a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              >
                <FaLinkedin />
                <span>Linkedin</span>
              </HoverBorderGradient>
            </a>
            <a
              href="https://www.github.com/daf2a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              >
                <FaGithub />
                <span>Github</span>
              </HoverBorderGradient>
            </a>
          </div>
        </div>
      </motion.div>
      <div
        className="fixed bottom-10 flex w-full flex-col items-center gap-3 text-sm
        text-muted-foreground sm:flex-row sm:justify-end sm:pr-14 md:pr-18
        "
      >
        <p>© 2024 Muhammad Daffa Ashdaqfillah</p>
      </div>
      <BackgroundBeams className="-z-50" />
    </>
  );
}
