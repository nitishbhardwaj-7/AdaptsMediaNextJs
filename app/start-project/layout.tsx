import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project | Adapts Media",
  description:
    "Tell us about your vision. Let Adapts Media transform your idea into a premium digital experience.",
};

export default function StartProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Override the default <main> padding and hide navbar for this immersive page
    <div style={{ paddingTop: 0, marginTop: "-0px" }}>
      {children}
    </div>
  );
}
