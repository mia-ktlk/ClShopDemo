import { earnedMilestones, earnedPoints, milestones, nextLoafGoal, stories } from "../data";
import { availablePoints, matchingStory, useShop } from "../store";
import { formatPoints, type Milestone } from "../types";

const milestoneProductMap: Record<string, string> = {
  first: "sticker-loaf",
  "loaves-50": "bowl-scraper",
  "loaves-100": "scraper",
  "loaves-500": "tee-honey",
  dropoffs: "bread-lame",
  "loaves-1000": "kitchen-scale",
  "loaves-2000": "hoodie-2000",
};

const milestoneArtMap: Record<string, string> = {
  first: "./art/hub-dropoff-checkin.png",
  cookies: "./art/baker-cookie-tower.png",
  "loaves-50": "./art/baker-bagged-loaves.png",
  streak: "./art/three-bakers-dancing.png",
  "loaves-100": "./art/baker-flour-cap.png",
  invited: "./art/three-bakers-dancing.png",
  holiday: "./art/three-bakers-holiday.png",
  "loaves-500": "./art/baker-two-loaves.png",
  year: "./art/baker-duo-panel.png",
  dropoffs: "./art/hub-dropoff-checkin.png",
  "loaves-1000": "./art/food-bank.png",
  "loaves-2000": "./art/baker-crewneck-jump.png",
  captain: "./art/hub-dropoff-checkin.png",
  "five-years": "./art/three-bakers-dancing.png",
};

function requirementBadge(milestone: Milestone, currentLoaves: number): string {
  if (milestone.minLoaves !== undefined) {
    if (currentLoaves >= milestone.minLoaves) {
      return `🍞 ${milestone.minLoaves.toLocaleString("en-US")} Loaves Milestone`;
    }
    const diff = milestone.minLoaves - currentLoaves;
    return `🍞 Need ${diff.toLocaleString("en-US")} more loaves (${milestone.minLoaves.toLocaleString("en-US")} total)`;
  }
  return "💛 Kitchen Consistency & Hub Support";
}

export function MilestonesView() {
  const { state, dispatch } = useShop();
  const earned = earnedMilestones(state.member);
  const ahead = milestones.filter((milestone) => !earned.some((item) => item.id === milestone.id));
  const total = earnedPoints(state.member);
  const available = availablePoints(state);
  const goal = nextLoafGoal(state.member.loaves);
  const progress = goal ? Math.min(1, state.member.loaves / goal) : 1;
  const activeStory = matchingStory(state.member);
  const aheadPoints = ahead.reduce((sum, item) => sum + item.points, 0);

  return (
    <div className="miles">
      <div className="miles-top-nav">
        <button
          className="back-pill"
          type="button"
          onClick={() => dispatch({ type: "view", view: "shop" })}
        >
          ← Back to Redeem Points
        </button>
      </div>

      <div className="miles-hero">
        <div>
          <div className="hero-pill-row">
            <span className="hero-badge">🏆 Baker Accomplishments &amp; Points Guide</span>
            <span className="hero-badge hero-badge-soft">
              {earned.length} of {milestones.length} badges earned
            </span>
          </div>
          <h1>
            Every Loaf &amp; Drop-Off <span className="accent-word">Earns Loaf Points.</span>
          </h1>
          <div className="title-rule" aria-hidden="true" />
          <p className="lede">
            Loaf Points are earned through scheduled neighborhood hub drop-offs, baking streaks,
            and loaf milestones from your first donation up to 2,000 loaves.
          </p>

          <div className="story-switcher" role="group" aria-label="Preview baker milestone stages">
            <div className="story-switcher-head">
              <span className="story-switcher-label">✨ Simulate Baker Progress:</span>
              <span className="story-switcher-hint">Switch stages to see badges unlock</span>
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

        <div className="miles-art-card">
          <div className="miles-art-duo">
            <img
              src="./art/three-bakers-holiday.png"
              width="175"
              height="165"
              alt="Three Community Loaves volunteer bakers preparing cookies and loaves"
            />
            <img
              src="./art/food-bank.png"
              width="140"
              height="140"
              alt="Local Food Bank with neighbors and floating hearts"
            />
          </div>
          <p className="miles-art-caption">
            Thank you for baking bread and energy cookies for local food bank partners.
          </p>
        </div>
      </div>

      <div className="mile-score">
        <div className="score-card is-highlight">
          <span>Available to spend</span>
          <strong>{available.toLocaleString("en-US")} pts</strong>
          <small>Ready in Rewards Shop</small>
        </div>
        <div className="score-card">
          <span>Lifetime earned</span>
          <strong>{total.toLocaleString("en-US")} pts</strong>
          <small>Across {earned.length} badges</small>
        </div>
        <div className="score-card">
          <span>Already redeemed</span>
          <strong>{state.spent.toLocaleString("en-US")} pts</strong>
          <small>Claimed for baker gear</small>
        </div>
        <div className="score-card">
          <span>Loaves donated</span>
          <strong>{state.member.loaves.toLocaleString("en-US")}</strong>
          <small>{aheadPoints > 0 ? `+${aheadPoints} pts still ahead` : "Max tier reached!"}</small>
        </div>
      </div>

      <div className="goal-line">
        <div className="progress-labels">
          <span>
            {goal
              ? `Next loaf milestone: ${goal.toLocaleString("en-US")} loaves`
              : "All loaf milestones unlocked! 🎉"}
          </span>
          <strong>
            {goal
              ? `${state.member.loaves.toLocaleString("en-US")} / ${goal.toLocaleString("en-US")} loaves (${(goal - state.member.loaves).toLocaleString("en-US")} to go)`
              : `${state.member.loaves.toLocaleString("en-US")} loaves donated`}
          </strong>
        </div>
        <div className="bar" aria-hidden="true">
          <span style={{ width: `${Math.max(6, progress * 100)}%` }} />
        </div>
      </div>

      {ahead.length > 0 && (
        <section className="mile-section">
          <div className="mile-section-head">
            <div>
              <h2>
                Next Accomplishments to Earn +{formatPoints(aheadPoints)} ({ahead.length})
              </h2>
            </div>
          </div>
          <ul className="mile-list ahead">
            {ahead.map((milestone) => {
              const linkedProduct = milestoneProductMap[milestone.id];
              const artSrc = milestoneArtMap[milestone.id] ?? "./art/baker-two-loaves.png";
              return (
                <li key={milestone.id} className={milestone.celebrate ? "celebrate" : ""}>
                  <div className="mile-icon-col">
                    <span className="check is-empty" aria-hidden="true">
                      🔒
                    </span>
                    <img
                      className="mile-char-thumb"
                      src={artSrc}
                      width="48"
                      height="48"
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mile-item-body">
                    <div className="mile-item-tags">
                      <strong>{milestone.title}</strong>
                      <span className="mile-req-tag">
                        {requirementBadge(milestone, state.member.loaves)}
                      </span>
                    </div>
                    <p>{milestone.detail}</p>
                    {milestone.rewardHint && (
                      <div className="mile-reward-row">
                        <span className="reward-hint">🎁 {milestone.rewardHint}</span>
                        {linkedProduct && (
                          <button
                            className="text-btn"
                            type="button"
                            onClick={() => dispatch({ type: "modal", id: linkedProduct })}
                          >
                            Preview reward →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <b className="mile-pts-pill is-ahead">+{formatPoints(milestone.points)}</b>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mile-section">
        <div className="mile-section-head">
          <div>
            <h2>Earned Badges ({earned.length})</h2>
          </div>
          <button
            className="solid"
            type="button"
            onClick={() => dispatch({ type: "view", view: "shop" })}
          >
            Redeem {formatPoints(available)} →
          </button>
        </div>
        <ul className="mile-list">
          {earned.map((milestone) => {
            const linkedProduct = milestoneProductMap[milestone.id];
            const artSrc = milestoneArtMap[milestone.id] ?? "./art/baker-two-loaves.png";
            return (
              <li key={milestone.id}>
                <div className="mile-icon-col">
                  <span className="check" aria-hidden="true">
                    ✓
                  </span>
                  <img
                    className="mile-char-thumb"
                    src={artSrc}
                    width="48"
                    height="48"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                <div className="mile-item-body">
                  <div className="mile-item-tags">
                    <strong>{milestone.title}</strong>
                    <span className="mile-req-tag is-earned">✓ Earned</span>
                  </div>
                  <p>{milestone.detail}</p>
                  {milestone.rewardHint && (
                    <div className="mile-reward-row">
                      <span className="reward-hint">🎁 {milestone.rewardHint}</span>
                      {linkedProduct && (
                        <button
                          className="text-btn"
                          type="button"
                          onClick={() => dispatch({ type: "modal", id: linkedProduct })}
                        >
                          View reward →
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <b className="mile-pts-pill">+{formatPoints(milestone.points)}</b>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
