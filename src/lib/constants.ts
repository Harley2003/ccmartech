// CCMartech Design System Constants
// Based on copilot-instructions.md design system

export const COLORS = {
  // Backgrounds
  pageBg: "#F1F2F4",
  navWhite: "#F8F8F9",
  footerBg: "#FAFAFA",

  // Bars & Accents (Charcoal)
  topBarDark: "#313234",
  copyrightBar: "#343434",

  // Brand Blues
  brandBlue: "#003FBB",
  logoIcon: "#0A3EA4",
  footerLink: "#0B539D",

  // Text
  headingDark: "#444547",
  bodyText: "#676767",

  // Common
  white: "#FFFFFF",
} as const;

export const GRADIENTS = {
  ctaButton: "linear-gradient(135deg, #1B3D80 0%, #0067A1 100%)",
  brandIcon: "linear-gradient(180deg, #0A3EA4 0%, #003FBB 100%)",
  pageBg: "linear-gradient(180deg, #F1F2F4 0%, #E8EAEE 100%)",
} as const;

export const FONTS = {
  primary: "'Be Vietnam Pro', sans-serif",
  mono: "'Space Mono', monospace",
} as const;

export const SITE_CONFIG = {
  name: "CCMartech",
  description: "Giải pháp Marketing & Công nghệ toàn diện cho doanh nghiệp",
  url: "https://ccmartech.vn",
} as const;
