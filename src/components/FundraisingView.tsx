import { useState } from "react";
import { BagIcon } from "./Icons";
import { ProductArt } from "./ProductArt";
import {
  MEMBER_HUB,
  defaultSize,
  fundraisingProducts,
  giftNotePresets,
  hubMembers,
} from "../data";
import { useShop } from "../store";
import { formatUsd, type GiftInfo, type Product } from "../types";

const hubOptions = [
  "Kirkland Hub",
  "Bellevue Hub",
  "Seattle Hub",
  "Redmond Hub",
  "Tacoma Hub",
  "Portland Hub",
] as const;

export function FundraisingSection({ embedded = false }: { embedded?: boolean }) {
  const { dispatch } = useShop();
  const items = fundraisingProducts();

  const [isGiftMode, setIsGiftMode] = useState(true);
  const [selectedMemberId, setSelectedMemberId] = useState<string>(hubMembers[0].id);
  const [customName, setCustomName] = useState("");
  const [customHub, setCustomHub] = useState<string>(MEMBER_HUB);
  const [giftNote, setGiftNote] = useState<string>(giftNotePresets[0]);
  const [delivery, setDelivery] = useState<"hub" | "ship">("hub");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [justAddedKey, setJustAddedKey] = useState<string | null>(null);

  const activePresetMember = hubMembers.find((m) => m.id === selectedMemberId);
  const recipientName =
    selectedMemberId === "custom"
      ? customName.trim() || "Fellow Baker"
      : activePresetMember?.name ?? hubMembers[0].name;
  const recipientHub =
    selectedMemberId === "custom"
      ? customHub
      : activePresetMember?.hub ?? MEMBER_HUB;

  function getSize(product: Product): string | null {
    if (!product.sizes || product.sizes.length === 0) {
      return null;
    }
    return selectedSizes[product.id] ?? defaultSize(product);
  }

  function handleBuyForSelf(product: Product) {
    const size = getSize(product);
    dispatch({
      type: "add",
      productId: product.id,
      size,
      mode: "purchase",
      gift: null,
    });
    const key = `${product.id}-self`;
    setJustAddedKey(key);
    window.setTimeout(() => setJustAddedKey((curr) => (curr === key ? null : curr)), 1300);
  }

  function handleSendGift(product: Product) {
    const size = getSize(product);
    const gift: GiftInfo = {
      recipientName,
      recipientHub,
      note: giftNote.trim() || "Thank you for baking with Community Loaves!",
      delivery,
    };
    setIsGiftMode(true);
    dispatch({
      type: "add",
      productId: product.id,
      size,
      mode: "purchase",
      gift,
    });
    const key = `${product.id}-gift`;
    setJustAddedKey(key);
    window.setTimeout(() => setJustAddedKey((curr) => (curr === key ? null : curr)), 1300);
  }

  return (
    <section
      className={`fundraising-section ${embedded ? "is-embedded" : ""}`}
      id="fundraising-shop"
      aria-label="Fundraising Shop and Baker Gifting"
    >
      <div className="fundraising-header">
        <div className="fundraising-title-col">
          <div className="hero-pill-row">
            <span className="hero-badge">💛 Direct Purchase · No Points Needed</span>
            <span className="hero-badge hero-badge-soft">
              🎁 Surprise a Hub Member at Check-In
            </span>
          </div>
          {embedded ? (
            <h2>
              Fundraising Shop &amp; <span className="accent-word">Surprise Baker Gifts</span>
            </h2>
          ) : (
            <h1>
              Fundraising Shop &amp; <span className="accent-word">Surprise Baker Gifts</span>
            </h1>
          )}
          <div className="title-rule" aria-hidden="true" />
          <p className="lede">
            Every dollar purchase goes toward flour, bread bags, and hub supplies for local food
            bank donations. Anyone can buy these items directly without spending Loaf Points or
            unlocking milestones.
          </p>
        </div>

        <div className="fundraising-art-col">
          <img
            src="./art/three-bakers-dancing.png"
            width="155"
            height="140"
            alt="Three Community Loaves bakers in aprons"
          />
          <img
            src="./art/hub-dropoff-checkin.png"
            width="125"
            height="125"
            alt="Hub drop-off check-in door with paper bag of loaves"
          />
        </div>
      </div>

      <div className="gift-builder" aria-label="Surprise Gift Configurator">
        <div className="gift-builder-top">
          <div>
            <h3>Who are you shopping for today?</h3>
            <p>
              Buy gear for yourself to support Community Loaves, or pick a fellow hub baker below to
              send them a surprise gift.
            </p>
          </div>
          <div className="gift-mode-toggle" role="group" aria-label="Purchase mode">
            <button
              type="button"
              className={`mode-pill ${isGiftMode ? "is-on" : ""}`}
              aria-pressed={isGiftMode}
              onClick={() => setIsGiftMode(true)}
            >
              🎁 Send a Surprise Gift to a Baker
            </button>
            <button
              type="button"
              className={`mode-pill ${!isGiftMode ? "is-on" : ""}`}
              aria-pressed={!isGiftMode}
              onClick={() => setIsGiftMode(false)}
            >
              🛍️ Buy for Myself (Support CL)
            </button>
          </div>
        </div>

        {isGiftMode && (
          <div className="gift-config-panel">
            <div className="gift-step">
              <span className="gift-step-label">
                1. Pick a baker from {MEMBER_HUB} (or another hub):
              </span>
              <div className="hub-member-grid" role="group" aria-label="Select recipient baker">
                {hubMembers.map((member) => {
                  const isSelected = selectedMemberId === member.id;
                  return (
                    <button
                      key={member.id}
                      type="button"
                      aria-pressed={isSelected}
                      className={`hub-member-card ${isSelected ? "is-on" : ""}`}
                      onClick={() => setSelectedMemberId(member.id)}
                    >
                      <img
                        src={member.art}
                        width="40"
                        height="40"
                        alt=""
                        aria-hidden="true"
                      />
                      <div className="hub-member-info">
                        <strong>{member.name}</strong>
                        <span className="hub-member-meta">
                          📍 {member.hub} · {member.role}
                        </span>
                        <span className="hub-member-note">{member.note}</span>
                      </div>
                    </button>
                  );
                })}

                <button
                  type="button"
                  aria-pressed={selectedMemberId === "custom"}
                  className={`hub-member-card is-custom ${selectedMemberId === "custom" ? "is-on" : ""}`}
                  onClick={() => setSelectedMemberId("custom")}
                >
                  <span className="custom-plus" aria-hidden="true">
                    +
                  </span>
                  <div className="hub-member-info">
                    <strong>Another Baker</strong>
                    <span className="hub-member-meta">Any Community Loaves Hub</span>
                    <span className="hub-member-note">Enter any baker’s name &amp; hub</span>
                  </div>
                </button>
              </div>

              {selectedMemberId === "custom" && (
                <div className="custom-baker-inputs">
                  <label>
                    <span>Baker’s Name</span>
                    <input
                      type="text"
                      placeholder="e.g. Alex Rivera"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                    />
                  </label>
                  <label>
                    <span>Their Neighborhood Hub</span>
                    <select
                      value={customHub}
                      onChange={(e) => setCustomHub(e.target.value)}
                    >
                      {hubOptions.map((hub) => (
                        <option key={hub} value={hub}>
                          {hub}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
            </div>

            <div className="gift-step-two-col">
              <div className="gift-step">
                <span className="gift-step-label">2. How should we deliver the surprise?</span>
                <div className="delivery-options" role="group" aria-label="Gift delivery method">
                  <button
                    type="button"
                    aria-pressed={delivery === "hub"}
                    className={`delivery-card ${delivery === "hub" ? "is-on" : ""}`}
                    onClick={() => setDelivery("hub")}
                  >
                    <strong>📍 Surprise at Next Hub Drop-Off (Free)</strong>
                    <span>
                      Their hub coordinator places the wrapped gift at {recipientHub} check-in.
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={delivery === "ship"}
                    className={`delivery-card ${delivery === "ship" ? "is-on" : ""}`}
                    onClick={() => setDelivery("ship")}
                  >
                    <strong>📦 Ship Directly to {recipientName}</strong>
                    <span>
                      We mail it to the address on their volunteer baker profile.
                    </span>
                  </button>
                </div>
              </div>

              <div className="gift-step">
                <span className="gift-step-label">
                  3. Add a gift note for {recipientName}:
                </span>
                <input
                  className="gift-note-input"
                  type="text"
                  aria-label="Gift note message"
                  placeholder="Write a short note for the gift tag..."
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                />
                <div className="gift-preset-chips">
                  {giftNotePresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={giftNote === preset ? "is-on" : ""}
                      onClick={() => setGiftNote(preset)}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid fundraising-grid">
        {items.map((product) => {
          const price = product.priceUsd ?? 0;
          const currentSize = getSize(product);
          const addedGift = justAddedKey === `${product.id}-gift`;
          const addedSelf = justAddedKey === `${product.id}-self`;

          return (
            <article key={product.id} className="card is-fundraising">
              <div className="card-art" style={{ background: product.swatch }}>
                <button
                  className="art-hit"
                  type="button"
                  onClick={() => dispatch({ type: "modal", id: product.id })}
                >
                  <ProductArt kind={product.art} />
                  <span className="sr-only">Inspect {product.name}</span>
                </button>

                <div className="card-badges">
                  <span className="badge badge-accent">{formatUsd(price)} · Fundraiser</span>
                  <span className="badge">🎁 Giftable</span>
                </div>
              </div>

              <div className="card-copy">
                <div className="card-title-row">
                  <button
                    className="card-name"
                    type="button"
                    onClick={() => dispatch({ type: "modal", id: product.id })}
                  >
                    {product.name}
                  </button>
                  <span className="card-pts is-usd">{formatUsd(price)}</span>
                </div>

                <p className="card-tagline">{product.tagline}</p>

                <div className="card-unlock-box is-ready">
                  <div className="unlock-headline">
                    <span className="unlock-status is-ready">
                      💛 100% Supports Community Loaves
                    </span>
                  </div>
                  <p className="unlock-note">{product.fundraisingNote}</p>
                </div>

                {product.sizes && (
                  <div className="card-inline-sizes" role="group" aria-label={`Size for ${product.name}`}>
                    <span>Size:</span>
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        className={currentSize === sz ? "is-on" : ""}
                        onClick={() =>
                          setSelectedSizes((prev) => ({ ...prev, [product.id]: sz }))
                        }
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                )}

                <div className="fundraising-actions">
                  {isGiftMode ? (
                    <>
                      <button
                        type="button"
                        className={`card-cta is-gift ${addedGift ? "is-added" : ""}`}
                        onClick={() => handleSendGift(product)}
                      >
                        {addedGift ? (
                          <>✓ Gift Added for {recipientName}!</>
                        ) : (
                          <>
                            <span>
                              🎁 Gift to {recipientName} · {formatUsd(price)}
                            </span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className={`card-size-link ${addedSelf ? "is-added" : ""}`}
                        onClick={() => handleBuyForSelf(product)}
                      >
                        {addedSelf ? "✓ Added" : "Buy for Self"}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className={`card-cta ${addedSelf ? "is-added" : ""}`}
                        onClick={() => handleBuyForSelf(product)}
                      >
                        {addedSelf ? (
                          <>✓ Added to Bag!</>
                        ) : (
                          <>
                            <BagIcon />
                            <span>Buy · {formatUsd(price)}</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className={`card-size-link ${addedGift ? "is-added" : ""}`}
                        onClick={() => handleSendGift(product)}
                      >
                        {addedGift ? "✓ Gifted!" : `🎁 Gift to ${recipientName.split(" ")[0]}`}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
