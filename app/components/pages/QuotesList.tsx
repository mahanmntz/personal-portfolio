"use client";

import { useState } from "react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";
import { BiSearch, BiSolidQuoteAltLeft } from "react-icons/bi";
import { Slide } from "../../animation/Slide";
import EmptyState from "../shared/EmptyState";
import type { QuoteType } from "@/types";

export default function QuotesList({ quotes }: { quotes: QuoteType[] }) {
  const [search, setSearch] = useState("");

  const filtered = quotes.filter((quote) =>
    `${quote.song} ${quote.artist} ${quote.lyric}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <section>
      {/* Search */}
      <Slide>
        <div className="relative mb-12 max-w-md">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-lg" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by song, artist or lyric…"
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
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {filtered.map((quote, index) => (
            <Slide key={quote._id} delay={index < 6 ? index * 0.04 : 0}>
              <a
                href={quote.spotifyUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Listen to ${quote.song} by ${quote.artist} on Spotify`}
                className="group flex h-full flex-col dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-xl overflow-hidden duration-300 hover:-translate-y-1"
              >
                {/* Cover art */}
                <div className="relative">
                  <Image
                    src={quote.cover.image}
                    alt={quote.cover.alt || quote.song}
                    width={500}
                    height={500}
                    placeholder={quote.cover.lqip ? "blur" : "empty"}
                    blurDataURL={quote.cover.lqip || ""}
                    className="aspect-square w-full object-cover duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 duration-300" />
                  <span className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full bg-black/60 backdrop-blur text-[#1DB954] text-xl translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
                    <FaSpotify />
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <BiSolidQuoteAltLeft className="text-2xl dark:text-zinc-700 text-zinc-300 mb-3" />
                  <p className="flex-1 italic leading-relaxed dark:text-zinc-300 text-zinc-700">
                    {quote.lyric}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t dark:border-zinc-800 border-zinc-200 pt-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold tracking-tight">
                        {quote.song}
                      </h3>
                      <p className="truncate text-sm dark:text-zinc-400 text-zinc-500">
                        {quote.artist}
                      </p>
                    </div>
                    <FaSpotify className="shrink-0 text-xl text-[#1DB954] duration-300 group-hover:scale-110" />
                  </div>
                </div>
              </a>
            </Slide>
          ))}
        </div>
      )}
    </section>
  );
}
