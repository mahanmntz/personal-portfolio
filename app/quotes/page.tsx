import { Metadata } from "next";
import { quotesQuery } from "@/lib/sanity.query";
import type { QuoteType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "../components/shared/PageHeading";
import QuotesList from "../components/pages/QuotesList";

export const metadata: Metadata = {
  title: "Quotes | Mahan Montazeri",
  metadataBase: new URL("https://mahanmontazeri.ir/quotes"),
  description:
    "A collection of music lyrics I love — click any card to listen on Spotify.",
  openGraph: {
    title: "Quotes | Mahan Montazeri",
    url: "https://mahanmontazeri.ir/quotes",
    description:
      "A collection of music lyrics I love — click any card to listen on Spotify.",
  },
};

export default async function Quotes() {
  const quotes: QuoteType[] = await sanityFetch({
    query: quotesQuery,
    tags: ["quote"],
  });

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Quotes"
        description="I listen to a lot of music and I'm obsessed with lyrics. Here are the lines that stuck with me — tap any card to hear the track on Spotify."
      />

      <QuotesList quotes={quotes} />
    </main>
  );
}
