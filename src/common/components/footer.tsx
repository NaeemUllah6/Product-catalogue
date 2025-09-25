import Link from "next/link";

type FooterLink = { label: string; href: string };

type FooterProps = {
  links?: FooterLink[];
  brandName?: string;
};

export default function Footer({
  links = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/" },
    { label: "About", href: "/about-us" },
  ],
  brandName = process.env.NEXT_PUBLIC_SITE_NAME || "Product Catalogue",
}: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
          <div className="text-center md:text-left">
            <div className="text-lg text-black font-semibold">{brandName}</div>
            <div className="text-sm text-neutral-600">© {year} All rights reserved.</div>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-700">
            {links.map((l, index) => (
              <Link key={index} href={l.href} className="hover:text-black">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}


