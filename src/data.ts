import type { CartLine, HubMember, Member, Milestone, Product, Quote, Tier } from "./types";

export const MEMBER_NAME = "Sarah Dough";
export const MEMBER_HUB = "Kirkland Hub";
export const PROMO_CODE = "BREADER";
export const PROMO_RATE = 0.15;
export const LOAF_GOALS = [1, 50, 100, 500, 1000, 2000] as const;

export const hubMembers: readonly HubMember[] = [
  {
    id: "maya-lin",
    name: "Maya Lin",
    hub: "Kirkland Hub",
    role: "Volunteer Baker",
    note: "Just reached 100 donated loaves",
    art: "./art/baker-bagged-loaves.png",
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    hub: "Kirkland Hub",
    role: "Hub Coordinator",
    note: "Hosts bi-weekly check-ins and food bank runs",
    art: "./art/hub-dropoff-checkin.png",
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    hub: "Kirkland Hub",
    role: "New Baker",
    note: "Completed her first donation drop-off this month",
    art: "./art/baker-flour-cap.png",
  },
  {
    id: "david-kim",
    name: "David Kim",
    hub: "Kirkland Hub",
    role: "Cookie & Bread Baker",
    note: "Celebrated 1 full year of baking",
    art: "./art/baker-cookie-tower.png",
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    hub: "Bellevue Hub",
    role: "Regional Hub Lead",
    note: "Coordinates Eastside flour orders",
    art: "./art/three-bakers-dancing.png",
  },
];

export const giftNotePresets: readonly string[] = [
  "Congrats on your loaf milestone!",
  "Thank you for coordinating our Kirkland Hub drop-offs!",
  "Welcome to the hub! Excited to bake with you.",
  "Thanks for always pitching in with extra cookie batches!",
];

export const products: readonly Product[] = [
  {
    id: "sticker-loaf",
    name: "First-Bake Loaf Sticker",
    shortName: "Loaf Sticker",
    tagline: "Weatherproof vinyl sticker for your flour bin, mixer, or water bottle.",
    description:
      "Matte vinyl die-cut sticker with the Community Loaves honey-oat loaf illustration. Dishwasher and water resistant.",
    milestoneTag: "1st Donation",
    unlockNote: "Unlocked on your first hub drop-off",
    points: 40,
    priceUsd: 5,
    fundraisingNote: "Covers bread bags and labels for 20 donated loaves",
    category: "sticker",
    art: "sticker",
    swatch: "linear-gradient(135deg, #ffe3db 0%, #ffc5b5 100%)",
    badge: "Start Here",
    redeemable: true,
  },
  {
    id: "bowl-scraper",
    name: "100 Loaves Club Bowl Scraper",
    shortName: "Bowl Scraper",
    tagline: "Flexible curved dough scraper printed with the 100 Loaves Club emblem.",
    description:
      "Contoured green flexible bowl scraper shaped to scoop every bit of dough cleanly from mixing bowls without scratching. Printed with the 100 Loaves Club crest and a hanging hole.",
    milestoneTag: "50+ Loaves",
    unlockNote: "Great companion tool as you build toward 100 loaves",
    points: 110,
    priceUsd: 10,
    fundraisingNote: "Funds 10 lbs of local whole-wheat flour",
    category: "tool",
    art: "bowlScraper",
    swatch: "linear-gradient(135deg, #fff0b8 0%, #ffd55e 100%)",
    badge: "Popular",
    redeemable: true,
  },
  {
    id: "tote-market",
    name: "Hub Drop-Off Market Tote",
    shortName: "Market Tote",
    tagline: "Heavyweight cotton gusset tote sized to carry 4 cooled loaves.",
    description:
      "14-oz organic cotton canvas tote with reinforced handles and a flat rectangular base designed to keep sandwich loaves level during transport.",
    milestoneTag: "100 Loaves",
    unlockNote: "Built for bi-weekly hub drop-offs",
    points: 200,
    priceUsd: 24,
    fundraisingNote: "Funds 20 lbs of Washington-grown grain for hubs",
    category: "tote",
    art: "tote",
    swatch: "linear-gradient(135deg, #d7f3f7 0%, #9ee0eb 100%)",
    badge: "Top Gift",
    redeemable: true,
  },
  {
    id: "scraper",
    name: "Stainless Bench Dough Scraper",
    shortName: "Bench Scraper",
    tagline: "Stainless steel bench knife with a riveted walnut wood grip.",
    description:
      "Rigid stainless steel bench scraper with a warm riveted hardwood handle for dividing dough cleanly, shaping loaves, and scraping counters in seconds.",
    milestoneTag: "100 Loaves",
    unlockNote: "Unlocked at 100 donated loaves",
    points: 280,
    priceUsd: 18,
    fundraisingNote: "Funds yeast, oats, and recipe packets for new bakers",
    category: "tool",
    art: "scraper",
    swatch: "linear-gradient(135deg, #daf4e0 0%, #9de2af 100%)",
    badge: "Baker Favorite",
    redeemable: true,
  },
  {
    id: "bread-lame",
    name: "“Breader Together” Bread Lame Set",
    shortName: "Bread Lame",
    tagline: "Engraved round wood scoring lame with red snap pouch and blades.",
    description:
      "Custom walnut round bread lame laser-engraved with Breader Together. Includes a stitched red snap storage pouch and replacement stainless steel scoring blades.",
    milestoneTag: "250+ Loaves",
    unlockNote: "Unlocked on your way to 500 donated loaves",
    points: 380,
    priceUsd: 24,
    fundraisingNote: "Supports volunteer baker training and starter kits",
    category: "tool",
    art: "lame",
    swatch: "linear-gradient(135deg, #ffdbe5 0%, #ffadc4 100%)",
    badge: "New Photo",
    redeemable: true,
  },
  {
    id: "apron",
    name: "Baker’s Flour-Sack Apron",
    shortName: "Baker Apron",
    tagline: "Washed cotton canvas apron with cross-back straps and front pockets.",
    description:
      "Heavy cotton canvas apron with no-tie cross-back straps to prevent neck strain, two deep lap pockets for a thermometer and bench scraper, and an embroidered Community Loaves logo.",
    milestoneTag: "250+ Loaves",
    unlockNote: "Unlocked after 250 donated loaves",
    points: 460,
    priceUsd: 34,
    fundraisingNote: "Funds 30 lbs of bread flour for food bank partners",
    category: "apron",
    art: "apron",
    swatch: "linear-gradient(135deg, #e5e0fa 0%, #c6b8f5 100%)",
    sizes: ["S/M", "L/XL"],
    redeemable: true,
  },
  {
    id: "tee-honey",
    name: "Honey Oat Classic Tee",
    shortName: "Honey Oat Tee",
    tagline: "Ringspun cotton crew tee with the honey-oat loaf chest print.",
    description:
      "Midweight 100% combed ringspun cotton t-shirt in cream with a water-based screen print on the chest. Pre-shrunk regular fit.",
    milestoneTag: "500 Loaves",
    unlockNote: "Unlocked at 500 donated loaves",
    points: 540,
    priceUsd: 28,
    fundraisingNote: "Supports hub transport bins and check-in supplies",
    category: "shirt",
    art: "tee",
    swatch: "linear-gradient(135deg, #ffe8a3 0%, #fcb321 100%)",
    badge: "Hit",
    sizes: ["XS", "S", "M", "L", "XL"],
    redeemable: true,
  },
  {
    id: "kitchen-scale",
    name: "1,000 Loaves Club Kitchen Scale",
    shortName: "Kitchen Scale",
    tagline: "Digital glass gram scale printed with the 1,000 Loaves Club emblem.",
    description:
      "Precision digital kitchen scale for weighing flour, water, oats, and dough portions accurately in grams or ounces. Features a tempered glass top, touch tare button, and backlit LCD.",
    milestoneTag: "1,000 Loaves",
    unlockNote: "Celebrates reaching 1,000 donated loaves",
    points: 760,
    priceUsd: 36,
    fundraisingNote: "Funds 40 lbs of whole grain for regional food banks",
    category: "tool",
    art: "scale",
    swatch: "linear-gradient(135deg, #d4eefc 0%, #8cd3f8 100%)",
    badge: "Precision Gear",
    redeemable: true,
  },
  {
    id: "hoodie-2000",
    name: "2,000 Loaves Club Hoodie",
    shortName: "2,000-Loaf Hoodie",
    tagline: "Milestone hoodie with custom 2,000 Loaves Club embroidery.",
    description:
      "Earned exclusively by volunteer bakers who reach 2,000 donated loaves. Features heavyweight fleece, double-lined hood, and custom milestone embroidery. Not sold for cash.",
    milestoneTag: "2,000 Loaves Club",
    unlockNote: "Earned only by reaching 2,000 donated loaves",
    points: 1400,
    category: "sweatshirt",
    art: "hoodie",
    swatch: "linear-gradient(135deg, #fcb321 0%, #e8673a 55%, #c55230 100%)",
    badge: "Milestone Exclusive",
    sizes: ["S", "M", "L", "XL"],
    redeemable: true,
  },
];

export type TrackStep = {
  id: string;
  stepNumber: number;
  title: string;
  requirement: string;
  minLoaves: number;
  pointsAwarded: string;
  productId: string;
  rewardLabel: string;
  rewardPoints: number;
};

export const milestoneTrack: readonly TrackStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "First Donation",
    requirement: "1st hub drop-off",
    minLoaves: 1,
    pointsAwarded: "+60 pts",
    productId: "sticker-loaf",
    rewardLabel: "Loaf Sticker",
    rewardPoints: 40,
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "50 Loaves",
    requirement: "50 loaves donated",
    minLoaves: 50,
    pointsAwarded: "+120 pts",
    productId: "bowl-scraper",
    rewardLabel: "Bowl Scraper",
    rewardPoints: 110,
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "100 Loaves",
    requirement: "100 loaves donated",
    minLoaves: 100,
    pointsAwarded: "+200 pts",
    productId: "scraper",
    rewardLabel: "Bench Scraper & Lame",
    rewardPoints: 280,
  },
  {
    id: "step-4",
    stepNumber: 4,
    title: "500 to 1,000 Loaves",
    requirement: "500+ loaves donated",
    minLoaves: 500,
    pointsAwarded: "+580 pts",
    productId: "kitchen-scale",
    rewardLabel: "Apron, Tee & Scale",
    rewardPoints: 760,
  },
  {
    id: "step-5",
    stepNumber: 5,
    title: "2,000 Loaves Club",
    requirement: "2,000 loaves donated",
    minLoaves: 2000,
    pointsAwarded: "+1,140 pts",
    productId: "hoodie-2000",
    rewardLabel: "2,000-Loaf Hoodie",
    rewardPoints: 1400,
  },
];

export const milestones: readonly Milestone[] = [
  {
    id: "first",
    title: "First Donation Drop-Off",
    detail: "Your first batch of homemade loaves was checked in at a neighborhood hub.",
    points: 60,
    rewardHint: "Enough for the First-Bake Loaf Sticker (40 pts)",
    minLoaves: 1,
  },
  {
    id: "cookies",
    title: "First Energy Cookie Batch",
    detail: "Baked and donated your first batch of energy cookies.",
    points: 50,
    minTier: 1,
  },
  {
    id: "loaves-50",
    title: "50 Loaves Donated",
    detail: "Reached 50 total loaves donated across scheduled drop-offs.",
    points: 80,
    rewardHint: "Unlocks the 100 Loaves Club Bowl Scraper (110 pts)",
    minLoaves: 50,
  },
  {
    id: "streak",
    title: "Three-Month Baking Streak",
    detail: "Participated in every scheduled bi-weekly bake for three straight months.",
    points: 70,
    minTier: 1,
  },
  {
    id: "loaves-100",
    title: "100 Loaves Club",
    detail: "Reached 100 whole-grain loaves baked and donated from your kitchen.",
    points: 120,
    rewardHint: "Unlocks the Stainless Bench Dough Scraper (280 pts)",
    minLoaves: 100,
  },
  {
    id: "invited",
    title: "Referred a New Baker",
    detail: "Invited a friend who attended an info session and joined a baking hub.",
    points: 70,
    minTier: 2,
  },
  {
    id: "holiday",
    title: "Holiday Treat Box Baker",
    detail: "Baked extra loaves or cookies for seasonal food bank distribution.",
    points: 90,
    minTier: 2,
  },
  {
    id: "loaves-500",
    title: "500 Loaves Milestone",
    detail: "Reached 500 donated loaves logged at your neighborhood hub.",
    points: 200,
    rewardHint: "Unlocks Tees (540 pts) & Baker Apron (460 pts)",
    minLoaves: 500,
  },
  {
    id: "year",
    title: "One Full Year of Baking",
    detail: "Completed 12 months as an active volunteer baker.",
    points: 120,
    minTier: 2,
  },
  {
    id: "dropoffs",
    title: "24 Hub Drop-Offs",
    detail: "Completed 24 scheduled neighborhood hub deliveries.",
    points: 100,
    rewardHint: "Unlocks the Breader Together Bread Lame Set (380 pts)",
    minTier: 2,
  },
  {
    id: "loaves-1000",
    title: "1,000 Loaves Milestone",
    detail: "Reached 1,000 donated loaves baked from your home kitchen.",
    points: 240,
    rewardHint: "Unlocks the 1,000 Loaves Club Kitchen Scale (760 pts)",
    minLoaves: 1000,
  },
  {
    id: "loaves-2000",
    title: "2,000 Loaves Club",
    detail: "Reached 2,000 donated loaves and unlocked the 2,000 Loaves Club Hoodie.",
    points: 550,
    rewardHint: "Unlocks the 2,000 Loaves Club Hoodie (1,400 pts)",
    minLoaves: 2000,
    celebrate: true,
  },
  {
    id: "captain",
    title: "Neighborhood Hub Lead",
    detail: "Helped coordinate check-in sheets, schedules, and food bank transport for your hub.",
    points: 200,
    minTier: 3,
  },
  {
    id: "five-years",
    title: "Five-Year Baker Anniversary",
    detail: "Completed five years of volunteer baking with Community Loaves.",
    points: 150,
    minTier: 3,
  },
];

export const stories: readonly {
  id: string;
  label: string;
  shortLabel: string;
  detail: string;
  loaves: number;
  tier: Tier;
  art: string;
}[] = [
  {
    id: "first",
    label: "1st Donation",
    shortLabel: "1st Bake (60 pts)",
    detail: "8 loaves · Sticker unlocked",
    loaves: 8,
    tier: 0,
    art: "./art/baker-bagged-loaves.png",
  },
  {
    id: "rhythm",
    label: "100+ Loaves",
    shortLabel: "140 Loaves (380 pts)",
    detail: "140 loaves · Scraper & Tote",
    loaves: 140,
    tier: 1,
    art: "./art/baker-flour-cap.png",
  },
  {
    id: "today",
    label: "Sarah Today",
    shortLabel: "640 Loaves (960 pts)",
    detail: "640 loaves · Tees & Crewneck",
    loaves: 640,
    tier: 2,
    art: "./art/baker-two-loaves.png",
  },
  {
    id: "legend",
    label: "2,000 Loaves Club",
    shortLabel: "2,040 Loaves (2,100 pts)",
    detail: "2,040 loaves · All rewards!",
    loaves: 2040,
    tier: 3,
    art: "./art/baker-crewneck-jump.png",
  },
];

export const DEFAULT_MEMBER: Member = { loaves: 640, tier: 2 };

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function defaultSize(product: Product): string | null {
  if (!product.sizes || product.sizes.length === 0) {
    return null;
  }
  if (product.sizes.includes("M")) {
    return "M";
  }
  return product.sizes[0];
}

export function isEarned(milestone: Milestone, member: Member): boolean {
  if (milestone.minLoaves !== undefined && member.loaves < milestone.minLoaves) {
    return false;
  }
  if (milestone.minTier !== undefined && member.tier < milestone.minTier) {
    return false;
  }
  return true;
}

export function earnedMilestones(member: Member): Milestone[] {
  return milestones.filter((milestone) => isEarned(milestone, member));
}

export function earnedPoints(member: Member): number {
  return earnedMilestones(member).reduce((sum, milestone) => sum + milestone.points, 0);
}

export function nextLoafGoal(loaves: number): number | null {
  return LOAF_GOALS.find((goal) => loaves < goal) ?? null;
}

export function storyTitle(tier: Tier): string {
  switch (tier) {
    case 0:
      return "New Volunteer Baker";
    case 1:
      return "100-Loaf Club Baker";
    case 2:
      return "500-Loaf Club Baker";
    case 3:
      return "2,000-Loaf Legend";
    default: {
      const exhaustive: never = tier;
      return exhaustive;
    }
  }
}

export function lineIdentifier(line: Pick<CartLine, "productId" | "size" | "mode" | "gift">): string {
  const mode = line.mode ?? "points";
  const giftKey = line.gift ? `${line.gift.recipientName}@${line.gift.recipientHub}` : "";
  return `${line.productId}::${line.size ?? ""}::${mode}::${giftKey}`;
}

export function quoteCart(cart: readonly CartLine[], promoApplied: boolean): Quote {
  const lines: Quote["lines"] = [];

  for (const line of cart) {
    const product = getProduct(line.productId);
    if (!product || !product.redeemable) {
      continue;
    }
    const mode = line.mode ?? "points";
    const isPurchase = mode === "purchase" && product.priceUsd !== undefined;
    lines.push({
      key: lineIdentifier(line),
      product,
      size: line.size,
      qty: line.qty,
      mode: isPurchase ? "purchase" : "points",
      gift: line.gift ?? null,
      points: isPurchase ? 0 : product.points * line.qty,
      usd: isPurchase ? (product.priceUsd ?? 0) * line.qty : 0,
    });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.points, 0);
  const usdTotal = lines.reduce((sum, line) => sum + line.usd, 0);
  const discount = promoApplied ? Math.round(subtotal * PROMO_RATE) : 0;

  return {
    lines,
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
    usdTotal,
  };
}

export function redeemableProducts(): Product[] {
  return products.filter((product) => product.redeemable);
}

export function fundraisingProducts(): Product[] {
  return products.filter((product) => product.priceUsd !== undefined);
}
