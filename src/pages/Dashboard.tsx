import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
import { FaGithub, FaLinkedin, FaUser } from "react-icons/fa";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { motion } from "framer-motion";
import ProfilePhoto from "@/assets/photo.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const words = ["Innovative", "Driven", "Visionary", "Talented", "Skilled"];

  return (
    <div className="p-4 md:p-8 mt-4">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col justify-center gap-4 px-4 items-center"
      >
        <div className="flex flex-col justify-center md:h-[45rem] h-full">
          {" "}
          <div className="md:hidden">
            <div className="flex flex-col rounded-3xl items-center justify-center md:gap-16 gap-8 md:max-w-6xl dark:bg-zinc-950  px-4 py-6 md:flex-row md:px-8 md:py-12">
              <div className="flex-shrink-0">
                <BackgroundGradient className="rounded-full p-2 max-w-sm bg-white dark:bg-zinc-900">
                  <img
                    alt="User profile photo"
                    className="h-40 w-40 rounded-full object-cover md:h-48 md:w-48 lg:h-56 lg:w-56"
                    height={160}
                    src={ProfilePhoto}
                    style={{
                      aspectRatio: "160/160",
                      objectFit: "cover",
                    }}
                    width={160}
                  />
                </BackgroundGradient>
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl text-gray-200">
                    Muhammad Daffa Ashdaqfillah
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Software Engineer || Informatics Engineering Student at
                    Sepuluh Nopember Institute of Technology
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-medium md:text-xl lg:text-2xl mt-4">
                    About
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    Experienced and highly motivated individual with a passion
                    for advanced technology, particularly in the fields of
                    mobile development, web development, microcontroller
                    programming, and creative design. Skilled in analytical
                    thinking, disciplined work ethic, and persistent
                    problem-solving. Currently pursuing a degree in Informatics
                    Engineering at Sepuluh Nopember Institute of Technology
                    (ITS).
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden border-b border-gray-200 dark:border-gray-600 mt-8 mb-12"></div>

          <div className="text-4xl mx-auto font-normal text-neutral-700 dark:text-neutral-300 ">
            Aspiring to be a
            <FlipWords words={words} /> <br />
            software engineer
          </div>
          <div className="flex flex-col md:flex-row space-y-4 justify-center items-center md:space-y-0 space-x-0 md:space-x-4 mt-8 mb-20">
            <div className="hidden md:block">
              <Dialog>
                <DialogTrigger asChild>
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                  >
                    <FaUser />
                    <span>Profile</span>
                  </HoverBorderGradient>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Profile</DialogTitle>
                    <DialogDescription>
                      <div className="flex flex-col rounded-3xl items-center justify-center md:gap-16 gap-8 md:max-w-6xl dark:bg-zinc-950  px-4 py-6 md:flex-row md:px-8 md:py-12">
                        <div className="flex-shrink-0">
                          <BackgroundGradient className="rounded-full p-2 max-w-sm bg-white dark:bg-zinc-900">
                            <img
                              alt="User profile photo"
                              className="h-40 w-40 rounded-full object-cover md:h-48 md:w-48 lg:h-56 lg:w-56"
                              height={160}
                              src={ProfilePhoto}
                              style={{
                                aspectRatio: "160/160",
                                objectFit: "cover",
                              }}
                              width={160}
                            />
                          </BackgroundGradient>
                        </div>
                        <div className="flex-1 space-y-4 text-center md:text-left">
                          <div>
                            <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl text-gray-200">
                              Muhammad Daffa Ashdaqfillah
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                              Software Engineer || Informatics Engineering
                              Student at Sepuluh Nopember Institute of
                              Technology
                            </p>
                          </div>
                          <div>
                            <h2 className="text-lg font-medium md:text-xl lg:text-2xl">
                              About
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">
                              Experienced and highly motivated individual with a
                              passion for advanced technology, particularly in
                              the fields of mobile development, web development,
                              microcontroller programming, and creative design.
                              Skilled in analytical thinking, disciplined work
                              ethic, and persistent problem-solving. Currently
                              pursuing a degree in Informatics Engineering at
                              Sepuluh Nopember Institute of Technology (ITS).
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
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
        className="fixed hidden md:flex bottom-10 w-full flex-col items-center gap-3 text-sm
        text-muted-foreground sm:flex-row sm:justify-end sm:pr-14 md:pr-18
        "
      >
        <p>© 2024 Muhammad Daffa Ashdaqfillah </p>
      </div>
      <BackgroundBeams className="fixed -z-50" />
    </div>
  );
}
