import { useEffect, useId, useState } from "react";
import { ChevronIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from "./Icons";
import { MEMBER_HUB, MEMBER_NAME } from "../data";
import { availablePoints, useShop } from "../store";
import { formatPoints } from "../types";

type MenuId = "about" | "partners" | "news" | "avatar";

type NavItem = { label: string; href: string };

const aboutItems: NavItem[] = [
  { label: "About", href: "https://communityloaves.org/about/" },
  { label: "Our Team", href: "https://communityloaves.org/our-team/" },
  { label: "How It Works", href: "https://communityloaves.org/how-it-works/" },
  { label: "Locations", href: "https://communityloaves.org/view-locations/" },
  { label: "Baker Journey", href: "https://communityloaves.org/#getting-started" },
];

const partnerItems: NavItem[] = [
  {
    label: "Food Bank Partners",
    href: "https://communityloaves.org/our-food-bank-partners-2/",
  },
  {
    label: "Donation Schedule",
    href: "https://communityloaves.org/events/category/food-bank-calendar/list/",
  },
];

const newsItems: NavItem[] = [
  { label: "Newsroom", href: "https://communityloaves.org/newsroom/" },
  { label: "Volunteer Program News", href: "https://communityloaves.org/program-news/" },
  { label: "Baker Stories", href: "https://communityloaves.org/baker-stories/" },
];

export function Navbar() {
  const { state, dispatch } = useShop();
  const [open, setOpen] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const points = availablePoints(state);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }
      const bar = document.getElementById("site-bar");
      if (bar && !bar.contains(target)) {
        setOpen(null);
        setMobileOpen(false);
      }
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function toggle(id: MenuId) {
    setOpen((current) => (current === id ? null : id));
  }

  function goShop() {
    setOpen(null);
    setMobileOpen(false);
    dispatch({ type: "view", view: "shop" });
  }

  return (
    <header className={`topbar ${mobileOpen ? "menu-open" : ""}`} id="site-bar">
      <a className="brand" href="https://communityloaves.org/" target="_blank" rel="noreferrer">
        <img src="./logo.png" width="96" height="53" alt="Community Loaves" />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((value) => !value)}
      >
        Menu
      </button>

      <nav className="menu" aria-label="Main">
        <Dropdown id="about" label="About" open={open === "about"} onToggle={toggle} items={aboutItems} />
        <a className="nav-link" href="https://communityloaves.org/#getting-started" target="_blank" rel="noreferrer">
          Bake With Us ♥
        </a>
        <a className="nav-link" href="https://communityloaves.org/faqs/" target="_blank" rel="noreferrer">
          FAQs
        </a>
        <Dropdown
          id="partners"
          label="Food Bank Partners"
          open={open === "partners"}
          onToggle={toggle}
          items={partnerItems}
        />
        <Dropdown id="news" label="Newsroom" open={open === "news"} onToggle={toggle} items={newsItems} />
        <a className="nav-link" href="https://communityloaves.org/our-2026-goals/" target="_blank" rel="noreferrer">
          Goals
        </a>
        <button className="nav-link is-current" type="button" aria-current="page" onClick={goShop}>
          Shop
        </button>
        <a
          className="nav-link"
          href="https://communityloaves.org/support-our-work/donate/"
          target="_blank"
          rel="noreferrer"
        >
          Donate
        </a>
      </nav>

      <div className="nav-tools">
        <a
          className="social"
          href="https://www.instagram.com/community_loaves/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
        <a
          className="social"
          href="https://www.facebook.com/CommunityLoaves.org"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          className="social"
          href="https://www.youtube.com/watch?v=RRlRRGOqUyI&ab_channel=KatherineKehrli"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
        >
          <YouTubeIcon />
        </a>
        <a className="dashboard" href="https://communityloaves.org/dashboard/" target="_blank" rel="noreferrer">
          Dashboard
        </a>
        <div className={`avatar-wrap ${open === "avatar" ? "open" : ""}`}>
          <button
            className="avatar"
            type="button"
            aria-label={`${MEMBER_NAME}, member menu`}
            aria-expanded={open === "avatar"}
            onClick={() => toggle("avatar")}
          >
            <img
              className="avatar-img"
              src="./sarah-avatar.jpg"
              width="42"
              height="42"
              alt={MEMBER_NAME}
            />
          </button>
          {open === "avatar" && (
            <div className="avatar-card">
              <div className="avatar-card-head">
                <img
                  className="avatar-card-img"
                  src="./sarah-avatar.jpg"
                  width="48"
                  height="48"
                  alt={MEMBER_NAME}
                />
                <div>
                  <strong>{MEMBER_NAME}</strong>
                  <span>
                    {MEMBER_HUB} · {formatPoints(points)}
                  </span>
                </div>
              </div>
              <p>Signed in as a Community Loaves volunteer baker at {MEMBER_HUB}.</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Dropdown({
  id,
  label,
  open,
  onToggle,
  items,
}: {
  id: MenuId;
  label: string;
  open: boolean;
  onToggle: (id: MenuId) => void;
  items: readonly NavItem[];
}) {
  const menuId = useId();
  return (
    <div className={`drop ${open ? "open" : ""}`}>
      <button
        className="nav-link"
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => onToggle(id)}
      >
        {label}
        <ChevronIcon className="chevron" />
      </button>
      {open && (
        <div className="drop-menu" id={menuId} role="menu">
          {items.map((item) => (
            <a key={item.href + item.label} href={item.href} role="menuitem" target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}


