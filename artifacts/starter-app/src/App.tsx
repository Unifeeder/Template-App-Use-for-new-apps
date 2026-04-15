import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { Header } from "@/components/header";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Home() {
  const { theme } = useTheme();

  const centerLogoSrc = theme === "dark"
    ? `${import.meta.env.BASE_URL}assets/logos/DP_World_Logo_Colour_BlackBG_Vertical_CMYK-01.png`
    : `${import.meta.env.BASE_URL}assets/logos/DP_World_Logo_Colour_WhiteBG_Vertical_CMYK-01.png`;

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <img
            src={centerLogoSrc}
            alt="DP World"
            className="h-16 mx-auto mb-6"
          />

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4"
            style={{ fontFamily: 'Pilat Demi', color: 'hsl(250, 60%, 20%)' }}
          >
            Ready to build your ideas
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Start with a real problem. Think first, build fast.
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <span
                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium"
                style={{
                  color: '#1E1450',
                  backgroundColor: 'rgba(30, 20, 80, 0.08)',
                  border: '1px solid rgba(30, 20, 80, 0.15)',
                }}
              >
                Prototype
              </span>

              <div className="hidden sm:block w-8 h-px bg-border" />

              <span
                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium"
                style={{
                  color: '#FF2261',
                  backgroundColor: 'rgba(255, 34, 97, 0.08)',
                  border: '1px solid rgba(255, 34, 97, 0.15)',
                }}
              >
                Validate
              </span>

              <div className="hidden sm:block w-8 h-px bg-border" />

              <span
                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium"
                style={{
                  color: '#00E68C',
                  backgroundColor: 'rgba(0, 230, 140, 0.08)',
                  border: '1px solid rgba(0, 230, 140, 0.15)',
                }}
              >
                Iterate
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-xs text-muted-foreground border-t border-border/50">
        DP World Marine Services &middot; Shipping Solutions
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Header />
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
