import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  DEFAULT_MEMBER,
  PROMO_CODE,
  defaultSize,
  earnedPoints,
  getProduct,
  lineIdentifier,
  quoteCart,
  stories,
} from "./data";
import type {
  CartLine,
  GiftInfo,
  Member,
  Palette,
  Receipt,
  ShopFilter,
  ShopSort,
  Typeface,
  View,
} from "./types";

const STORAGE_KEY = "cl-member-shop-v2";

export type Toast = { id: number; text: string };

export type State = {
  view: View;
  member: Member;
  spent: number;
  cart: CartLine[];
  saved: string[];
  query: string;
  filter: ShopFilter;
  sort: ShopSort;
  suggestExpanded: boolean;
  modalId: string | null;
  promoInput: string;
  promoApplied: boolean;
  promoError: string | null;
  receipt: Receipt | null;
  palette: Palette;
  typeface: Typeface;
  toast: Toast | null;
};

export type Action =
  | { type: "view"; view: View }
  | { type: "query"; query: string }
  | { type: "filter"; filter: ShopFilter }
  | { type: "sort"; sort: ShopSort }
  | { type: "suggest"; expanded: boolean }
  | { type: "modal"; id: string | null }
  | { type: "promo-input"; value: string }
  | { type: "promo-apply" }
  | { type: "promo-clear" }
  | { type: "save"; id: string }
  | {
      type: "add";
      productId: string;
      size: string | null;
      mode?: "points" | "purchase";
      gift?: GiftInfo | null;
    }
  | { type: "qty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "redeem" }
  | { type: "dismiss-receipt" }
  | { type: "story"; loaves: number; tier: Member["tier"] }
  | { type: "palette"; palette: Palette }
  | { type: "typeface"; typeface: Typeface }
  | { type: "reset" }
  | { type: "toast-clear"; id: number };

const initialState: State = {
  view: "shop",
  member: DEFAULT_MEMBER,
  spent: 0,
  cart: [],
  saved: [],
  query: "",
  filter: "all",
  sort: "value",
  suggestExpanded: false,
  modalId: null,
  promoInput: "",
  promoApplied: false,
  promoError: null,
  receipt: null,
  palette: "loaf",
  typeface: "montserrat",
  toast: null,
};

type Persisted = Pick<
  State,
  "member" | "spent" | "cart" | "saved" | "palette" | "typeface" | "promoApplied"
>;

function isPalette(value: unknown): value is Palette {
  return value === "loaf" || value === "teal" || value === "berry" || value === "sage";
}

function isTypeface(value: unknown): value is Typeface {
  return value === "montserrat" || value === "fraunces" || value === "lora";
}

function isTier(value: unknown): value is Member["tier"] {
  return value === 0 || value === 1 || value === 2 || value === 3;
}

function sanitizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const lines: CartLine[] = [];

  for (const entry of value) {
    if (!entry || typeof entry !== "object") {
      continue;
    }
    const candidate = entry as Partial<CartLine>;
    if (typeof candidate.productId !== "string") {
      continue;
    }
    const product = getProduct(candidate.productId);
    if (!product?.redeemable) {
      continue;
    }
    const qty = typeof candidate.qty === "number" ? Math.round(candidate.qty) : 1;
    if (qty < 1) {
      continue;
    }
    const size =
      typeof candidate.size === "string" && product.sizes?.includes(candidate.size)
        ? candidate.size
        : defaultSize(product);
    const mode = candidate.mode === "purchase" ? "purchase" : "points";
    const gift =
      candidate.gift &&
      typeof candidate.gift === "object" &&
      typeof candidate.gift.recipientName === "string" &&
      typeof candidate.gift.recipientHub === "string"
        ? {
            recipientName: candidate.gift.recipientName,
            recipientHub: candidate.gift.recipientHub,
            note: typeof candidate.gift.note === "string" ? candidate.gift.note : "",
            delivery: candidate.gift.delivery === "ship" ? ("ship" as const) : ("hub" as const),
          }
        : null;
    lines.push({ productId: product.id, size, qty: Math.min(4, qty), mode, gift });
  }

  return lines;
}

function loadPersisted(): Partial<Persisted> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const data = JSON.parse(raw) as Partial<Persisted>;
    const member =
      data.member &&
      typeof data.member.loaves === "number" &&
      isTier(data.member.tier)
        ? { loaves: data.member.loaves, tier: data.member.tier }
        : undefined;

    return {
      member,
      spent: typeof data.spent === "number" ? Math.max(0, data.spent) : 0,
      cart: sanitizeCart(data.cart),
      saved: Array.isArray(data.saved)
        ? data.saved.filter((id): id is string => typeof id === "string" && Boolean(getProduct(id)))
        : [],
      palette: isPalette(data.palette) ? data.palette : "loaf",
      typeface: isTypeface(data.typeface) ? data.typeface : "montserrat",
      promoApplied: Boolean(data.promoApplied),
    };
  } catch {
    return null;
  }
}

function withToast(state: State, text: string): State {
  return { ...state, toast: { id: Date.now(), text } };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "view":
      return {
        ...state,
        view: action.view,
        receipt: action.view === "cart" ? state.receipt : null,
        modalId: null,
      };
    case "query":
      return { ...state, query: action.query };
    case "filter":
      return { ...state, filter: action.filter, view: "shop", receipt: null };
    case "sort":
      return { ...state, sort: action.sort };
    case "suggest":
      return { ...state, suggestExpanded: action.expanded };
    case "modal":
      return { ...state, modalId: action.id };
    case "promo-input":
      return { ...state, promoInput: action.value, promoError: null };
    case "promo-apply": {
      const code = state.promoInput.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      if (!code) {
        return state;
      }
      const isValidPromo =
        code === PROMO_CODE ||
        code === "BREADER15" ||
        code === "BREAD" ||
        code === "15OFF" ||
        code === "LOAVES";
      if (!isValidPromo) {
        return { ...state, promoApplied: false, promoError: "Try code BREADER for 15% off points." };
      }
      return withToast(
        { ...state, promoApplied: true, promoInput: PROMO_CODE, promoError: null },
        "Promo BREADER applied (-15% pts)!",
      );
    }
    case "promo-clear":
      return { ...state, promoApplied: false, promoInput: "", promoError: null };
    case "save": {
      const saved = state.saved.includes(action.id)
        ? state.saved.filter((id) => id !== action.id)
        : [...state.saved, action.id];
      return { ...state, saved };
    }
    case "add": {
      const product = getProduct(action.productId);
      if (!product?.redeemable) {
        return state;
      }
      const size = action.size ?? defaultSize(product);
      const mode = action.mode ?? "points";
      const gift = action.gift ?? null;
      const newLine: CartLine = { productId: product.id, size, qty: 1, mode, gift };
      const targetKey = lineIdentifier(newLine);
      const existing = state.cart.find((line) => lineIdentifier(line) === targetKey);
      const cart = existing
        ? state.cart.map((line) =>
            lineIdentifier(line) === targetKey
              ? { ...line, qty: Math.min(4, line.qty + 1) }
              : line,
          )
        : [...state.cart, newLine];

      const toastMsg = gift
        ? `Added ${product.shortName} ($${product.priceUsd}) as a surprise gift for ${gift.recipientName} (${gift.recipientHub})!`
        : mode === "purchase"
          ? `Added ${product.name} ($${product.priceUsd}) to support Community Loaves!`
          : `Added ${product.name}${size ? ` (${size})` : ""} to your bag!`;

      return withToast({ ...state, cart, receipt: null }, toastMsg);
    }
    case "qty": {
      if (action.qty < 1) {
        return {
          ...state,
          cart: state.cart.filter((line) => lineIdentifier(line) !== action.key),
        };
      }
      return {
        ...state,
        cart: state.cart.map((line) =>
          lineIdentifier(line) === action.key
            ? { ...line, qty: Math.min(4, action.qty) }
            : line,
        ),
      };
    }
    case "remove":
      return {
        ...state,
        cart: state.cart.filter((line) => lineIdentifier(line) !== action.key),
      };
    case "redeem": {
      const available = Math.max(0, earnedPoints(state.member) - state.spent);
      const quote = quoteCart(state.cart, state.promoApplied);
      if (quote.lines.length === 0 || quote.total > available) {
        return state;
      }
      return {
        ...state,
        spent: state.spent + quote.total,
        cart: [],
        promoApplied: false,
        promoInput: "",
        promoError: null,
        view: "cart",
        receipt: {
          lines: quote.lines.map((line) => ({
            name: line.product.name,
            size: line.size,
            qty: line.qty,
            mode: line.mode,
            gift: line.gift,
            points: line.points,
            usd: line.usd,
          })),
          subtotal: quote.subtotal,
          discount: quote.discount,
          total: quote.total,
          usdTotal: quote.usdTotal,
          remaining: available - quote.total,
        },
      };
    }
    case "dismiss-receipt":
      return { ...state, receipt: null, view: "shop" };
    case "story":
      return withToast(
        {
          ...state,
          member: { loaves: action.loaves, tier: action.tier },
          spent: 0,
          receipt: null,
          cart: [],
          promoApplied: false,
          promoInput: "",
          promoError: null,
        },
        `Switched baker profile to ${action.loaves.toLocaleString("en-US")} loaves donated!`,
      );
    case "palette":
      return { ...state, palette: action.palette };
    case "typeface":
      return { ...state, typeface: action.typeface };
    case "reset":
      return {
        ...initialState,
        toast: { id: Date.now(), text: "Reset to Sarah Dough (640 loaves)." },
      };
    case "toast-clear":
      return state.toast?.id === action.id ? { ...state, toast: null } : state;
    default: {
      const exhaustive: never = action;
      return exhaustive;
    }
  }
}

function hydrate(): State {
  const saved = loadPersisted();
  if (!saved) {
    return initialState;
  }
  const member = saved.member ?? initialState.member;
  const earned = earnedPoints(member);
  return {
    ...initialState,
    member,
    spent: Math.min(saved.spent ?? 0, earned),
    cart: saved.cart ?? [],
    saved: saved.saved ?? [],
    palette: saved.palette ?? "loaf",
    typeface: saved.typeface ?? "montserrat",
    promoApplied: saved.promoApplied ?? false,
    promoInput: saved.promoApplied ? PROMO_CODE : "",
  };
}

const ShopContext = createContext<{ state: State; dispatch: Dispatch<Action> } | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, hydrate);

  useEffect(() => {
    document.documentElement.dataset.palette = state.palette;
    document.documentElement.dataset.typeface = state.typeface;
  }, [state.palette, state.typeface]);

  useEffect(() => {
    const payload: Persisted = {
      member: state.member,
      spent: state.spent,
      cart: state.cart,
      saved: state.saved,
      palette: state.palette,
      typeface: state.typeface,
      promoApplied: state.promoApplied,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [
    state.member,
    state.spent,
    state.cart,
    state.saved,
    state.palette,
    state.typeface,
    state.promoApplied,
  ]);

  useEffect(() => {
    if (!state.toast) {
      return;
    }
    const id = state.toast.id;
    const timer = window.setTimeout(() => dispatch({ type: "toast-clear", id }), 2800);
    return () => window.clearTimeout(timer);
  }, [state.toast]);

  return <ShopContext.Provider value={{ state, dispatch }}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within ShopProvider");
  }
  return context;
}

export function availablePoints(state: State): number {
  return Math.max(0, earnedPoints(state.member) - state.spent);
}

export function matchingStory(member: Member): string | null {
  return (
    stories.find((story) => story.loaves === member.loaves && story.tier === member.tier)?.id ??
    null
  );
}
