import { ResourceArticle } from "@/components/ResourceArticle";
import { Link } from "wouter";

export default function IBUniversityConsultantCost() {
  return (
    <ResourceArticle
      title="IB University Guidance — Temporarily Unavailable | IBLens"
      description="Our IB university guidance is being rebuilt on verified, official university requirements. In the meantime, grade your IB essays free with IBLens."
      canonical="/resources/ib-university-consultant-cost"
      datePublished="2026-07-16"
      dateModified="2026-07-16"
    >
      <h1>IB University Guidance — being rebuilt</h1>
      <p>
        We have taken our university guidance and strategy tools offline while we rebuild them on
        verified, official university requirements and deadlines drawn from primary sources. We would
        rather show nothing than show admission estimates or deadlines we cannot stand behind.
      </p>
      <p>
        In the meantime, the part of IBLens that works well is essay feedback against the assessment
        criteria. <Link href="/essay">Grade your IB IA, EE or TOK essay free →</Link>
      </p>
    </ResourceArticle>
  );
}
