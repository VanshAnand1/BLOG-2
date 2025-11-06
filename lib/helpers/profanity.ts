import * as LeoProfanity from "leo-profanity";

const filter = LeoProfanity;
filter.add("hello");

export function IsProfanitySafe(inputText: string) {
  return filter.check(inputText);
}

export function MakeProfanitySafe(inputText: string) {
  return filter.clean(inputText);
}
