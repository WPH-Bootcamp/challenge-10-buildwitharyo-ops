import Link from "next/link";

import { Container } from "@/components/shared/container";
import { FoodyLogo } from "@/components/shared/foody-logo";
import { SOCIAL_LINKS } from "@/components/shared/social-icons";

const exploreLinks = [
  "All Food",
  "Nearby",
  "Discount",
  "Best Seller",
  "Delivery",
  "Lunch",
];

const helpLinks = [
  "How to Order",
  "Payment Methods",
  "Track My Order",
  "FAQ",
  "Contact Us",
];

export function Footer() {
  return (
    <footer className="mt-16 bg-neutral-950 text-neutral-300">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-5">
          <FoodyLogo
            href="/"
            textClassName="text-white"
            markClassName="text-primary"
          />
          <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
            Enjoy homemade flavors &amp; chef&apos;s signature dishes, freshly
            prepared every day. Order online or visit our nearest branch.
          </p>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">
              Follow on Social Media
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="grid size-10 place-items-center rounded-full border border-neutral-700 text-white transition-colors hover:border-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <FooterColumn title="Explore" links={exploreLinks} />
        <FooterColumn title="Help" links={helpLinks} />
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="space-y-4">
      <p className="font-semibold text-white">{title}</p>
      <ul className="space-y-3 text-sm">
        {links.map((label) => (
          <li key={label}>
            <Link
              href="/resto"
              className="text-neutral-400 transition-colors hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
