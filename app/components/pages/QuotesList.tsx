"use client";

import { useState } from "react";
import { BiSearch, BiSolidQuoteAltLeft } from "react-icons/bi";
import { Slide } from "../../animation/Slide";
import EmptyState from "../shared/EmptyState";
import type { QuoteType } from "@/types";

export default function QuotesList({ quotes }: { quotes: QuoteType[] }) {
  const [search, setSearch] = useState("");

  const filtered = quotes.filter((quote) =>
    `${quote.lyric} ${quote.artist}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <section>
      <Slide>
        <div className="relative mb-10 max-w-md">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-lg" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quotes…"
            aria-label="Search quotes"
            className="w-full dark:bg-primary-bg bg-zinc-50 dark:text-white text-zinc-700 border dark:border-zinc-800 border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:dark:border-zinc-700 focus:border-zinc-300 duration-300"
          />
        </div>
      </Slide>

      {quotes.length === 0 ? (
        <EmptyState value="Quotes" />
      ) : filtered.length === 0 ? (
        <p className="dark:text-zinc-400 text-zinc-500">
          No quotes match{" "}
          <span className="dark:text-white text-zinc-700">“{search}”</span>.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((quote, index) => (
            <Slide key={quote._id} delay={index < 6 ? index * 0.04 : 0}>
              <figure className="flex h-full flex-col dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-xl p-5 duration-300 hover:-translate-y-1">
                <BiSolidQuoteAltLeft className="mb-3 text-2xl text-primary-color/80" />
                <blockquote className="flex-1 text-[0.95rem] italic leading-relaxed dark:text-zinc-200 text-zinc-700">
                  {quote.lyric}
                </blockquote>
                <figcaption className="mt-4 border-t dark:border-zinc-800 border-zinc-200 pt-3 text-sm font-semibold tracking-tight">
                  — {quote.artist}
                </figcaption>
              </figure>
            </Slide>
          ))}
        </div>
      )}
    </section>
  );
}
