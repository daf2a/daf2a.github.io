import Dashboard from "./pages/Dashboard.tsx";
import Background from "./pages/Background.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Gallery from "./pages/Gallery.tsx";

import LogoDark from "./assets/d_logo_dark.svg";
import LogoLight from "./assets/d_logo_light.svg";

import { Menu } from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HiSparkles } from "react-icons/hi2";
import { FaReact } from "react-icons/fa";
import { RiNextjsLine } from "react-icons/ri";
import { SiNotion, SiShadcnui } from "react-icons/si";
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState(1);

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
        return <Portfolio />;
      case 4:
        return <Gallery />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-40">
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
              Portfolio
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
                  Portfolio
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
                  Gallery
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="hidden ml-auto" onClick={toggleTheme}>
            <ModeToggle />
          </div>
          <div className="ml-auto">
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
                    <div className="container py-4 lg:py-16 scale-50 md:scale-100 items-center justify-center">
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
