import job from "./job";
import profile from "./profile";
import project from "./project";
import post from "./post";
import author from "./author";
import quote from "./quote";
import { youtube } from "./youtube";
import { table } from "./table";
import blockContent from "./blockContent";
import quiz from "./quiz";

export const schemaTypes = [
  profile,
  job,
  project,
  post,
  author,
  quote,

  // Reference types
  blockContent,
  youtube,
  table,
  quiz,
];
