import { Link } from "wouter";
import { getLoginUrl } from "@/const";

/** The label along the top of the desk. Site navigation, kept to five entries. */
export function DeskRail() {
  return (
    <div className="ms-rail">
      <span className="ms-mark">IBLens</span>
      <nav aria-label="Site">
        <Link href="/essay">Grade an essay</Link>
        <Link href="/ucas-personal-statement">UCAS</Link>
        <Link href="/resources">Guides</Link>
        <Link href="/pricing">Pricing</Link>
        <a href={getLoginUrl()}>Sign in</a>
      </nav>
    </div>
  );
}
