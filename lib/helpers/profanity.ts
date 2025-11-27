import { Filter } from "bad-words";
const filter = new Filter();

filter.removeWords(
  "ass",
  "arsehole",
  "asshole",
  "bastard",
  "butt",
  "bollocks",
  "domination",
  "dominatrix",
  "dingleberries",
  "dingleberry",
  "fecal",
  "honkey",
  "kinky",
  "nude",
  "nudity",
  "tushy",
  "yaoi",
  "wank",
  "suck",
  "sucks"
);

function NormalizeText(inputText: string) {
  const input = String(inputText)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");

  const LeetSpeakMap = {
    "@": "a",
    4: "a",
    3: "e",
    1: "i",
    "!": "i",
    "|": "i",
    0: "o",
    $: "s",
    5: "s",
    7: "t",
    "+": "t",
    8: "b",
    9: "g",
    6: "g",
  };

  let normalizedString = "";
  for (const char of input) {
    normalizedString +=
      (LeetSpeakMap as Record<string | number, string>)[char] || char;
  }

  normalizedString = normalizedString
    .replace(/(.)\1+/g, "$1")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  return normalizedString;
}

export function IsProfanitySafe(inputText: string) {
  const normalized = NormalizeText(inputText);
  return !filter.isProfane(inputText) && !filter.isProfane(normalized);
}

export function MakeProfanitySafe(inputText: string) {
  return filter.clean(inputText);
}
