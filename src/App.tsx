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
          {/* <div className="ml-auto" onClick={toggleTheme}>
            <ModeToggle />
          </div> */}
        </header>
        <main className="flex flex-1 flex-col gap-4 md:gap-8  z-0">
          <ActivePage />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
