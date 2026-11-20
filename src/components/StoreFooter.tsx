const aboutLinks = [
  { label: "Home", href: "https://communityloaves.org/" },
  { label: "Our Team", href: "https://communityloaves.org/our-team" },
  { label: "Nutrition Facts", href: "https://communityloaves.org/nutrition-facts" },
  { label: "Privacy Policy", href: "https://communityloaves.org/privacy-policy" },
] as const;

const joinLinks = [
  { label: "View Locations", href: "https://communityloaves.org/view-locations" },
  { label: "Partner With Us", href: "https://communityloaves.org/partner-benefits" },
  { label: "Info Session", href: "https://communityloaves.org/#getting-started" },
] as const;

const supportLinks = [
  { label: "Contact Us", href: "https://communityloaves.org/contact-us/" },
  { label: "FAQs", href: "https://communityloaves.org/faqs" },
  { label: "Donate", href: "https://communityloaves.org/support-our-work/donate/" },
  { label: "Safety Practices", href: "https://communityloaves.org/safety-practices/" },
] as const;

export function StoreFooter() {
  return (
    <footer className="store-footer">
      <img
        className="footer-art"
        src="./footer-art.png"
        width="325"
        height="245"
        alt="Community Loaves bakers. Breader Together."
      />
      <div className="footer-main">
        <div className="footer-headline">
          <p>Bake with us!</p>
          <a href="https://communityloaves.org/#getting-started" target="_blank" rel="noreferrer">
            Attend an info session
          </a>
        </div>
        <div className="footer-cols">
          <FooterColumn title="About" links={aboutLinks} />
          <FooterColumn title="Join Us" links={joinLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>
        <hr />
        <div className="footer-meta">
          <div>
            <p>8730 122nd Avenue NE, Kirkland, WA 98033</p>
            <p>Copyright Community Loaves 2026</p>
          </div>
          <a href="https://communityloaves.org/community-loaves-990-filings/" target="_blank" rel="noreferrer">
            EIN: 32-0619621
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
