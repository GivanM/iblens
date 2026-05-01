import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import EssayAnalyzer from "./pages/EssayAnalyzer";
import UniversityStrategy from "./pages/UniversityStrategy";
import Dashboard from "./pages/Dashboard";
import Pricing from "./pages/Pricing";
import RefundPolicy from "./pages/RefundPolicy";
import SignIn from "./pages/SignIn";
import ResourcesIndex from "./pages/resources/ResourcesIndex";
import ExtendedEssayGuide from "./pages/resources/ExtendedEssayGuide";
import InternalAssessmentGuide from "./pages/resources/InternalAssessmentGuide";
import TokEssayGuide from "./pages/resources/TokEssayGuide";
import GradeBoundaries from "./pages/resources/GradeBoundaries";
import EssayCriteriaExplained from "./pages/resources/EssayCriteriaExplained";
import HowIBLensWorks from "./pages/resources/HowIBLensWorks";
import UniversityAdmissionsGuide from "./pages/resources/UniversityAdmissionsGuide";
import Layout from "./components/Layout";
import { CookieConsent } from "./components/CookieConsent";
import { usePageTracking } from "./hooks/usePageTracking";
import { useAuthTracking } from "./hooks/useAuthTracking";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/essay" component={EssayAnalyzer} />
      <Route path="/university" component={UniversityStrategy} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/resources" component={ResourcesIndex} />
      <Route path="/resources/ib-extended-essay-guide" component={ExtendedEssayGuide} />
      <Route path="/resources/ib-internal-assessment-guide" component={InternalAssessmentGuide} />
      <Route path="/resources/tok-essay-guide" component={TokEssayGuide} />
      <Route path="/resources/ib-grade-boundaries" component={GradeBoundaries} />
      <Route path="/resources/ib-essay-criteria-explained" component={EssayCriteriaExplained} />
      <Route path="/resources/how-iblens-works" component={HowIBLensWorks} />
      <Route path="/resources/ib-university-admissions" component={UniversityAdmissionsGuide} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  usePageTracking();
  useAuthTracking();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Layout>
            <Router />
          </Layout>
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
