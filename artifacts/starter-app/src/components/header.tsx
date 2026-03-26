import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoSrc = theme === "dark"
    ? `${import.meta.env.BASE_URL}assets/logos/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png`
    : `${import.meta.env.BASE_URL}assets/logos/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-3 sm:px-4">
        <div className="flex items-center gap-2">
          <img
            src={logoSrc}
            alt="DP World"
            className="h-8 sm:h-9 lg:h-12"
          />
          <div className="h-6 w-px bg-border/50" />
          <div>
            <h1 className="text-sm font-normal leading-tight" style={{ fontFamily: 'Pilat Demi' }}>
              Shipping Solutions
            </h1>
            <p className="text-xs text-muted-foreground font-sans">
              Marine Services
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
