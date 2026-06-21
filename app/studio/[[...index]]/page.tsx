// Server wrapper for the Studio so the route can be statically exported
// (output: "export"). The actual Studio UI lives in StudioClient ("use client").
import { StudioClient } from "./StudioClient";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ index: [] }];
}

export default function StudioPage() {
  return <StudioClient />;
}
