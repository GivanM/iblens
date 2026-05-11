import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, GraduationCap, ArrowRight } from "lucide-react";

/* ── Essay Report Preview ── */
function EssayReportPreview() {
  const criteria = [
    { name: "A: Focus & Method", score: 5, max: 6, color: "text-emerald-600", bg: "bg-emerald-50", bar: "bg-emerald-500", pct: 83 },
    { name: "B: Knowledge & Understanding", score: 5, max: 6, color: "text-emerald-600", bg: "bg-emerald-50", bar: "bg-emerald-500", pct: 83 },
    { name: "C: Critical Thinking", score: 8, max: 12, color: "text-amber-600", bg: "bg-amber-50", bar: "bg-amber-500", pct: 67, note: "main weakness" },
    { name: "D: Presentation", score: 4, max: 4, color: "text-emerald-600", bg: "bg-emerald-50", bar: "bg-emerald-500", pct: 100 },
    { name: "E: Engagement", score: 2, max: 6, color: "text-orange-600", bg: "bg-orange-50", bar: "bg-orange-500", pct: 33 },
  ];

  return (
    <div className="relative bg-white rounded-xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] overflow-hidden border border-gray-200/60 w-full max-w-[420px] mx-auto" style={{ aspectRatio: "1/1.35" }}>
      {/* SAMPLE watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <span className="text-[80px] font-black text-gray-400/[0.06] -rotate-45 select-none tracking-widest">SAMPLE</span>
      </div>

      {/* Header */}
      <div className="bg-[#1a1f36] px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#6c63ff] flex items-center justify-center">
            <FileText className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-semibold text-xs tracking-wide">IBLens</span>
        </div>
        <span className="text-gray-400 text-[10px] font-medium">Extended Essay Grading Report</span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 relative z-[1]">
        {/* Essay title */}
        <p className="text-[11px] leading-snug text-gray-700 font-medium mb-4 line-clamp-2">
          "To what extent did economic sanctions contribute to the end of apartheid in South Africa (1985–1994)?"
        </p>

        {/* Score summary */}
        <div className="flex items-center gap-2.5 mb-4 flex-wrap">
          <div className="bg-[#6c63ff] text-white text-lg font-bold px-3 py-1 rounded-lg">
            24/34
          </div>
          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Grade B</span>
          <span className="text-[10px] text-gray-500">72nd percentile</span>
          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">+2 IB bonus</span>
        </div>

        {/* Criteria table */}
        <div className="space-y-2 mb-4">
          {criteria.map((c) => (
            <div key={c.name} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600 w-[140px] truncate flex-shrink-0">{c.name}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${c.bar} rounded-full`} style={{ width: `${c.pct}%` }} />
              </div>
              <span className={`text-[10px] font-semibold ${c.color} w-8 text-right flex-shrink-0`}>{c.score}/{c.max}</span>
              {c.note && <span className="text-[8px] text-amber-600 bg-amber-50 px-1 rounded flex-shrink-0">{c.note}</span>}
            </div>
          ))}
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5">Strengths</p>
            <div className="space-y-1">
              <div className="flex items-start gap-1">
                <span className="text-emerald-500 text-[10px] mt-0.5">●</span>
                <span className="text-[9px] text-gray-600 leading-tight">Strong historical evidence with primary sources</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-emerald-500 text-[10px] mt-0.5">●</span>
                <span className="text-[9px] text-gray-600 leading-tight">Clear thesis and focused research question</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-red-600 uppercase tracking-wider mb-1.5">Weaknesses</p>
            <div className="space-y-1">
              <div className="flex items-start gap-1">
                <span className="text-red-400 text-[10px] mt-0.5">●</span>
                <span className="text-[9px] text-gray-600 leading-tight">Counter-arguments need deeper evaluation</span>
              </div>
              <div className="flex items-start gap-1">
                <span className="text-red-400 text-[10px] mt-0.5">●</span>
                <span className="text-[9px] text-gray-600 leading-tight">Conclusion lacks nuanced reflection</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-100 px-5 py-2 flex justify-between items-center">
        <span className="text-[9px] text-gray-400">iblens.com</span>
        <span className="text-[9px] text-gray-400">Sample Report</span>
      </div>
    </div>
  );
}

/* ── University Strategy Preview ── */
function UniversityReportPreview() {
  const universities = [
    { name: "LSE", tier: "REACH", ib: 38, borderColor: "border-l-red-500" },
    { name: "UCL", tier: "REACH", ib: 38, borderColor: "border-l-red-500" },
    { name: "University of Edinburgh", tier: "MATCH", ib: 36, borderColor: "border-l-amber-500" },
    { name: "University of Amsterdam", tier: "MATCH", ib: 34, borderColor: "border-l-amber-500" },
    { name: "Maastricht University", tier: "SAFETY", ib: 30, borderColor: "border-l-emerald-500" },
  ];

  return (
    <div className="relative bg-white rounded-xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] overflow-hidden border border-gray-200/60 w-full max-w-[420px] mx-auto" style={{ aspectRatio: "1/1.35" }}>
      {/* SAMPLE watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <span className="text-[80px] font-black text-gray-400/[0.06] -rotate-45 select-none tracking-widest">SAMPLE</span>
      </div>

      {/* Header */}
      <div className="bg-[#0f4c75] px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
            <GraduationCap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-semibold text-xs tracking-wide">IBLens</span>
        </div>
        <span className="text-blue-200 text-[10px] font-medium">University Strategy Report</span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 relative z-[1]">
        {/* Student info */}
        <div className="bg-gray-50 rounded-lg px-3 py-2 mb-4">
          <p className="text-[10px] text-gray-500 font-medium">
            IB Year 2 · Predicted <span className="text-gray-800 font-bold">38/45</span> · Economics/Finance · Germany → UK/NL
          </p>
        </div>

        {/* Strategy cards */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: "REACH", count: 3, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
            { label: "MATCH", count: 3, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
            { label: "SAFETY", count: 2, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
            { label: "TOTAL", count: 8, color: "text-[#0f4c75]", bg: "bg-blue-50", border: "border-blue-200" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-lg px-2 py-2 text-center`}>
              <p className={`text-lg font-bold ${s.color}`}>{s.count}</p>
              <p className={`text-[8px] font-bold ${s.color} uppercase tracking-wider`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* University list */}
        <div className="space-y-1.5">
          {universities.map((u) => (
            <div key={u.name} className={`flex items-center justify-between bg-gray-50 rounded-md px-3 py-2 border-l-3 ${u.borderColor}`}>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-gray-800">{u.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-bold uppercase tracking-wider ${
                  u.tier === "REACH" ? "text-red-600" : u.tier === "MATCH" ? "text-amber-600" : "text-emerald-600"
                }`}>{u.tier}</span>
                <span className="text-[9px] text-gray-500">IB {u.ib}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-100 px-5 py-2 flex justify-between items-center">
        <span className="text-[9px] text-gray-400">iblens.com</span>
        <span className="text-[9px] text-gray-400">Sample Report</span>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export function SampleReports() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">See exactly what you get</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real sample outputs — Essay grading report and University Strategy report
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-[920px] mx-auto items-start">
          {/* Essay Report */}
          <div className="flex flex-col items-center gap-5">
            <div className="transition-transform duration-300 hover:scale-[0.98] cursor-pointer w-full flex justify-center">
              <EssayReportPreview />
            </div>
            <Button size="lg" className="shadow-lg shadow-primary/20" asChild>
              <Link href="/essay">
                Grade My Essay <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* University Report */}
          <div className="flex flex-col items-center gap-5">
            <div className="transition-transform duration-300 hover:scale-[0.98] cursor-pointer w-full flex justify-center">
              <UniversityReportPreview />
            </div>
            <Button size="lg" variant="outline" className="border-2" asChild>
              <Link href="/university">
                Build My Strategy <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
