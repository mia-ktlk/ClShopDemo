import { useState } from "react";
import { stories } from "../data";
import { matchingStory, useShop } from "../store";
import type { Palette, Typeface } from "../types";

const palettes: { id: Palette; label: string }[] = [
  { id: "loaf", label: "Terracotta" },
  { id: "teal", label: "Baker Teal" },
  { id: "berry", label: "Berry Jam" },
  { id: "sage", label: "Herb Sage" },
];

const typefaces: { id: Typeface; label: string }[] = [
  { id: "montserrat", label: "Montserrat" },
  { id: "fraunces", label: "Fraunces" },
  { id: "lora", label: "Lora" },
];

export function DemoPanel() {
  const { state, dispatch } = useShop();
  const [open, setOpen] = useState(false);
  const current = matchingStory(state.member);

  return (
    <aside className={`demo ${open ? "open" : ""}`}>
      <button
        className="demo-toggle"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close Controls" : "🎨 Theme & Demo"}
      </button>
      {open && (
        <div className="demo-card">
          <p>
            Presenter controls for client demo. Easily test different volunteer milestone tiers or
            swap theme colors and fonts (defined in <code>src/theme.css</code>).
          </p>
          <h2>Baker Milestone Stage</h2>
          <div className="demo-options">
            {stories.map((story) => (
              <button
                key={story.id}
                type="button"
                className={current === story.id && state.spent === 0 ? "is-on" : ""}
                onClick={() => dispatch({ type: "story", loaves: story.loaves, tier: story.tier })}
              >
                <strong>{story.label}</strong>
                <span>{story.detail}</span>
              </button>
            ))}
          </div>
          <h2>Theme Colors</h2>
          <div className="demo-pills">
            {palettes.map((palette) => (
              <button
                key={palette.id}
                type="button"
                className={state.palette === palette.id ? "is-on" : ""}
                onClick={() => dispatch({ type: "palette", palette: palette.id })}
              >
                {palette.label}
              </button>
            ))}
          </div>
          <h2>Store Font</h2>
          <div className="demo-pills">
            {typefaces.map((typeface) => (
              <button
                key={typeface.id}
                type="button"
                className={state.typeface === typeface.id ? "is-on" : ""}
                onClick={() => dispatch({ type: "typeface", typeface: typeface.id })}
              >
                {typeface.label}
              </button>
            ))}
          </div>
          <button className="text-btn" type="button" onClick={() => dispatch({ type: "reset" })}>
            Reset demo state
          </button>
        </div>
      )}
    </aside>
  );
}
