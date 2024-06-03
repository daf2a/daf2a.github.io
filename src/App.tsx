// src/App.tsx
import { useState, useEffect } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import LogoDark from "./assets/d_logo_dark.svg";
import LogoLight from "./assets/d_logo_light.svg";
import { Menu } from "lucide-react";
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

  useEffect(() => {
    setIsDialogVisible(false);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const location = useLocation();

  const routeNames: { [key: string]: string } = {
    "/": "Dashboard",
    "/background": "Background",
    "/certification": "Certification",
    "/portfolio": "Portfolio",
    "/blog": "Blog",
    "/gallery": "Gallery",
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {isDialogVisible && isSmallScreen && (
        <div className="md:hidden">
          <Dialog open={isDialogVisible} onOpenChange={setIsDialogVisible}>
            <DialogContent className="sm:max-w-md">
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
              className={({ isActive }) =>
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/background"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              Background
            </NavLink>
            <NavLink
              to="/certification"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              Certification
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground transition-colors hover:text-foreground"
              }
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
                      location.pathname === "/"
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    Dashboard
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/background"
                    className={
                      location.pathname.split("/")[1] === "background"
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    Background
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/certification"
                    className={
                      location.pathname.split("/")[1] === "certification"
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    Certification
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/portfolio"
                    className={
                      location.pathname.split("/")[1] === "portfolio"
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    Portfolio
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/blog"
                    className={
                      location.pathname.split("/")[1] === "blog"
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    Blog
                  </NavLink>
                </SheetClose>
                <SheetClose asChild>
                  <NavLink
                    to="/gallery"
                    className={
                      location.pathname.split("/")[1] === "gallery"
                        ? "text-foreground"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
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
            {routeNames["/" + location.pathname.split("/")[1]] ||
              "Unknown Page"}
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
        <main className="flex flex-1 flex-col gap-4 md:gap-8 z-0">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
