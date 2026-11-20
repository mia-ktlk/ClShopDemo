import { ProductArt } from "./ProductArt";
import { ProductCard } from "./ProductCard";
import { TrashIcon } from "./Icons";
import { PROMO_CODE, products, quoteCart } from "../data";
import { availablePoints, useShop } from "../store";
import { formatPoints, formatUsd } from "../types";

export function CartView() {
  const { state, dispatch } = useShop();
  const quote = quoteCart(state.cart, state.promoApplied);
  const available = availablePoints(state);
  const short = quote.total - available;
  const cartIds = new Set(state.cart.map((line) => line.productId));
  const ideas = products.filter((product) => product.redeemable && !cartIds.has(product.id));
  const shown = state.suggestExpanded ? ideas : ideas.slice(0, 3);

  if (state.receipt) {
    return <ReceiptView />;
  }

  const hasPointsItems = quote.subtotal > 0;
  const hasUsdItems = quote.usdTotal > 0;

  let checkoutLabel = "Complete Order";
  if (short > 0) {
    checkoutLabel = `Need ${formatPoints(short)} more (Switch baker stage to test)`;
  } else if (hasPointsItems && hasUsdItems) {
    checkoutLabel = `Redeem ${formatPoints(quote.total)} & Pay ${formatUsd(quote.usdTotal)}`;
  } else if (hasUsdItems) {
    checkoutLabel = `Complete Purchase · ${formatUsd(quote.usdTotal)}`;
  } else if (hasPointsItems) {
    checkoutLabel = `Redeem ${formatPoints(quote.total)}`;
  }

  return (
    <div className="cart-page">
      <div className="cart-title-row">
        <h1>Bag &amp; Checkout</h1>
        <div className="cart-nav-links">
          <button
            className="text-btn"
            type="button"
            onClick={() => dispatch({ type: "view", view: "shop" })}
          >
            ← Back to Redeem Points
          </button>
          <button
            className="text-btn"
            type="button"
            onClick={() => dispatch({ type: "view", view: "fundraising" })}
          >
            🎁 Gift a Fellow Baker
          </button>
        </div>
      </div>

      {quote.lines.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-copy">
            <h2>Your bag is empty</h2>
            <p>
              You have <strong>{formatPoints(available)}</strong> available to redeem for milestone
              rewards, or you can purchase fundraising items and send a surprise gift to another
              hub baker.
            </p>
            <div className="empty-cart-actions">
              <button
                className="solid"
                type="button"
                onClick={() => dispatch({ type: "view", view: "shop" })}
              >
                Redeem Points
              </button>
              <button
                className="outline-btn"
                type="button"
                onClick={() => dispatch({ type: "view", view: "fundraising" })}
              >
                🎁 Send a Surprise Gift to a Baker
              </button>
            </div>
          </div>
          <img
            src="./art/baker-duo-panel.png"
            width="210"
            height="210"
            alt="Community Loaves volunteer bakers with homemade bread and energy cookies"
          />
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            <div className="cart-head" aria-hidden="true">
              <span>Item</span>
              <span>Quantity</span>
              <span>Amount</span>
              <span>Remove</span>
            </div>
            <ul className="cart-list">
              {quote.lines.map((line) => (
                <li key={line.key} className="cart-row">
                  <div className="cart-product">
                    <div className="thumb" style={{ background: line.product.swatch }}>
                      <ProductArt kind={line.product.art} />
                    </div>
                    <div>
                      <strong>{line.product.name}</strong>
                      <em>
                        {line.size ? `Size: ${line.size} · ` : ""}
                        {line.mode === "purchase"
                          ? line.gift
                            ? `🎁 Surprise Gift for ${line.gift.recipientName} (${line.gift.recipientHub})`
                            : "💛 Fundraising Purchase (Supports CL)"
                          : `🍞 Points Redemption · ${line.product.milestoneTag}`}
                      </em>
                      {line.gift && (
                        <div className="cart-gift-tag">
                          <span>
                            {line.gift.delivery === "hub"
                              ? `📍 Drop-off surprise at ${line.gift.recipientHub} check-in`
                              : `📦 Direct mail to ${line.gift.recipientName}`}
                          </span>
                          {line.gift.note && <p>“{line.gift.note}”</p>}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="stepper">
                    <button
                      type="button"
                      aria-label={`Fewer ${line.product.name}`}
                      onClick={() =>
                        dispatch({
                          type: "qty",
                          key: line.key,
                          qty: line.qty - 1,
                        })
                      }
                    >
                      -
                    </button>
                    <span>{line.qty}</span>
                    <button
                      type="button"
                      aria-label={`More ${line.product.name}`}
                      onClick={() =>
                        dispatch({
                          type: "qty",
                          key: line.key,
                          qty: line.qty + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                  <strong className="line-total">
                    {line.mode === "purchase" ? formatUsd(line.usd) : formatPoints(line.points)}
                  </strong>
                  <button
                    className="icon-btn"
                    type="button"
                    aria-label={`Remove ${line.product.name}`}
                    onClick={() => dispatch({ type: "remove", key: line.key })}
                  >
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <aside className="summary">
            <h2>Order Summary</h2>
            {hasPointsItems && (
              <>
                <form
                  className="promo"
                  onSubmit={(event) => {
                    event.preventDefault();
                    dispatch({ type: "promo-apply" });
                  }}
                >
                  <input
                    aria-label="Promotional code"
                    placeholder="Enter points code"
                    value={state.promoInput}
                    onChange={(event) =>
                      dispatch({ type: "promo-input", value: event.target.value })
                    }
                  />
                  <button type="submit">Apply</button>
                </form>
                {state.promoError && <p className="promo-msg is-bad">{state.promoError}</p>}
                {state.promoApplied && (
                  <p className="promo-msg">
                    Code <strong>{PROMO_CODE}</strong> applied (-15% pts).{" "}
                    <button type="button" onClick={() => dispatch({ type: "promo-clear" })}>
                      Remove
                    </button>
                  </p>
                )}
                {!state.promoApplied && !state.promoError && (
                  <p className="promo-hint">
                    Baker perk:{" "}
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => {
                        dispatch({ type: "promo-input", value: PROMO_CODE });
                        dispatch({ type: "promo-apply" });
                      }}
                    >
                      Apply {PROMO_CODE} (-15% pts)
                    </button>
                  </p>
                )}
              </>
            )}

            <dl className="totals">
              {hasPointsItems && (
                <>
                  <div>
                    <dt>Points subtotal</dt>
                    <dd>{formatPoints(quote.subtotal)}</dd>
                  </div>
                  {state.promoApplied && (
                    <div>
                      <dt>Baker bonus (15%)</dt>
                      <dd>-{formatPoints(quote.discount)}</dd>
                    </div>
                  )}
                  <div className="grand">
                    <dt>Points to redeem</dt>
                    <dd>{formatPoints(quote.total)}</dd>
                  </div>
                </>
              )}
              {hasUsdItems && (
                <div className="grand">
                  <dt>Fundraising &amp; Gifts ($)</dt>
                  <dd>{formatUsd(quote.usdTotal)}</dd>
                </div>
              )}
              <div>
                <dt>Hub drop-off delivery</dt>
                <dd>Free</dd>
              </div>
            </dl>
            <p className="summary-note">
              Items and surprise gifts are delivered to the selected neighborhood hub for the next
              scheduled donation check-in.
            </p>
            {hasPointsItems && available > 0 && (
              <div className="cart-wallet-meter">
                <div className="progress-labels">
                  <span>Points used</span>
                  <strong>
                    {formatPoints(quote.total)} of {formatPoints(available)}
                  </strong>
                </div>
                <div className="bar bar-sm" aria-hidden="true">
                  <span
                    style={{
                      width: `${Math.min(100, Math.max(8, Math.round((quote.total / available) * 100)))}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <button
              className="solid solid-block"
              type="button"
              disabled={(quote.total === 0 && quote.usdTotal === 0) || short > 0}
              onClick={() => dispatch({ type: "redeem" })}
            >
              {checkoutLabel}
            </button>
            <p className="balance-note">
              Points balance: <strong>{formatPoints(available)}</strong>
              {short <= 0 && quote.total > 0
                ? ` (${formatPoints(available - quote.total)} remaining after order)`
                : ""}
            </p>
          </aside>
        </div>
      )}

      <section className="suggest">
        <h2>More Baker Gear</h2>
        <div className="suggest-grid">
          {shown.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
        {ideas.length > 3 && (
          <div className="more-row">
            <span className="more-rule" />
            <button
              className="show-more"
              type="button"
              onClick={() => dispatch({ type: "suggest", expanded: !state.suggestExpanded })}
            >
              {state.suggestExpanded ? "Show fewer" : "Show more"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function ReceiptView() {
  const { state, dispatch } = useShop();
  const receipt = state.receipt;
  if (!receipt) {
    return null;
  }

  return (
    <div className="receipt">
      <div className="receipt-top-art">
        <img
          src="./art/three-bakers-dancing.png"
          width="170"
          height="140"
          alt="Three Community Loaves volunteer bakers celebrating together"
        />
        <img
          src="./art/hub-dropoff-checkin.png"
          width="130"
          height="130"
          alt="Hub drop-off check-in door with paper bag of loaves"
        />
      </div>
      <span className="hero-badge">🎉 Order Confirmed</span>
      <h1>Thank you for supporting Community Loaves!</h1>
      <p className="lede">
        {receipt.total > 0 && (
          <>
            We deducted <strong>{formatPoints(receipt.total)}</strong> from your Loaf Points
            balance ({formatPoints(receipt.remaining)} remaining).{" "}
          </>
        )}
        {receipt.usdTotal > 0 && (
          <>
            Your <strong>{formatUsd(receipt.usdTotal)}</strong> fundraising purchase helps stock
            flour and hub supplies for local food bank donations.
          </>
        )}
      </p>
      <ul>
        {receipt.lines.map((line, index) => (
          <li key={`${line.name}-${line.size ?? ""}-${index}`}>
            <div>
              <span>
                {line.qty} × {line.name}
                {line.size ? ` (Size ${line.size})` : ""}
              </span>
              {line.gift && (
                <div className="receipt-gift-ticket">
                  <strong>
                    🎁 Surprise Gift Ticket for {line.gift.recipientName} ({line.gift.recipientHub})
                  </strong>
                  <span>
                    {line.gift.delivery === "hub"
                      ? `Scheduled for surprise placement at ${line.gift.recipientHub} check-in`
                      : `Scheduled for direct shipment to ${line.gift.recipientName}`}
                  </span>
                  <p>“{line.gift.note}”</p>
                </div>
              )}
            </div>
            <strong>
              {line.mode === "purchase" ? formatUsd(line.usd) : formatPoints(line.points)}
            </strong>
          </li>
        ))}
      </ul>
      <button className="solid" type="button" onClick={() => dispatch({ type: "dismiss-receipt" })}>
        Back to Shop
      </button>
    </div>
  );
}
