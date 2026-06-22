import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { defineField } from "sanity";

const quote = {
  name: "quote",
  title: "Quotes",
  description: "Lines worth remembering",
  type: "document",
  icon: BiSolidQuoteAltLeft,
  fields: [
    defineField({
      name: "lyric",
      title: "Quote",
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
  ],
  preview: {
    select: {
      title: "lyric",
      subtitle: "artist",
    },
  },
};

export default quote;
