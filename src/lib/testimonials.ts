/**
 * Quotes taken verbatim from written recommendation letters (on file).
 * Do not edit the quote text without checking it against the letters.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "One of the most outstanding students I have had the privilege to teach and mentor.",
    name: "Dr.-Ing Rajesh Shankar Priya",
    role: "Programme Director for Engineering Management, Loughborough University",
  },
  {
    quote:
      "A level of technical competence, accountability, and professional maturity that exceeded what is typically expected of an intern.",
    name: "Ben Pointon",
    role: "Former Head of Product, ESP Fitness",
  },
  {
    quote:
      "Seb excels in analytical thinking and possesses a remarkably strong grasp of subject knowledge.",
    name: "Dr.-Ing Rajesh Shankar Priya",
    role: "Programme Director for Engineering Management, Loughborough University",
  },
  {
    quote:
      "His drawings were consistently clear, buildable, and commercially aware. Qualities that materially reduced rework and site issues.",
    name: "Ben Pointon",
    role: "Former Head of Product, ESP Fitness",
  },
  {
    quote:
      "He has already demonstrated the technical depth, ownership mindset, and delivery focus typically expected of a far more senior professional.",
    name: "Ben Pointon",
    role: "Former Head of Product, ESP Fitness",
  },
  {
    quote:
      "I would recommend Seb without hesitation for any engineering, design, or technical leadership role.",
    name: "Ben Pointon",
    role: "Former Head of Product, ESP Fitness",
  },
];
