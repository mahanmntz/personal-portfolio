import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { defineField } from "sanity";

const quote = {
  name: "quote",
  title: "Quotes",
  description: "Favorite music lyrics worth remembering",
  type: "document",
  icon: BiSolidQuoteAltLeft,
  fields: [
    defineField({
      name: "song",
      title: "Song Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "artist",
      title: "Artist",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lyric",
      title: "Lyric / Quote",
      type: "text",
      rows: 4,
      description: "The snippet of lyrics you love",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "spotifyUrl",
      title: "Spotify URL",
      type: "url",
      description: "Link to the track on Spotify",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
      description: "Album / song cover art",
      options: {
        hotspot: true,
        metadata: ["lqip"],
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "song",
      subtitle: "artist",
      media: "cover",
    },
  },
};

export default quote;
