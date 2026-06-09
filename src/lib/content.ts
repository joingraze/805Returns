/**
 * Single source of truth for all marketing copy + pricing.
 *
 * This is a VALIDATION site: the whole point is to learn whether people will
 * pay a monthly subscription. Tweak prices and copy here and the entire page
 * updates. Every plan a visitor picks is recorded in D1 so you can see which
 * price wins.
 */

export const brand = {
  name: "805Returns",
  domain: "805Returns.com",
  region: "California's Central Coast",
  areaCode: "805",
  email: "hello@805returns.com",
  phone: "(805) 000-0000",
};

export const hero = {
  eyebrow: "Now serving the 805 — Santa Barbara to San Luis Obispo",
  headline: "Never deal with an Amazon return again.",
  subhead:
    "We're your local 805 logistics crew. Leave your returns at the door — we pack them, print the labels, and drop them at UPS, FedEx, or the Amazon counter. You just get your refund.",
  primaryCta: "Get early access",
  secondaryCta: "See pricing",
  // Quantified benefit, ReturnQueen-style.
  proofStat: "Save 4+ hours a month",
  proofStatSub: "no boxes, no labels, no lines",
};

export const trustLogos = [
  "Amazon",
  "UPS",
  "FedEx",
  "Target",
  "Kohl's",
  "Zara",
];

export const painPoints = {
  heading: "Returns are the worst part of online shopping",
  sub: "You already paid for the stuff you're sending back. The least it could do is not waste your Saturday.",
  items: [
    {
      icon: "box",
      title: "Hunting for a box",
      body: "Digging through the garage for packaging that's the right size and not already shredded.",
    },
    {
      icon: "printer",
      title: "Printing a label",
      body: "Out of ink. Out of paper. Wrong printer. The QR code that won't scan at the counter.",
    },
    {
      icon: "clock",
      title: "Waiting in the UPS line",
      body: "Driving across town to stand behind eight people during the only hour you had free.",
    },
    {
      icon: "calendar",
      title: "Missing the window",
      body: "That pile by the door that sits there until the 30-day return window quietly closes.",
    },
  ],
};

export const howItWorks = {
  heading: "Three steps. We do the other ninety.",
  steps: [
    {
      step: "01",
      title: "Schedule a pickup",
      body: "Tell us what you're returning and pick a day. Forward the Amazon confirmation email or just snap a photo — we'll sort out the labels.",
    },
    {
      step: "02",
      title: "Leave it at your door",
      body: "No box, no tape, no label needed. Set the items out and your local 805 driver grabs them — contact-free.",
    },
    {
      step: "03",
      title: "Get your refund",
      body: "We pack everything properly and hand it off to UPS, FedEx, or Amazon. You get a confirmation, then your money back.",
    },
  ],
};

/**
 * The plans being validated. `id` is what gets written to D1 when a visitor
 * says they'd choose it — so you can measure which price point wins.
 */
export type Plan = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: string;
};

export const plans: Plan[] = [
  {
    id: "per_pickup",
    name: "Pay Per Pickup",
    price: "$9.99",
    cadence: "/ pickup",
    blurb: "Returns sneak up on you a few times a year. No commitment.",
    features: [
      "One doorstep pickup",
      "As many items as fit in one trip",
      "We pack + ship to any retailer",
      "Refund tracking to your inbox",
    ],
    cta: "I'd pay per pickup",
  },
  {
    id: "unlimited_monthly",
    name: "Unlimited Monthly",
    price: "$19",
    cadence: "/ month",
    blurb: "You shop online a lot. Stop thinking about returns entirely.",
    features: [
      "Unlimited doorstep pickups",
      "Priority same-week scheduling",
      "We pack + ship to any retailer",
      "Refund tracking + reminders",
      "Cancel anytime",
    ],
    highlighted: true,
    badge: "Most popular",
    cta: "I'd subscribe monthly",
  },
  {
    id: "annual",
    name: "Annual",
    price: "$99",
    cadence: "/ year",
    blurb: "Unlimited pickups, billed yearly. Works out to about $8.25/mo.",
    features: [
      "Everything in Unlimited",
      "Two months free vs. monthly",
      "Locked-in founding-member rate",
      "Priority pickup windows",
    ],
    badge: "Best value",
    cta: "I'd pay annually",
  },
];

export const guarantee = {
  heading: "How the money works",
  points: [
    {
      title: "We don't touch your refund",
      body: "Your refund comes straight from the retailer to your original payment method — exactly like it would if you'd shipped it yourself. We just make sure it gets back in time.",
    },
    {
      title: "Founding-member pricing, locked",
      body: "Join the waitlist now and you keep the launch price for as long as you stay subscribed — even when prices go up.",
    },
    {
      title: "Local crew, not a faceless app",
      body: "We're based right here on the Central Coast. Same-week pickups, real people, and routes that keep everything local.",
    },
  ],
};

export const faqs = [
  {
    q: "Is 805Returns live yet?",
    a: "We're validating demand before we launch. Join the waitlist and you'll be first to book a pickup — at locked-in founding-member pricing.",
  },
  {
    q: "Which returns can you handle?",
    a: "Amazon first, but also UPS, FedEx, USPS, Target, Kohl's, Zara — basically anything with a mail-in or drop-off return. If it has a return label, we can handle it.",
  },
  {
    q: "Do I need a box or a printed label?",
    a: "Nope. That's the entire point. Leave the items at your door and we bring the packaging and print the labels for you.",
  },
  {
    q: "What areas do you cover?",
    a: "We're starting on California's Central Coast — the 805 — from Santa Barbara up through San Luis Obispo. Drop your ZIP on the waitlist so we know where to launch first.",
  },
  {
    q: "How do I get my refund?",
    a: "Your refund comes directly from the retailer to your original payment method. We make sure your return is packed correctly and delivered before the window closes, then send you a confirmation.",
  },
  {
    q: "Can I cancel the subscription?",
    a: "Anytime, no penalty. The monthly and annual plans are about convenience, not lock-in.",
  },
];

export const waitlist = {
  heading: "Be a founding member of 805Returns",
  sub: "Tell us where you are and how you'd want to pay. We'll launch in the neighborhoods with the most demand first — and founding members keep launch pricing for good.",
  successHeading: "You're on the list. 🎉",
  successSub:
    "We'll be in touch the moment we launch in your area. Founding-member pricing is locked in for you.",
  returnsOptions: ["1–2 a month", "3–5 a month", "6–10 a month", "10+ a month"],
};

export const finalCta = {
  heading: "Stop driving your returns across town.",
  sub: "Join the 805Returns waitlist and we'll handle them from your doorstep.",
  cta: "Get early access",
};
