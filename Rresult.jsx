import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useToppers } from "@/hooks/useData";
import { Trophy, Medal, Star } from "lucide-react";

const AVATAR = "https://ui-avatars.com/api/?background=fec00a&color=1e3a6e&bold=true&size=128&name=";

const rankColors = [
  { bg: "from-yellow-400 to-yellow-500", text: "text-yellow-800", badge: "🥇" },
  { bg: "from-gray-300 to-gray-400",    text: "text-gray-700",   badge: "🥈" },
  { bg: "from-orange-400 to-orange-500", text: "text-orange-800", badge: "🥉" },
];

function TopperCard({ topper, index }: { topper: any; index: number }) {
  const rank = rankColors[index] ?? { bg: "from-primary/20 to-primary/10", text: "text-primary", badge: `#${index + 1}` };
  return (
    <div className={`card-animate relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center p-6 ${index === 0 ? "ring-2 ring-yellow-400" : ""}`}>
      {index < 3 && (
        <span className="absolute top-3 right-3 text-2xl">{rank.badge}</span>
      )}
      {index >= 3 && (
        <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">#{index + 1}</span>
      )}
      <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${rank.bg} mb-4 overflow-hidden flex items-center justify-center border-4 border-white shadow-md`}>
        <img
          src={topper.image_url || `${AVATAR}${encodeURIComponent(topper.name)}`}
          alt={topper.name}
          className="w-full h-full object-cover"
          onError={(e: any) => { e.target.src = `${AVATAR}${encodeURIComponent(topper.name)}`; }}
        />
      </div>
      <h3 className="font-serif font-bold text-lg text-primary mb-1">{topper.name}</h3>
      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold text-lg bg-gradient-to-r ${rank.bg} ${rank.text} shadow-sm`}>
        <Star size={14} className="fill-current" />
        {topper.percentage}%
      </div>
      {topper.year && (
        <p className="text-xs text-muted-foreground mt-2">Batch {topper.year}</p>
      )}
    </div>
  );
}

export default function Results() {
  const [activeTab, setActiveTab] = useState<10 | 12>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("class") === "12" ? 12 : 10;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cls = params.get("class");
    if (cls === "12") setActiveTab(12);
    else if (cls === "10") setActiveTab(10);
  }, [window.location.search]);
  const { data: toppers10, isLoading: l10 } = useToppers(10);
  const { data: toppers12, isLoading: l12 } = useToppers(12);

  const active = activeTab === 10 ? toppers10 : toppers12;
  const isLoading = activeTab === 10 ? l10 : l12;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy size={36} className="text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-primary-foreground">Results & Toppers</h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Celebrating the outstanding achievements of our brilliant students.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-card border-b border-border sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 flex gap-1 py-3">
          {([10, 12] as const).map((cls) => (
            <button
              key={cls}
              onClick={() => setActiveTab(cls)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 ${
                activeTab === cls
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Medal size={16} />
              Class {cls} Toppers
            </button>
          ))}
        </div>
      </div>

      {/* Topper Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1 h-8 rounded-full bg-secondary" />
            <h2 className="text-2xl font-serif font-bold text-primary">Class {activeTab} Toppers</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-56 rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : active && active.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {active.map((t: any, i: number) => (
                <TopperCard key={t.id} topper={t} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Trophy size={48} className="mx-auto mb-4 opacity-30" />
              <p>No toppers added yet.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
