import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Landing() {
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
    <div className="flex flex-col justify-center h-screen">
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
  );
}
