"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length + 2.8;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="h-[calc(100vh-64px)] overflow-y-auto flex w-3/4 justify-center relative space-x-10 rounded-lg p-10 pt-28 scrollbar-hide"
      ref={ref}
    >
      <div className="div relative flex items-start px-6 mt-8">
        <div className="max-w-2xl w-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.16,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.16,
                }}
                className="text-kg text-slate-300 max-w-lg mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-[460px]" />
        </div>
      </div>
      <motion.div
        className={cn(
          "hidden lg:block h-80 w-[450px] rounded-md bg-white sticky top-10 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </motion.div>
      <p></p>
    </motion.div>
  );
};
