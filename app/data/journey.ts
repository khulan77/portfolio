export type JourneyStage = {
  id: string;
  label: string;
  /** One line. If it needs two, it belongs in a case study instead. */
  body: string;
};

/** The evolution behind the work, kept short enough to read in one pass. */
export const journey: JourneyStage[] = [
  { id: "learning", label: "Learning", body: "Pinecone Academy-д full-stack хөгжүүлэлт." },
  { id: "building", label: "Building", body: "Дасгал биш, ажиллаж байгаа систем." },
  { id: "collaborating", label: "Collaborating", body: "Багийн repo, код review, PineQuest." },
  { id: "shipping", label: "Shipping", body: "Deploy, домэйн, migration — өөрөө." },
  { id: "ai", label: "AI", body: "Загварыг бодит хэрэглэгчийн урсгалд." },
  { id: "products", label: "Products", body: "Технологиос биш асуудлаас эхлэх." },
];
