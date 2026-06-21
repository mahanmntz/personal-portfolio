import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { defineField } from "sanity";

const quote = {
  name: "quote",
  title: "Quotes",
  description: "Lyrics & lines worth remembering",
  type: "document",
  icon: BiSolidQuoteAltLeft,
  fields: [
    defineField({
      name: "lyric",
      title: "Quote / Lyric",
      type: "text",
      rows: 4,
      description: "The line you love",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Artist / Author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "song",
      title: "Song / Source",
      type: "string",
      description: "Optional — the song or work it's from",
    }),
    defineField({
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
      description: "Optional — link to the track",
    }),
  ],
  preview: {
    select: {
      title: "lyric",
      subtitle: "artist",
    },
  },
};

export default quote;
