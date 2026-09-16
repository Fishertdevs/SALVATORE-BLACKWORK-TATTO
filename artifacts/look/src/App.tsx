import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LookGallery from "@/pages/LookGallery";
import {
  AboutPage,
  BookingPage,
  ContactPage,
  PortfolioPage,
  ServicesPage,
  HomePage,
} from "@/pages/TattooPages";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={LookGallery} />
      <Route path="/inicio" component={HomePage} />
      <Route path="/acerca-de" component={AboutPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/servicios" component={ServicesPage} />
      <Route path="/reservas" component={BookingPage} />
      <Route path="/contacto" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
