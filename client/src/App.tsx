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
import IBExtendedEssayExamples from "./pages/resources/IBExtendedEssayExamples";
import IBIAScorePredictor from "./pages/resources/IBIAScorePredictor";
import IBScoreCalculator from "./pages/resources/IBScoreCalculator";
import IBUniversityStrategy2 from "./pages/resources/IBUniversityStrategy2";
import IBMathIAExamples from "./pages/resources/IBMathIAExamples";
import IBBiologyIAExamples from "./pages/resources/IBBiologyIAExamples";
import IBEconomicsIA from "./pages/resources/IBEconomicsIA";
import IBExtendedEssayWordCount from "./pages/resources/IBExtendedEssayWordCount";
import WriteMyIBExtendedEssay from "./pages/resources/WriteMyIBExtendedEssay";
import IBChemistryIAExamples from "./pages/resources/IBChemistryIAExamples";
import IBPhysicsIAExamples from "./pages/resources/IBPhysicsIAExamples";
import IBPsychologyIA from "./pages/resources/IBPsychologyIA";
import IBHistoryIA from "./pages/resources/IBHistoryIA";
import IBEEExamplesBySubject from "./pages/resources/IBEEExamplesBySubject";
import IBIAGrader from "./pages/resources/IBIAGrader";
import TokEssayFormat from "./pages/resources/TokEssayFormat";
import EENewCriteria2027 from "./pages/resources/EENewCriteria2027";
import TokEssayChecklist from "./pages/resources/TokEssayChecklist";
import About from "./pages/About";
import RPF2027 from "./pages/resources/RPF2027";
import PsychologyIA2027 from "./pages/resources/PsychologyIA2027";
import ComputerScienceIA2027 from "./pages/resources/ComputerScienceIA2027";
import ExtendedEssayFeedback from "./pages/resources/ExtendedEssayFeedback";
import CourseworkReviewTools from "./pages/resources/CourseworkReviewTools";
import TokExhibitionChecklist from "./pages/resources/TokExhibitionChecklist";
import IAFeedbackGuide from "./pages/resources/IAFeedbackGuide";
import TokEssayStructure from "./pages/resources/TokEssayStructure";
import RemarkChecker from "./pages/RemarkChecker";
import AcademicIntegrity from "./pages/resources/AcademicIntegrity";
import SampleReports from "./pages/resources/SampleReports";
import IBUniversityConsultantCost from "./pages/resources/IBUniversityConsultantCost";
import IBUniversityChances from "./pages/resources/IBUniversityChances";
import IBBiologyExtendedEssay from "./pages/resources/IBBiologyExtendedEssay";
import IBChemistryExtendedEssay from "./pages/resources/IBChemistryExtendedEssay";
import IBHistoryExtendedEssay from "./pages/resources/IBHistoryExtendedEssay";
import IBEnglishExtendedEssay from "./pages/resources/IBEnglishExtendedEssay";
import IBEconomicsExtendedEssay from "./pages/resources/IBEconomicsExtendedEssay";
import IBPsychologyExtendedEssay from "./pages/resources/IBPsychologyExtendedEssay";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Layout from "./components/Layout";
import { CookieConsent } from "./components/CookieConsent";
import BiologyIA from "./pages/essay/BiologyIA";
import ChemistryIA from "./pages/essay/ChemistryIA";
import PhysicsIA from "./pages/essay/PhysicsIA";
import MathematicsIA from "./pages/essay/MathematicsIA";
import EconomicsIA from "./pages/essay/EconomicsIA";
import HistoryIA from "./pages/essay/HistoryIA";
import PsychologyIA from "./pages/essay/PsychologyIA";
import EnglishEssay from "./pages/essay/EnglishEssay";
import ExtendedEssay from "./pages/essay/ExtendedEssay";
import TokEssay from "./pages/essay/TokEssay";
import BusinessManagementIA from "./pages/essay/BusinessManagementIA";
import ComputerScienceIA from "./pages/essay/ComputerScienceIA";
import TokExhibition from "./pages/essay/TokExhibition";
import MathsAAIA from "./pages/essay/MathsAAIA";
import MathsAIIA from "./pages/essay/MathsAIIA";
import LandingPage from "./pages/LandingPage";
import { usePageTracking } from "./hooks/usePageTracking";
import { useAuthTracking } from "./hooks/useAuthTracking";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/essay" component={EssayAnalyzer} />
      <Route path="/essay/biology-ia" component={BiologyIA} />
      <Route path="/essay/chemistry-ia" component={ChemistryIA} />
      <Route path="/essay/physics-ia" component={PhysicsIA} />
      <Route path="/essay/math-ia" component={MathematicsIA} />
      <Route path="/essay/economics-ia" component={EconomicsIA} />
      <Route path="/essay/history-ia" component={HistoryIA} />
      <Route path="/essay/psychology-ia" component={PsychologyIA} />
      <Route path="/essay/english-essay" component={EnglishEssay} />
      <Route path="/essay/extended-essay" component={ExtendedEssay} />
      <Route path="/essay/tok-essay" component={TokEssay} />
      <Route path="/essay/business-management-ia" component={BusinessManagementIA} />
      <Route path="/essay/computer-science-ia" component={ComputerScienceIA} />
      <Route path="/essay/tok-exhibition" component={TokExhibition} />
      <Route path="/essay/maths-aa-ia" component={MathsAAIA} />
      <Route path="/essay/maths-ai-ia" component={MathsAIIA} />
      <Route path="/university" component={UniversityStrategy} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/resources" component={ResourcesIndex} />
      <Route path="/resources/ib-extended-essay-guide" component={ExtendedEssayGuide} />
      <Route path="/resources/ib-internal-assessment-guide" component={InternalAssessmentGuide} />
      <Route path="/resources/tok-essay-guide" component={TokEssayGuide} />
      <Route path="/resources/ib-grade-boundaries" component={GradeBoundaries} />
      <Route path="/resources/ib-essay-criteria-explained" component={EssayCriteriaExplained} />
      <Route path="/resources/how-iblens-works" component={HowIBLensWorks} />
      <Route path="/resources/ib-university-admissions" component={UniversityAdmissionsGuide} />
      <Route path="/resources/ib-extended-essay-examples" component={IBExtendedEssayExamples} />
      <Route path="/resources/ib-ia-score-predictor" component={IBIAScorePredictor} />
      <Route path="/resources/ib-score-calculator" component={IBScoreCalculator} />
      <Route path="/resources/ib-university-admissions-strategy" component={IBUniversityStrategy2} />
      <Route path="/resources/ib-math-ia-examples" component={IBMathIAExamples} />
      <Route path="/resources/ib-biology-ia-examples" component={IBBiologyIAExamples} />
      <Route path="/resources/ib-economics-ia" component={IBEconomicsIA} />
      <Route path="/resources/ib-extended-essay-word-count" component={IBExtendedEssayWordCount} />
      <Route path="/resources/ib-extended-essay-help" component={WriteMyIBExtendedEssay} />
      <Route path="/resources/ib-chemistry-ia-examples" component={IBChemistryIAExamples} />
      <Route path="/resources/ib-physics-ia-examples" component={IBPhysicsIAExamples} />
      <Route path="/resources/ib-psychology-ia" component={IBPsychologyIA} />
      <Route path="/resources/ib-history-ia" component={IBHistoryIA} />
      <Route path="/resources/ib-ee-examples-by-subject" component={IBEEExamplesBySubject} />
      <Route path="/resources/ib-ia-grader" component={IBIAGrader} />
      <Route path="/resources/tok-essay-format" component={TokEssayFormat} />
      <Route path="/resources/ib-extended-essay-new-criteria-2027" component={EENewCriteria2027} />
      <Route path="/resources/tok-essay-checklist" component={TokEssayChecklist} />
      <Route path="/about" component={About} />
      <Route path="/resources/ib-rpf-extended-essay-2027" component={RPF2027} />
      <Route path="/resources/ib-psychology-ia-2027" component={PsychologyIA2027} />
      <Route path="/resources/ib-computer-science-ia-2027" component={ComputerScienceIA2027} />
      <Route path="/resources/ib-extended-essay-feedback" component={ExtendedEssayFeedback} />
      <Route path="/resources/ib-coursework-review-tools" component={CourseworkReviewTools} />
      <Route path="/resources/tok-exhibition-checklist" component={TokExhibitionChecklist} />
      <Route path="/resources/ib-ia-feedback" component={IAFeedbackGuide} />
      <Route path="/resources/tok-essay-structure" component={TokEssayStructure} />
      <Route path="/remark" component={RemarkChecker} />
      <Route path="/resources/academic-integrity" component={AcademicIntegrity} />
      <Route path="/resources/sample-reports" component={SampleReports} />
      <Route path="/resources/ib-university-consultant-cost" component={IBUniversityConsultantCost} />
      <Route path="/resources/ib-university-chances" component={IBUniversityChances} />
      <Route path="/resources/ib-biology-extended-essay" component={IBBiologyExtendedEssay} />
      <Route path="/resources/ib-chemistry-extended-essay" component={IBChemistryExtendedEssay} />
      <Route path="/resources/ib-history-extended-essay" component={IBHistoryExtendedEssay} />
      <Route path="/resources/ib-english-extended-essay" component={IBEnglishExtendedEssay} />
      <Route path="/resources/ib-economics-extended-essay" component={IBEconomicsExtendedEssay} />
      <Route path="/resources/ib-psychology-extended-essay" component={IBPsychologyExtendedEssay} />
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
          <Switch>
            <Route path="/grade" component={LandingPage} />
            <Route>
              <Layout>
                <Router />
              </Layout>
            </Route>
          </Switch>
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
