import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBUniversityConsultantCost() {
  return (
    <ResourceArticle
      title="IB University Guidance: No Longer Offered | IBLens"
      description="This part of IBLens is no longer offered. We withdrew it rather than sell university guidance we cannot keep current. IBLens still marks IB coursework, with a free preview first."
      canonical="/resources/ib-university-consultant-cost"
      datePublished="2026-07-16"
      dateModified="2026-07-16"
    >
      <h1>IB university guidance: no longer offered</h1>
      <p>
        This part of IBLens is no longer offered. We withdrew our university guidance and strategy
        tools rather than sell admission estimates or deadlines we cannot keep current and stand behind.
      </p>
      <p>
        What IBLens does offer is feedback on IB coursework against the assessment criteria.{" "}
        <Link href="/essay">Get a free preview on your IA, EE or TOK essay →</Link>
      </p>
    </ResourceArticle>
  );
}
