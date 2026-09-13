import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { SEOHead } from "@/components/SEOHead";
import { analytics } from "@/lib/analytics";
import "@/styles/marking-sheet.css";
import { Sheet } from "@/components/marking/Sheet";
import { DeskRail } from "@/components/marking/DeskRail";
import { TabRail } from "@/components/marking/TabRail";
import { CoverSheet } from "@/components/marking/CoverSheet";
import { MarkedScript } from "@/components/marking/MarkedScript";
import { RubricGrid } from "@/components/marking/RubricGrid";
import { ReceivedStamps } from "@/components/marking/ReceivedStamps";
import { ScopeSheet } from "@/components/marking/ScopeSheet";
import { RequestSlip } from "@/components/marking/RequestSlip";
import { Colophon } from "@/components/marking/Colophon";
import { usePaperTexture, useMarkingInk } from "@/components/marking/useMarkingSheet";

const FAQ = [
  {
    q: "How does IBLens analyse my IB essay?",
    a: "A large language model is given the official assessment criteria for your task and session, and marks your draft criterion by criterion. The report gives a mark range, the criterion losing the most marks, the risks in the text, and what to change.",
  },
  {
    q: "Which IB essay types does IBLens support?",
    a: "The Extended Essay, the TOK essay, the TOK exhibition, and coursework in 14 subjects: Business Management, Economics, History, Biology, Chemistry, Physics, Mathematics, English A Language and Literature, English A Literature, Psychology, Computer Science, Visual Arts, Music and Film. Each is marked against its own criteria. Visual Arts can be marked only for sessions through November 2026: from May 2027 the comparative study is no longer set.",
  },
  {
    q: "Is my first essay analysis really free?",
    a: "The first one returns a free preview: your mark range, your weakest criterion with its full feedback, and the top risks in the draft. That is one free preview per device or account, not one per essay. The complete report, with every criterion scored and a ranked fix list, unlocks for $9.99.",
  },
  {
    q: "How accurate is the predicted IB score?",
    a: "It is an estimate, not a mark. No tool can promise an exact score, and for the May 2027 Extended Essay the grade boundaries do not exist yet: the IB sets them after the session is marked. The value of the report is in which criterion it flags and why, not in the number.",
  },
  {
    q: "Do I have to tell my school that I used this?",
    a: "IBLens returns feedback and never text you could hand in, so there is nothing of ours to cite in your essay. Schools set their own rules on disclosing AI-assisted feedback, and some require it, so follow your coordinator's policy. Whatever you change, you have to be able to explain it in your own words at the viva voce.",
  },
  {
    q: "Where does my essay actually go?",
    a: "It travels over an encrypted connection through our own server in Finland, which exists because the model cannot be reached directly from where this service is run, and then to Anthropic PBC, which produces the analysis. It is not used to train models, not sold, and not shared with your school, universities or other students. The essay text itself is never written to our database. An anonymous report that nobody paid for is deleted after 90 days.",
  },
  {
    q: "What happens if I revise and want a second opinion?",
    a: "A paid report includes two re-checks of the same piece of work within 14 days of the report opening, at no extra cost. Revise, run it again, and see whether the criterion moved.",
  },
  {
    q: "What if I am not satisfied with my analysis?",
    a: "Email glushkovim@gmail.com within 7 days of your purchase for a full refund, no questions asked. Payments run through LemonSqueezy, which is the merchant of record, so the refund goes back to the card you paid with. We start it within 3 to 5 business days and the bank can take another 5 to 10 to show it.",
  },
];

export default function HomeV2() {
  const rootRef = useRef<HTMLDivElement>(null);
  usePaperTexture(rootRef);
  useMarkingInk(rootRef);

  useEffect(() => {
    analytics.viewLanding();
  }, []);

  return (
    <div className="ms-root" data-marking-sheet ref={rootRef}>
      <SEOHead
        title="IBLens: IB Essay Grader, Marked Like a Script"
        description="Paste an IB draft and get it marked against the published criteria, criterion by criterion, in about a minute. Free preview on the first one. Full report $9.99, no subscription."
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <TabRail />
      <DeskRail />

      <CoverSheet />
      <MarkedScript />
      <RubricGrid />
      <ReceivedStamps />
      <ScopeSheet />
      <RequestSlip />

      <Sheet plain>
        <h2 className="ms-qhead">Questions the marking office gets</h2>
        <dl className="ms-faq">
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
        <Colophon />
      </Sheet>

      <footer className="ms-foot">
        <span>IBLens</span>
        <span>Independent of the International Baccalaureate Organization</span>
        <span>Predicted scores are estimates, not official marks</span>
        <span>Scripts pass through our server in Finland and are processed by Anthropic PBC</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </footer>
    </div>
  );
}
