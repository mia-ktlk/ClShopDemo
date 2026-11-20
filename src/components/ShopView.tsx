import { useMemo } from "react";
import { FundraisingSection } from "./FundraisingView";
import { ProductCard } from "./ProductCard";
import { ProductArt } from "./ProductArt";
import { SearchIcon } from "./Icons";
import {
  MEMBER_HUB,
  MEMBER_NAME,
  earnedMilestones,
  earnedPoints,
  getProduct,
  milestoneTrack,
  nextLoafGoal,
  products,
  stories,
  storyTitle,
} from "../data";
import { availablePoints, matchingStory, useShop } from "../store";
import { type Product, type ShopFilter, type ShopSort } from "../types";

const filters: { id: ShopFilter; label: string }[] = [
  { id: "all", label: "All Rewards" },
  { id: "affordable", label: "✓ Ready to Redeem" },
  { id: "tool", label: "Baking Tools" },
  { id: "tote", label: "Totes & Stickers" },
  { id: "wear", label: "Aprons & Apparel" },
  { id: "saved", label: "♥ Saved" },
];

const earnWays = [
  {
    art: "./art/hub-dropoff-checkin.png",
    artAlt: "Neighborhood hub drop-off door with check-in sheet and bag of loaves",
    title: "1. Bake & Donate Loaves",
    badge: "+60 to +550 pts",
    detail:
      "Bake bread for your neighbors and drop it off at your assigned Community Loaves hub. Record your donation on the hub check-in sheet and earn points as you reach milestones from your very first loaf to your 2,000th!",
  },
  {
    art: "./art/baker-cookie-tower.png",
    artAlt: "Volunteer baker holding a tall stack of golden energy cookies",
    title: "2. Energy Cookies & Special Donations",
    badge: "+50 to +90 pts",
    detail:
      "Give a little extra by baking Breader Together energy cookies or participating in seasonal donation projects, like holiday treat boxes. Follow your hub's instructions for each project to help support local food bank partners.",
  },
  {
    art: "./art/three-bakers-dancing.png",
    artAlt: "Three Community Loaves bakers in aprons celebrating together",
    title: "3. Consistency & Community",
    badge: "+70 to +200 pts",
    detail:
      "Keep your baking streak going, celebrate your first year as a volunteer baker, invite a friend to learn about Community Loaves, or take on a leadership role at your neighborhood hub.",
  },
] as const;

function passportCharacterForTier(tier: 0 | 1 | 2 | 3): { src: string; alt: string } {
  switch (tier) {
    case 0:
      return {
        src: "./art/baker-bagged-loaves.png",
        alt: "Volunteer baker celebrating with two bagged loaves",
      };
    case 1:
      return {
        src: "./art/baker-flour-cap.png",
        alt: "Volunteer baker wearing a Community Loaves cap and carrying a sack of flour",
      };
    case 2:
      return {
        src: "./art/baker-two-loaves.png",
        alt: "Volunteer baker jumping with two golden loaves overhead",
      };
    case 3:
      return {
        src: "./art/baker-crewneck-jump.png",
        alt: "2,000 Loaves Club baker jumping with a golden loaf overhead",
      };
  }
}

export function ShopView() {
  const { state, dispatch } = useShop();
  const available = availablePoints(state);
  const earned = earnedPoints(state.member);
  const goal = nextLoafGoal(state.member.loaves);
  const activeStory = matchingStory(state.member);
  const unlockedCount = products.filter((p) => p.points <= available).length;
  const earnedBadgeCount = earnedMilestones(state.member).length;
  const passportChar = passportCharacterForTier(state.member.tier);

  const filterCounts = useMemo(() => {
    const counts: Record<ShopFilter, number> = {
      all: products.length,
      affordable: 0,
      small: 0,
      tool: 0,
      tote: 0,
      wear: 0,
      saved: state.saved.length,
    };
    for (const product of products) {
      if (matches(product, "affordable", state)) counts.affordable += 1;
      if (matches(product, "small", state)) counts.small += 1;
      if (matches(product, "tool", state)) counts.tool += 1;
      if (matches(product, "tote", state)) counts.tote += 1;
      if (matches(product, "wear", state)) counts.wear += 1;
    }
    return counts;
  }, [state]);

  const visible = useMemo(() => {
    const query = state.query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      if (query && !textHit(product, query)) {
        return false;
      }
      return matches(product, state.filter, state);
    });
    return sortProducts(filtered, state.sort);
  }, [state]);

  const progress = goal ? Math.min(1, state.member.loaves / goal) : 1;

  return (
    <div className="shop">
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-pill-row">
            <span className="hero-badge">🍞 Volunteer Baker Rewards</span>
            <span className="hero-badge hero-badge-soft">
              ✓ {unlockedCount} of {products.length} rewards ready to claim
            </span>
          </div>
          <h1>
            Bake Loaves, <span className="accent-word">Claim Baker Gear.</span>
          </h1>
          <div className="title-rule" aria-hidden="true" />
          <p className="lede">
            Every donation drop-off and baking milestone adds <strong>Loaf Points</strong> to your
            account. Redeem your points for milestone rewards, or purchase fundraising items below
            for yourself or as a surprise gift for another hub baker.
          </p>

          <div className="story-switcher" role="group" aria-label="Preview baker milestone stages">
            <div className="story-switcher-head">
              <span className="story-switcher-label">✨ Preview Baker Milestone Stage:</span>
              <span className="story-switcher-hint">Click a stage to test unlocking rewards</span>
            </div>
            <div className="story-pills">
              {stories.map((story) => {
                const isActive = activeStory === story.id && state.spent === 0;
                return (
                  <button
                    key={story.id}
                    type="button"
                    aria-pressed={isActive}
                    className={`story-pill ${isActive ? "is-on" : ""}`}
                    onClick={() =>
                      dispatch({ type: "story", loaves: story.loaves, tier: story.tier })
                    }
                  >
                    <div className="story-pill-top">
                      <img
                        className="story-pill-art"
                        src={story.art}
                        width="32"
                        height="32"
                        alt=""
                        aria-hidden="true"
                      />
                      <strong>{story.label}</strong>
                    </div>
                    <span>{story.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="member-card" aria-label="Baker rewards passport">
          <div className="member-card-main">
            <div className="member-top">
              <div className="member-identity">
                <img
                  className="passport-pfp"
                  src="./sarah-avatar.jpg"
                  width="54"
                  height="54"
                  alt={MEMBER_NAME}
                />
                <div>
                  <span className="member-rank">🏅 {storyTitle(state.member.tier)}</span>
                  <strong className="member-name">{MEMBER_NAME}</strong>
                  <span className="member-hub">
                    📍 {MEMBER_HUB} · {earnedBadgeCount} of 14 badges earned
                  </span>
                </div>
              </div>
              <div className="points-box">
                <p className="points-big">
                  <span>{available.toLocaleString("en-US")}</span> pts
                </p>
                <span className="points-sub">Available to redeem</span>
              </div>
            </div>

            <div className="member-stats-row">
              <div className="stat-chip">
                <span>Loaves donated</span>
                <strong>{state.member.loaves.toLocaleString("en-US")}</strong>
              </div>
              <div className="stat-chip">
                <span>Lifetime earned</span>
                <strong>{earned.toLocaleString("en-US")} pts</strong>
              </div>
              <div className="stat-chip">
                <span>Unlocked gear</span>
                <strong>
                  {unlockedCount} / {products.length}
                </strong>
              </div>
            </div>

            <div className="member-progress-wrap">
              <div className="progress-labels">
                <span>
                  {goal
                    ? `Next milestone: ${goal.toLocaleString("en-US")} loaves`
                    : "🎉 2,000 Loaves Club reached!"}
                </span>
                <strong>
                  {goal
                    ? `${(goal - state.member.loaves).toLocaleString("en-US")} loaves to go`
                    : "All loaf goals complete"}
                </strong>
              </div>
              <div className="bar" aria-hidden="true">
                <span style={{ width: `${Math.max(8, progress * 100)}%` }} />
              </div>
            </div>

            <div className="member-actions">
              <button
                className="passport-btn"
                type="button"
                onClick={() => dispatch({ type: "view", view: "milestones" })}
              >
                <span>See all 14 ways to earn points &amp; badges</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div className="member-illustration">
            <img
              key={passportChar.src}
              src={passportChar.src}
              width="180"
              height="180"
              alt={passportChar.alt}
            />
          </div>
        </aside>
      </section>

      <section className="road-section" aria-label="How to earn points and unlock rewards">
        <div className="road-header">
          <div>
            <h2>
              How Your Baking <span className="accent-word">Unlocks Merch</span>
            </h2>
            <div className="title-rule" aria-hidden="true" />
            <p>
              Earn Loaf Points through three regular volunteer activities, then spend them as you
              reach each milestone tier.
            </p>
          </div>
          <button
            className="road-link"
            type="button"
            onClick={() => dispatch({ type: "view", view: "milestones" })}
          >
            View all 14 accomplishments →
          </button>
        </div>

        <div className="earn-ways" role="list" aria-label="Three ways to earn Loaf Points">
          {earnWays.map((way) => (
            <div key={way.title} className="earn-way-card" role="listitem">
              <div className="earn-way-art-wrap">
                <img
                  className="earn-way-art"
                  src={way.art}
                  width="92"
                  height="92"
                  alt={way.artAlt}
                />
                <span className="earn-way-badge">{way.badge}</span>
              </div>
              <strong>{way.title}</strong>
              <p>{way.detail}</p>
            </div>
          ))}
        </div>

        <div className="ladder-Subhead">
          <span>5-Tier Milestone Unlock Roadmap (click any tier to inspect its reward):</span>
        </div>

        <div className="ladder">
          {milestoneTrack.map((step, index) => {
            const reached = state.member.loaves >= step.minLoaves;
            const canRedeemStep = available >= step.rewardPoints;
            const stepProduct = getProduct(step.productId);
            const isNext =
              !reached &&
              milestoneTrack.find((candidate) => state.member.loaves < candidate.minLoaves)?.id ===
                step.id;

            return (
              <button
                key={step.id}
                type="button"
                className={`ladder-step ${reached ? "is-ready" : ""} ${isNext ? "is-next" : ""}`}
                onClick={() => dispatch({ type: "modal", id: step.productId })}
              >
                <div className="step-top">
                  <span className="step-no">
                    {reached ? "✓" : isNext ? "🎯" : step.stepNumber}
                  </span>
                  <span className="step-award">{step.pointsAwarded}</span>
                </div>
                <strong className="step-title">{step.title}</strong>
                <span className="step-req">{step.requirement}</span>

                {stepProduct && (
                  <div className="step-mini-art" style={{ background: stepProduct.swatch }}>
                    <ProductArt kind={stepProduct.art} />
                  </div>
                )}

                <div className="step-reward">
                  <span className="step-name">🎁 {step.rewardLabel}</span>
                  <span className={`step-pts ${canRedeemStep ? "is-ready" : "is-locked"}`}>
                    {canRedeemStep
                      ? `✓ ${step.rewardPoints} pts · Unlocked`
                      : `🔒 ${step.rewardPoints} pts · ${step.rewardPoints - available} pts to go`}
                  </span>
                </div>

                {index < milestoneTrack.length - 1 && (
                  <span
                    className={`ladder-arrow ${reached ? "is-ready" : ""}`}
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="catalog-header" id="catalog">
        <div className="catalog-top-row">
          <div className="catalog-headline">
            <h2>
              Redeem <span className="accent-word">Loaf Points</span> ({visible.length} items)
            </h2>
            <div className="title-rule" aria-hidden="true" />
            <p>
              Claim unlocked items with your Loaf Points balance, or click any locked item to see
              how many points you need.
            </p>
          </div>

          <label className="search">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search sticker, scraper, apron, tee, hoodie..."
              value={state.query}
              onChange={(event) => dispatch({ type: "query", query: event.target.value })}
            />
            {state.query && (
              <button
                type="button"
                className="search-clear"
                aria-label="Clear search"
                onClick={() => dispatch({ type: "query", query: "" })}
              >
                Clear
              </button>
            )}
          </label>
        </div>

        <div className="toolbar">
          <div className="chips" role="group" aria-label="Filter merch">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={state.filter === filter.id ? "is-on" : ""}
                aria-pressed={state.filter === filter.id}
                onClick={() => dispatch({ type: "filter", filter: filter.id })}
              >
                <span>{filter.label}</span>
                <span className="chip-count">{filterCounts[filter.id]}</span>
              </button>
            ))}
          </div>
          <label className="sort">
            <span>Sort by:</span>
            <select
              value={state.sort}
              onChange={(event) =>
                dispatch({ type: "sort", sort: event.target.value as ShopSort })
              }
            >
              <option value="value">Points: Low to High</option>
              <option value="value-desc">Points: High to Low</option>
              <option value="name">Name (A to Z)</option>
            </select>
          </label>
        </div>
      </section>

      {visible.length === 0 ? (
        <div className="empty">
          <img
            src="./art/baker-flour-cap.png"
            width="110"
            height="110"
            alt="Community Loaves volunteer baker waving with a bag of flour"
          />
          <p>No baker rewards match that filter or search query yet.</p>
          <button
            className="solid"
            type="button"
            onClick={() => {
              dispatch({ type: "query", query: "" });
              dispatch({ type: "filter", filter: "all" });
            }}
          >
            Reset Filters · Show All {products.length} Rewards
          </button>
        </div>
      ) : (
        <div className="grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <FundraisingSection embedded />

      <section className="community-banner" aria-label="Community Loaves Impact Story">
        <div className="community-banner-art">
          <img
            src="./art/food-bank.png"
            width="140"
            height="140"
            alt="Local Food Bank with neighbors and floating golden hearts"
          />
          <img
            src="./art/three-bakers-holiday.png"
            width="160"
            height="140"
            alt="Three Community Loaves volunteer bakers preparing cookies and loaves"
          />
        </div>
        <div className="community-banner-copy">
          <h2>
            Baking Together for <span className="accent-word">Local Food Banks</span>
          </h2>
          <div className="title-rule" aria-hidden="true" />
          <p>
            Volunteer bakers across our regional hubs bake whole-grain sandwich loaves and energy
            cookies in their home kitchens every other week for local food bank partners.
          </p>
        </div>
        <div className="community-banner-cta">
          <img
            src="./art/baker-bagged-loaves.png"
            width="115"
            height="115"
            alt="Volunteer baker holding two bagged loaves"
          />
          <button
            className="solid"
            type="button"
            onClick={() => dispatch({ type: "view", view: "milestones" })}
          >
            Explore All 14 Baker Badges →
          </button>
        </div>
      </section>
    </div>
  );
}

function textHit(product: Product, query: string): boolean {
  const haystack = [
    product.name,
    product.shortName,
    product.tagline,
    product.description,
    product.milestoneTag,
    product.category,
    product.badge ?? "",
    `${product.points} pts`,
    product.priceUsd ? `$${product.priceUsd}` : "",
  ]
    .join(" ")
    .toLowerCase();

  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  return tokens.every((token) => haystack.includes(token));
}

function matches(
  product: Product,
  filter: ShopFilter,
  state: { saved: string[]; member: { loaves: number; tier: 0 | 1 | 2 | 3 }; spent: number },
): boolean {
  const available = Math.max(0, earnedPoints(state.member) - state.spent);
  switch (filter) {
    case "all":
      return true;
    case "affordable":
      return product.redeemable && product.points <= available;
    case "saved":
      return state.saved.includes(product.id);
    case "small":
      return product.category === "sticker" || product.category === "pin";
    case "wear":
      return (
        product.category === "shirt" ||
        product.category === "sweatshirt" ||
        product.category === "apron"
      );
    case "tool":
      return product.category === "tool";
    case "tote":
      return product.category === "tote" || product.category === "sticker" || product.category === "pin";
    default: {
      const exhaustive: never = filter;
      return exhaustive;
    }
  }
}

function sortProducts(list: Product[], sort: ShopSort): Product[] {
  const copy = [...list];
  switch (sort) {
    case "value":
      return copy.sort((a, b) => a.points - b.points || products.indexOf(a) - products.indexOf(b));
    case "value-desc":
      return copy.sort((a, b) => b.points - a.points || products.indexOf(a) - products.indexOf(b));
    case "name":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default: {
      const exhaustive: never = sort;
      return exhaustive;
    }
  }
}
