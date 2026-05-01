import { Metadata } from "next";
import DocumentationClient from "./DocumentationClient";

export const metadata: Metadata = {
  title: "Documentation | Post-Quantum IRC",
};

export default function Documentation() {
  return <DocumentationClient />;
}
