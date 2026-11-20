export type Category =
  | "sticker"
  | "pin"
  | "tote"
  | "tool"
  | "apron"
  | "shirt"
  | "sweatshirt";

export type ArtKind =
  | "sticker"
  | "pin"
  | "tote"
  | "scraper"
  | "bowlScraper"
  | "lame"
  | "scale"
  | "apron"
  | "tee"
  | "teeType"
  | "crew"
  | "hoodie";

export type Product = {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  milestoneTag: string;
  unlockNote: string;
  points: number;
  priceUsd?: number;
  fundraisingNote?: string;
  category: Category;
  art: ArtKind;
  swatch: string;
  badge?: string;
  sizes?: readonly string[];
  redeemable: boolean;
};

export type HubMember = {
  id: string;
  name: string;
  hub: string;
  role: string;
  note: string;
  art: string;
};

export type GiftInfo = {
  recipientName: string;
  recipientHub: string;
  note: string;
  delivery: "hub" | "ship";
};

export type Tier = 0 | 1 | 2 | 3;

export type Milestone = {
  id: string;
  title: string;
  detail: string;
  points: number;
  rewardHint?: string;
  minLoaves?: number;
  minTier?: Tier;
  celebrate?: boolean;
};

export type ShopFilter =
  | "all"
  | "affordable"
  | "small"
  | "tool"
  | "tote"
  | "wear"
  | "saved";

export type ShopSort = "value" | "value-desc" | "name";

export type View = "shop" | "fundraising" | "cart" | "milestones";

export type Palette = "loaf" | "teal" | "berry" | "sage";

export type Typeface = "montserrat" | "fraunces" | "lora";

export type Member = {
  loaves: number;
  tier: Tier;
};

export type CartLine = {
  productId: string;
  size: string | null;
  qty: number;
  mode?: "points" | "purchase";
  gift?: GiftInfo | null;
};

export type QuoteLine = {
  key: string;
  product: Product;
  size: string | null;
  qty: number;
  mode: "points" | "purchase";
  gift: GiftInfo | null;
  points: number;
  usd: number;
};

export type Quote = {
  lines: QuoteLine[];
  subtotal: number;
  discount: number;
  total: number;
  usdTotal: number;
};

export type Receipt = {
  lines: {
    name: string;
    size: string | null;
    qty: number;
    mode: "points" | "purchase";
    gift: GiftInfo | null;
    points: number;
    usd: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
  usdTotal: number;
  remaining: number;
};

export function categoryLabel(category: Category): string {
  switch (category) {
    case "sticker":
      return "Sticker";
    case "pin":
      return "Enamel Pin";
    case "tote":
      return "Canvas Tote";
    case "tool":
      return "Baking Tool";
    case "apron":
      return "Baker Apron";
    case "shirt":
      return "T-Shirt";
    case "sweatshirt":
      return "Sweatshirt";
    default: {
      const exhaustive: never = category;
      return exhaustive;
    }
  }
}

export function formatPoints(value: number): string {
  return `${value.toLocaleString("en-US")} pts`;
}

export function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}
