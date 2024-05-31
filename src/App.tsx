import Dashboard from "./pages/Dashboard.tsx";
import Background from "./pages/Background.tsx";
import Certification from "./pages/Certification.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Blog from "./pages/Blog.tsx";
import Gallery from "./pages/Gallery.tsx";

import LogoDark from "./assets/d_logo_dark.svg";
import LogoLight from "./assets/d_logo_light.svg";

import { Menu } from "lucide-react";

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HiSparkles } from "react-icons/hi2";
import { FaReact } from "react-icons/fa";
import { RiNextjsLine } from "react-icons/ri";
import { SiNotion, SiShadcnui, SiHey } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import AceternityLogo from "@/assets/logo.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import "./App.css";

function App() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setIsDialogVisible(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const ActivePage = () => {
    switch (activePage) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Background />;
      case 3:
        return <Certification />;
      case 4:
        return <Portfolio />;
      case 5:
        return <Blog />;
      case 6:
        return <Gallery />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {isDialogVisible && isSmallScreen && (
        <div className="md:hidden">
          <Dialog open={isDialogVisible} onOpenChange={setIsDialogVisible}>
            <DialogContent className="sm:max-w-md">
              {" "}
              <DialogHeader>
                <DialogDescription>
                  <div className="py-3 flex gap-4 items-center justify-center text-zinc-400">
                    <SiHey className="text-zinc-400 flex-shrink-0 w-16 h-16 text-primary-foreground" />
                    <p className="text-left font-semibold">
                      Hi there. This website looks even better on a desktop,
                      Give it a try! 😉
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
              onClick={() => setActivePage(1)}
            >
              <img
                src={isDarkMode ? LogoDark : LogoLight}
                alt="Logo"
                className="h-6 w-6"
              />
              <span className="sr-only">Daf2a</span>
            </NavLink>
            <NavLink
              to="/"
              className={
                activePage === 1
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
              onClick={() => setActivePage(1)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/"
              className={
                activePage === 2
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
              onClick={() => setActivePage(2)}
            >
              Background
            </NavLink>
            <NavLink
              to="/"
              className={
                activePage === 3
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
              onClick={() => setActivePage(3)}
            >
              Certification
            </NavLink>
            <NavLink
              to="/"
              className={
                activePage === 4
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
              onClick={() => setActivePage(4)}
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/"
              className={
                activePage === 5
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
              onClick={() => setActivePage(5)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/"
              className={
                activePage === 6
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
              onClick={() => setActivePage(6)}
            >
              Gallery
            </NavLink>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <SheetClose asChild>
                  <NavLink
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                    onClick={() => setActivePage(1)}
                  >
                    <img
                      src={isDarkMode ? LogoDark : LogoLight}
                      alt="Logo"
                      className="h-6 w-6"
                    />
                    <span className="sr-only">Daf2a</span>
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/"
                    className={
                      activePage === 1
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                    onClick={() => setActivePage(1)}
                  >
                    Dashboard
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/"
                    className={
                      activePage === 2
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                    onClick={() => setActivePage(2)}
                  >
                    Background
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/"
                    className={
                      activePage === 3
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                    onClick={() => setActivePage(3)}
                  >
                    Certification
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/"
                    className={
                      activePage === 4
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                    onClick={() => setActivePage(4)}
                  >
                    Portfolio
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/"
                    className={
                      activePage === 5
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                    onClick={() => setActivePage(5)}
                  >
                    Blog
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/"
                    className={
                      activePage === 6
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                    onClick={() => setActivePage(6)}
                  >
                    Gallery
                  </NavLink>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="hidden ml-auto" onClick={toggleTheme}>
            <ModeToggle />
          </div>
          <div className="block md:hidden ml-auto mr-2 font-semibold text-lg text-zinc-300">
            {activePage === 1
              ? "Dashboard"
              : activePage === 2
                ? "Background"
                : activePage === 3
                  ? "Certification"
                  : activePage === 4
                    ? "Portfolio"
                    : activePage === 5
                      ? "Blog"
                      : activePage === 6
                        ? "Gallery"
                        : "Unknown Page"}
          </div>
          <div className="hidden md:block ml-auto">
            <Dialog>
              <DialogTrigger asChild>
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white py-1.5 text-black dark:text-white flex items-center text-sm space-x-2"
                >
                  <HiSparkles />
                  <span>Build w/</span>
                </HoverBorderGradient>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    This Website Build Using this Framework
                  </DialogTitle>
                  <DialogDescription>
                    <div className="container py- lg:py-16 scale-50 md:scale-100 items-center justify-center">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-12">
                        {/* Icon Block */}
                        <div className="text-center">
                          <div className="flex justify-center items-center w-24 h-24 bg-primary border rounded-full mx-auto">
                            <FaReact className="flex-shrink-0 w-16 h-16 text-primary-foreground" />
                          </div>
                          <div className="mt-3">
                            <h3 className="text-lg font-semibold ">React.js</h3>
                            <p className="mt-1 text-muted-foreground">
                              Front-end library for building user interfaces and
                              components
                            </p>
                          </div>
                        </div>
                        {/* End Icon Block */}
                        {/* Icon Block */}
                        <div className="text-center">
                          <div className="flex justify-center items-center w-24 h-24 bg-primary border rounded-full mx-auto">
                            <RiNextjsLine className="flex-shrink-0 w-20 h-20 text-primary-foreground" />
                          </div>
                          <div className="mt-3">
                            <h3 className="text-lg font-semibold ">Next.js</h3>
                            <p className="mt-1 text-muted-foreground">
                              For fetch data from Notion Database API and
                              routing
                            </p>
                          </div>
                        </div>
                        {/* End Icon Block */}
                        {/* Icon Block */}
                        <div className="text-center">
                          <div className="flex justify-center items-center w-24 h-24 bg-primary border rounded-full mx-auto">
                            <BiLogoTypescript className="flex-shrink-0 w-16 h-16 text-primary-foreground" />
                          </div>
                          <div className="mt-3">
                            <h3 className="text-lg font-semibold ">
                              TypeScript
                            </h3>
                            <p className="mt-1 text-muted-foreground">
                              For type checking, module importing and exporting
                            </p>
                          </div>
                        </div>
                        {/* End Icon Block */}
                        {/* Icon Block */}
                        <div className="text-center">
                          <div className="flex justify-center items-center w-24 h-24 bg-primary border rounded-full mx-auto">
                            <SiNotion className="flex-shrink-0 w-14 h-14 text-primary-foreground" />
                          </div>
                          <div className="mt-3">
                            <h3 className="text-lg font-semibold ">Notion</h3>
                            <p className="mt-1 text-muted-foreground">
                              To store database and content dynamically, view
                              database{" "}
                              <a
                                href="https://daf2a.notion.site/Portofolio-API-0ac19e9a8a5d4edcb47863da52008ec3?pvs=4"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 font-bold underline"
                              >
                                here
                              </a>
                            </p>
                          </div>
                        </div>
                        {/* End Icon Block */}
                        {/* Icon Block */}
                        <div className="text-center item lg:col-start-2 lg:col-end-3">
                          <div className="flex justify-center items-center w-24 h-24 bg-primary border rounded-full mx-auto">
                            <SiShadcnui className="flex-shrink-0 w-14 h-14 text-primary-foreground" />
                          </div>
                          <div className="mt-3">
                            <h3 className="text-lg font-semibold ">
                              Shadcn UI
                            </h3>
                            <p className="mt-1 text-muted-foreground">
                              For component, theme, color and layout management
                            </p>
                          </div>
                        </div>
                        {/* End Icon Block */}
                        {/* Icon Block Aceternity Logo*/}
                        <div className="text-center">
                          <div className="flex justify-center items-center w-24 h-24 bg-primary border rounded-full mx-auto">
                            <img
                              src={AceternityLogo}
                              alt="Aceternity Logo"
                              className="h-14 w-14"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="text-lg font-semibold ">
                              Aceternity UI
                            </h3>
                            <p className="mt-1 text-muted-foreground">
                              For better user experience using motion and
                              animations
                            </p>
                          </div>
                        </div>
                        {/* End Icon Block */}
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 md:gap-8  z-0">
          <ActivePage />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
