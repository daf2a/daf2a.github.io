import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Landing from "./pages/Landing";

import { motion } from "framer-motion";

import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="fixed z-50 right-8 top-8">
        <ModeToggle />
      </div>
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
        <Landing />
      </motion.div>

      {/* footer */}
      <div
        className="fixed bottom-10 flex w-full flex-col items-center gap-3 text-sm
			text-muted-foreground sm:flex-row sm:justify-end sm:pr-10
			"
      >
        <p>© 2024 Muhammad Daffa Ashdaqfillah</p>
      </div>
      <Toaster />
      <BackgroundBeams className="-z-50" />
    </ThemeProvider>
  );
}

export default App;
