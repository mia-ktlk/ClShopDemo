import { useEffect, useRef, useState } from "react";
import { BagIcon, CloseIcon } from "./Icons";
import { ProductArt } from "./ProductArt";
import {
  MEMBER_NAME,
  defaultSize,
  earnedMilestones,
  getProduct,
  giftNotePresets,
  hubMembers,
  milestones,
} from "../data";
import { availablePoints, useShop } from "../store";
import { categoryLabel, formatPoints, formatUsd } from "../types";

export function ProductModal() {
  const { state, dispatch } = useShop();
  const ref = useRef<HTMLDialogElement>(null);
  const product = state.modalId ? getProduct(state.modalId) : undefined;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) {
      return;
    }
    if (product && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    }
    if (!product && dialog.open) {
      dialog.close();
    }
  }, [product]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={product ? product.name : "Product"}
      onClose={() => dispatch({ type: "modal", id: null })}
      onClick={(event) => {
        if (event.target === ref.current) {
          dispatch({ type: "modal", id: null });
        }
      }}
    >
      {product && <ModalBody key={product.id} productId={product.id} />}
    </dialog>
  );
}

function ModalBody({ productId }: { productId: string }) {
  const { dispatch, state } = useShop();
  const product = getProduct(productId);
  const [size, setSize] = useState(() => (product ? defaultSize(product) : null));
  const [giftRecipientId, setGiftRecipientId] = useState(hubMembers[0].id);
  const available = availablePoints(state);

  if (!product) {
    return null;
  }

  const gap = Math.max(0, product.points - available);
  const canAfford = gap === 0;
  const pct = Math.min(100, Math.round((available / product.points) * 100));
  const earnedIds = new Set(earnedMilestones(state.member).map((m) => m.id));
  const nextMilestones = milestones.filter((m) => !earnedIds.has(m.id)).slice(0, 3);
  const recipient = hubMembers.find((m) => m.id === giftRecipientId) ?? hubMembers[0];

  return (
    <div className="modal-body">
      <div className="modal-art" style={{ background: product.swatch }}>
        <div className="modal-art-badge">🏅 {product.milestoneTag}</div>
        <ProductArt kind={product.art} />
      </div>
      <div className="modal-copy">
        <button
          className="modal-close"
          type="button"
          aria-label="Close product dialog"
          onClick={() => dispatch({ type: "modal", id: null })}
        >
          <CloseIcon />
        </button>

        <div className="modal-tags">
          {!canAfford ? (
            <span className="hero-badge hero-badge-locked">🔒 Locked Reward</span>
          ) : (
            <span className="hero-badge hero-badge-soft">✓ Unlocked</span>
          )}
          <span className="hero-badge">🏅 {product.milestoneTag}</span>
          <span className="hero-badge hero-badge-gray">{categoryLabel(product.category)}</span>
          {product.badge && <span className="hero-badge hero-badge-honey">★ {product.badge}</span>}
        </div>

        <h2>{product.name}</h2>
        <div className="modal-price-row">
          <span className="modal-points">{formatPoints(product.points)}</span>
          {product.priceUsd !== undefined && (
            <span className="modal-usd-pill">
              or {formatUsd(product.priceUsd)} fundraiser purchase
            </span>
          )}
        </div>
        <p className="modal-desc">{product.description}</p>

        {canAfford ? (
          <div className="modal-unlock-card is-ready">
            <div className="modal-unlock-head">
              <strong>✓ Ready to Redeem with Loaf Points</strong>
              <span>{product.unlockNote}</span>
            </div>
          </div>
        ) : (
          <div className="modal-unlock-card is-locked">
            <div className="modal-unlock-head">
              <strong>🔒 Locked · Need {formatPoints(gap)} more</strong>
              <span>
                {formatPoints(available)} / {formatPoints(product.points)} ({pct}%)
              </span>
            </div>
            <div className="bar" aria-hidden="true">
              <span style={{ width: `${Math.max(8, pct)}%` }} />
            </div>
            <p className="encourage-msg">
              💛 Keep going, {MEMBER_NAME.split(" ")[0]}. You are {pct}% of the way to this
              reward. Every loaf and cookie batch you drop off at your hub adds points toward this tier.
            </p>

            {nextMilestones.length > 0 && (
              <div className="modal-next-steps">
                <span className="modal-next-title">Next accomplishments to earn these points:</span>
                <ul>
                  {nextMilestones.map((m) => (
                    <li key={m.id}>
                      <span>🍞 {m.title}</span>
                      <strong>+{formatPoints(m.points)}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {product.sizes && (
          <div className="sizes-wrap">
            <span className="sizes-label">Choose your size:</span>
            <div className="sizes" role="group" aria-label="Size">
              {product.sizes.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={size === option ? "is-on" : ""}
                  aria-pressed={size === option}
                  onClick={() => setSize(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {canAfford ? (
          <div className="modal-primary-action">
            <button
              className="solid solid-block modal-cta"
              type="button"
              onClick={() => {
                dispatch({ type: "add", productId: product.id, size, mode: "points" });
                dispatch({ type: "modal", id: null });
              }}
            >
              <BagIcon />
              <span>Redeem with Points · {formatPoints(product.points)}</span>
            </button>
            <p className="balance-note">
              ✓ You have <strong>{formatPoints(available)}</strong> available (
              <strong>{formatPoints(available - product.points)}</strong> remaining after redeeming).
            </p>
          </div>
        ) : (
          <div className="modal-locked-actions">
            <button
              className="solid solid-block"
              type="button"
              onClick={() => {
                dispatch({ type: "modal", id: null });
                dispatch({ type: "view", view: "milestones" });
              }}
            >
              View All Ways to Earn Points →
            </button>
            <button
              className="outline-btn solid-block"
              type="button"
              onClick={() => {
                dispatch({ type: "story", loaves: 2040, tier: 3 });
              }}
            >
              ✨ Preview as 2,000 Loaves Club Member (2,100 pts)
            </button>
          </div>
        )}

        {product.priceUsd !== undefined && (
          <div className="modal-fundraising-box">
            <span className="modal-next-title">
              💛 Or buy with dollars ({formatUsd(product.priceUsd)}) to support Community Loaves:
            </span>
            <div className="modal-gift-row">
              <select
                aria-label="Choose a hub baker to gift"
                value={giftRecipientId}
                onChange={(e) => setGiftRecipientId(e.target.value)}
              >
                {hubMembers.map((m) => (
                  <option key={m.id} value={m.id}>
                    🎁 Surprise Gift for {m.name} ({m.hub})
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="outline-btn"
                onClick={() => {
                  dispatch({
                    type: "add",
                    productId: product.id,
                    size,
                    mode: "purchase",
                    gift: {
                      recipientName: recipient.name,
                      recipientHub: recipient.hub,
                      note: giftNotePresets[0],
                      delivery: "hub",
                    },
                  });
                  dispatch({ type: "modal", id: null });
                }}
              >
                Send Gift · {formatUsd(product.priceUsd)}
              </button>
              <button
                type="button"
                className="outline-btn"
                onClick={() => {
                  dispatch({
                    type: "add",
                    productId: product.id,
                    size,
                    mode: "purchase",
                    gift: null,
                  });
                  dispatch({ type: "modal", id: null });
                }}
              >
                Buy for Self · {formatUsd(product.priceUsd)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
