import type { Metadata } from "next";
import StartProjectForm from "@/components/start-project/StartProjectForm";

export const metadata: Metadata = {
  title: "Start a Project | Adapts Media",
  description:
    "Tell us about your vision. Let Adapts Media transform your idea into a premium digital experience.",
};

export default function StartProjectPage() {
  return <StartProjectForm />;
}
