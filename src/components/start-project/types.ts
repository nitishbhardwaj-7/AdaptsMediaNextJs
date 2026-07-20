import { z } from "zod";

// ─── Form Schema ────────────────────────────────────────────────
export const projectFormSchema = z.object({
  projectType: z.string().min(1, "Please select a project type"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Please enter a valid email"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  goals: z.array(z.string()).min(1, "Please select at least one goal"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  description: z.string().min(10, "Please describe your project (at least 10 characters)"),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;

// ─── Step Configuration ────────────────────────────────────────
export const TOTAL_STEPS = 8;

export const PROJECT_TYPES = [
  { id: "website", label: "Website Experience", icon: "🌐", description: "Custom web platforms & digital experiences" },
  { id: "branding", label: "Branding & Identity", icon: "✦", description: "Visual identity & brand strategy" },
  { id: "mobile", label: "Mobile Application", icon: "📱", description: "iOS & Android native apps" },
  { id: "3d", label: "3D / Interactive", icon: "◆", description: "Immersive 3D & WebGL experiences" },
  { id: "marketing", label: "Marketing & Growth", icon: "📈", description: "Performance marketing & SEO" },
  { id: "transformation", label: "Digital Transformation", icon: "⚡", description: "Complete digital overhaul" },
];

export const PROJECT_GOALS = [
  { id: "sales", label: "Increase Sales", icon: "💰" },
  { id: "brand", label: "Improve Brand Image", icon: "✨" },
  { id: "leads", label: "Generate Leads", icon: "🎯" },
  { id: "launch", label: "Launch New Product", icon: "🚀" },
  { id: "ux", label: "Improve User Experience", icon: "🎨" },
  { id: "custom", label: "Something Custom", icon: "🔮" },
];

export const BUDGET_RANGES = [
  { id: "under5k", label: "Under $5k", sublabel: "Starter" },
  { id: "5k-15k", label: "$5k – $15k", sublabel: "Growth" },
  { id: "15k-50k", label: "$15k – $50k", sublabel: "Premium" },
  { id: "50k+", label: "$50k+", sublabel: "Enterprise" },
];

export const TIMELINE_OPTIONS = [
  { id: "asap", label: "ASAP", sublabel: "Rush delivery", icon: "⚡" },
  { id: "1-3months", label: "1–3 Months", sublabel: "Standard timeline", icon: "📅" },
  { id: "3-6months", label: "3–6 Months", sublabel: "Relaxed pace", icon: "🗓" },
  { id: "flexible", label: "Flexible", sublabel: "No rush", icon: "🌊" },
];
