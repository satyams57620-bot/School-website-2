import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { SiteGate } from "@/components/SiteGate";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Messages from "@/pages/Messages";
import Gallery from "@/pages/Gallery";
import Academics from "@/pages/Academics";
import Faculty from "@/pages/Faculty";
import Facilities from "@/pages/Facilities";
import News from "@/pages/News";
import Contact from "@/pages/Contact";
import Results from "@/pages/Results";

import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminNews from "@/pages/admin/AdminNews";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminMessages from "@/pages/admin/AdminMessages";
import AdminTeachers from "@/pages/admin/AdminTeachers";
import AdminFacilities from "@/pages/admin/AdminFacilities";
import AdminToppers from "@/pages/admin/AdminToppers";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/messages" component={Messages} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/academics" component={Academics} />
      <Route path="/faculty" component={Faculty} />
      <Route path="/facilities" component={Facilities} />
      <Route path="/news" component={News} />
      <Route path="/contact" component={Contact} />
      <Route path="/results" component={Results} />

      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/news" component={AdminNews} />
      <Route path="/admin/gallery" component={AdminGallery} />
      <Route path="/admin/messages" component={AdminMessages} />
      <Route path="/admin/teachers" component={AdminTeachers} />
      <Route path="/admin/facilities" component={AdminFacilities} />
      <Route path="/admin/toppers" component={AdminToppers} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SiteGate>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </SiteGate>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
