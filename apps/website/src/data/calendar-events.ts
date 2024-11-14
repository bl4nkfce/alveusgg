import { type CalendarEvent } from "@prisma/client";

type StandardCategory = {
  name: string;
  color: string;
};

export const standardCategories: StandardCategory[] = [
  { name: "Alveus Regular Stream", color: "bg-yellow-400 hover:bg-yellow-600" },
  { name: "Alveus Special Stream", color: "bg-green-300 hover:bg-green-500" },
  {
    name: "Alveus Collaboration Stream",
    color: "bg-blue-300 hover:bg-blue-500",
  },
  { name: "Alveus YouTube Video", color: "bg-red-300 hover:bg-red-500" },
  { name: "Maya Stream", color: "bg-gray-200 hover:bg-gray-400" },
  { name: "Maya YouTube Video", color: "bg-red-200 hover:bg-red-400" },
] as const;

export const getStandardCategoryColor = (category: string) =>
  standardCategories.find(
    (c) => c.name.toLowerCase() === category.toLowerCase().trim(),
  )?.color ?? "bg-gray-100 hover:bg-gray-300";

type FrequentLink = {
  label: string;
  url: string;
};

export const frequentLinks: FrequentLink[] = [
  {
    label: "Alveus Twitch",
    url: "https://twitch.tv/AlveusSanctuary",
  },
  {
    label: "Alveus YouTube",
    url: "https://youtube.com/@AlveusSanctuary",
  },
  {
    label: "Maya Twitch",
    url: "https://twitch.tv/maya",
  },
  {
    label: "Maya YouTube",
    url: "https://youtube.com/@mayahiga",
  },
] as const;

// Used for the overlay + Twitch sync, showing all Alveus events that aren't YT videos
export const isAlveusEvent = (event: CalendarEvent) =>
  /\balveus\b/i.test(event.category) &&
  !/\b(yt|youtube)\b/i.test(event.category);

const truncate = (value: string, max: number) => {
  if (value.length <= max) return value;

  for (const pattern of [" - ", " | ", ": "]) {
    const index = value.indexOf(pattern);
    if (index !== -1 && index < max) return value.slice(0, index);
  }

  return value.slice(0, max - 3) + "…";
};

// Used for the overlay + Twitch sync, showing the title + link (if not Alveus Twitch)
export const getFormattedTitle = (event: CalendarEvent, length?: number) => {
  const title = length ? truncate(event.title, length) : event.title;
  return /twitch.tv\/alveussanctuary/i.test(event.link)
    ? title
    : `${title} @ ${event.link.toLowerCase().replace(/^(https?:)?\/\/(www\.)?/, "")}`;
};
