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
    q: "How does IBLens analyze my IB essay?",
    a: "A large language model is given the official assessment criteria for your task and session, and marks your draft criterion by criterion. The report gives a predicted band, the criterion losing the most marks, the risks in the text, and what to change.",
  },
  {
    q: "Which IB essay types does IBLens support?",
    a: "Internal Assessments in 17 subjects, the Extended Essay, the TOK essay and the TOK exhibition. Each is marked against its own criteria.",
  },
  {
    q: "Is my first essay analysis really free?",
    a: "The first one returns a free preview: your band range, your weakest criterion with its full feedback, and the top risks in the draft. The complete report, with every criterion scored and a ranked fix list, unlocks for $9.99.",
  },
  {
    q: "How accurate is the predicted IB score?",
    a: "It is an estimate, not a mark. No tool can promise an exact score. The model is instructed with the published criteria for your subject and session, and the value of the report is in which criterion it flags and why, not in the number.",
  },
  {
    q: "Is my essay data kept private and secure?",
    a: "Your essay is sent to Anthropic PBC over an encrypted connection for the sole purpose of producing the analysis. It is not used to train models, not sold, and not shared with your school, universities or other students. Anonymous analyses are not stored permanently.",
  },
  {
    q: "What happens if I revise and want a second opinion?",
    a: "A paid report includes two re-checks of the same piece of work within 14 days, at no extra cost. Revise, run it again, and see whether the criterion moved.",
  },
  {
    q: "What if I am not satisfied with my analysis?",
    a: "Email glushkovim@gmail.com within 7 days of your purchase for a full refund, no questions asked. Refunds go back to the original payment method within 3 to 5 business days.",
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
        title="IBLens, IB essay grader marked like a script"
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
        <span>Scripts are processed by Anthropic PBC to produce the analysis</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </footer>
    </div>
  );
}
