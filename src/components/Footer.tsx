
"use client";

import { Globe } from "lucide-react";

const footerLinks = {
  resources: [
    { label: "Gift Cards", href: "#" },
    { label: "Find a Store", href: "#" },
    { label: "Membership", href: "#" },
    { label: "Nike Journal", href: "#" },
    { label: "Site Feedback", href: "#" },
  ],
  help: [
    { label: "Get Help", href: "#" },
    { label: "Order Status", href: "#" },
    { label: "Shipping and Delivery", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Order Cancellation", href: "#" },
    { label: "Payment Options", href: "#" },
    { label: "Gift Card Balance", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  company: [
    { label: "About Nike", href: "#" },
    { label: "News", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Investors", href: "#" },
    { label: "Purpose", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
  promotions: [
    { label: "Student", href: "#" },
    { label: "Military", href: "#" },
    { label: "Teacher", href: "#" },
    { label: "First Responders & Medical Professionals", href: "#" },
    { label: "Birthday", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1920px] mx-auto px-12 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Promotions & Discounts */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4">Promotions & Discounts</h3>
            <ul className="space-y-3">
              {footerLinks.promotions.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Country selector */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex lg:justify-end">
            <button type="button" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
              United States
            </button>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <span>&copy; 2026 Nike, Inc. All Rights Reserved</span>
              <a href="#" className="hover:text-white transition-colors">Guides</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Sale</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Nike Privacy Policy</a>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                Your Privacy Choices
              </a>
              <a href="#" className="hover:text-white transition-colors">CA Supply Chains Act</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

