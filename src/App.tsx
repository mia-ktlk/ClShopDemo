import { BagIcon, HeartIcon } from "./components/Icons";
import { CartView } from "./components/CartView";
import { DemoPanel } from "./components/DemoPanel";
import { FundraisingSection } from "./components/FundraisingView";
import { MilestonesView } from "./components/MilestonesView";
import { Navbar } from "./components/Navbar";
import { ProductModal } from "./components/ProductModal";
import { ShopView } from "./components/ShopView";
import { StoreFooter } from "./components/StoreFooter";
import { earnedMilestones } from "./data";
import { availablePoints, ShopProvider, useShop } from "./store";
import { formatPoints, type View } from "./types";

export function App() {
  return (
    <ShopProvider>
      <Shell />
    </ShopProvider>
  );
}

function Shell() {
  const { state } = useShop();

  return (
    <div className="page">
      <Navbar />
      <main className="frame">
        <FrameTools />
        <ViewScreen view={state.view} />
        <StoreFooter />
      </main>
      <DemoPanel />
      <ProductModal />
      {state.toast && (
        <div className="toast" role="status">
          {state.toast.text}
        </div>
      )}
    </div>
  );
}

function ViewScreen({ view }: { view: View }) {
  switch (view) {
    case "shop":
      return <ShopView />;
    case "fundraising":
      return <FundraisingSection />;
    case "cart":
      return <CartView />;
    case "milestones":
      return <MilestonesView />;
    default: {
      const exhaustive: never = view;
      return exhaustive;
    }
  }
}

function FrameTools() {
  const { state, dispatch } = useShop();
  const count = state.cart.reduce((sum, line) => sum + line.qty, 0);
  const points = availablePoints(state);
  const badgesEarned = earnedMilestones(state.member).length;

  return (
    <div className="frame-tools">
      <div className="view-tabs" role="tablist" aria-label="Store sections">
        <button
          type="button"
          role="tab"
          aria-selected={state.view === "shop"}
          className={`view-tab ${state.view === "shop" ? "is-on" : ""}`}
          onClick={() => dispatch({ type: "view", view: "shop" })}
        >
          Redeem Points
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={state.view === "fundraising"}
          className={`view-tab ${state.view === "fundraising" ? "is-on" : ""}`}
          onClick={() => dispatch({ type: "view", view: "fundraising" })}
        >
          🎁 Buy &amp; Gift a Baker
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={state.view === "milestones"}
          className={`view-tab ${state.view === "milestones" ? "is-on" : ""}`}
          onClick={() => dispatch({ type: "view", view: "milestones" })}
        >
          Milestones &amp; Badges
          <span className="tab-pill">{badgesEarned}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={state.view === "cart"}
          className={`view-tab ${state.view === "cart" ? "is-on" : ""}`}
          onClick={() => dispatch({ type: "view", view: "cart" })}
        >
          Bag &amp; Checkout
          {count > 0 && <span className="tab-pill">{count}</span>}
        </button>
      </div>

      <div className="tool-cluster">
        <button
          type="button"
          className={`wallet-pill ${state.view === "milestones" ? "is-on" : ""}`}
          onClick={() => dispatch({ type: "view", view: "milestones" })}
          title="View how you earned your Loaf Points"
        >
          <span className="wallet-dot" aria-hidden="true">
            🍞
          </span>
          <span aria-live="polite">{formatPoints(points)} available</span>
        </button>
        <button
          type="button"
          className={state.filter === "saved" && state.view === "shop" ? "is-on" : ""}
          aria-label={`Saved items, ${state.saved.length}`}
          onClick={() => dispatch({ type: "filter", filter: "saved" })}
        >
          <HeartIcon filled={state.saved.length > 0} />
          <span>{state.saved.length}</span>
        </button>
        <button
          type="button"
          className={`bag-pill ${state.view === "cart" ? "is-on" : ""}`}
          aria-label={`Basket, ${count} items`}
          onClick={() => dispatch({ type: "view", view: "cart" })}
        >
          <BagIcon />
          <span>{count}</span>
        </button>
      </div>
    </div>
  );
}
