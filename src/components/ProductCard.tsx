import { useState } from "react";
import { MEMBER_NAME, defaultSize } from "../data";
import { BagIcon, HeartIcon } from "./Icons";
import { ProductArt } from "./ProductArt";
import { availablePoints, useShop } from "../store";
import { formatPoints, type Product } from "../types";

function getEncouragingMessage(product: Product, pct: number, deficit: number): string {
  const firstName = MEMBER_NAME.split(" ")[0];
  if (pct >= 65) {
    return `Almost there, ${firstName}. You are ${pct}% of the way to this reward, with ${formatPoints(deficit)} left to earn from upcoming drop-offs.`;
  }
  if (pct >= 35) {
    return `Good progress, ${firstName}. Keep up your regular baking schedule to reach the ${product.milestoneTag} tier.`;
  }
  return `Keep going, ${firstName}. Every loaf or cookie batch you check in at your hub adds points toward the ${product.shortName}.`;
}

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { state, dispatch } = useShop();
  const [justAdded, setJustAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(() => defaultSize(product));
  const saved = state.saved.includes(product.id);
  const available = availablePoints(state);
  const canAfford = available >= product.points;
  const deficit = Math.max(0, product.points - available);
  const pct = Math.min(100, Math.round((available / product.points) * 100));

  function openModal() {
    dispatch({ type: "modal", id: product.id });
  }

  function handlePrimaryAction() {
    if (!canAfford) {
      openModal();
      return;
    }
    dispatch({
      type: "add",
      productId: product.id,
      size: selectedSize,
      mode: "points",
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article
      className={`card ${compact ? "compact" : ""} ${canAfford ? "is-unlocked" : "is-locked"}`}
    >
      <div className="card-art" style={{ background: product.swatch }}>
        <button className="art-hit" type="button" onClick={openModal}>
          <ProductArt kind={product.art} />
          <span className="sr-only">View details and unlock info for {product.name}</span>
        </button>

        <div className="card-badges">
          {!canAfford ? (
            <span className="badge badge-locked" aria-label="Locked reward">
              🔒 Locked
            </span>
          ) : (
            <span className="badge badge-unlocked">✓ Unlocked</span>
          )}
          <span className="badge badge-milestone">🏅 {product.milestoneTag}</span>
          {product.badge && canAfford && <span className="badge badge-accent">★ {product.badge}</span>}
        </div>

        {!canAfford && (
          <div className="locked-corner-pill" aria-hidden="true">
            🔒 {formatPoints(deficit)} to go
          </div>
        )}

        <button
          className={`heart ${saved ? "is-on" : ""}`}
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
          onClick={() => dispatch({ type: "save", id: product.id })}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      <div className="card-copy">
        <div className="card-title-row">
          <button className="card-name" type="button" onClick={openModal}>
            {product.name}
          </button>
          <span className={`card-pts ${canAfford ? "is-ready" : "is-short"}`}>
            {!canAfford && "🔒 "}
            {formatPoints(product.points)}
          </span>
        </div>

        <p className="card-tagline">{product.tagline}</p>

        <div className={`card-unlock-box ${canAfford ? "is-ready" : "is-short"}`}>
          {canAfford ? (
            <>
              <div className="unlock-headline">
                <span className="unlock-status is-ready">✓ Ready to Redeem</span>
              </div>
              <p className="unlock-note">{product.unlockNote}</p>
            </>
          ) : (
            <>
              <div className="unlock-headline">
                <span className="unlock-status is-short">
                  🔒 Locked · Need {formatPoints(deficit)} more
                </span>
                <span className="unlock-pct">{pct}% there</span>
              </div>
              <div className="bar bar-sm" aria-hidden="true">
                <span style={{ width: `${Math.max(10, pct)}%` }} />
              </div>
              <p className="encourage-msg">
                💛 {getEncouragingMessage(product, pct, deficit)}
              </p>
            </>
          )}
        </div>

        {product.sizes && (
          <div
            className="card-inline-sizes"
            role="group"
            aria-label={`Select size for ${product.name}`}
          >
            <span className="size-row-label">Size:</span>
            <div className="size-pill-group">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  aria-pressed={selectedSize === sz}
                  className={selectedSize === sz ? "is-on" : ""}
                  onClick={() => setSelectedSize(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="card-footer">
          <button
            className={`card-cta ${canAfford ? "is-ready" : "is-locked"} ${justAdded ? "is-added" : ""}`}
            type="button"
            onClick={handlePrimaryAction}
          >
            {justAdded ? (
              <>✓ Added to Bag!</>
            ) : canAfford ? (
              <>
                <BagIcon />
                <span>Redeem · {formatPoints(product.points)}</span>
              </>
            ) : (
              <>
                <span>🔒 How to Unlock ({formatPoints(deficit)} to go) →</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
