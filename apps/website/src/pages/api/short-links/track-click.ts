import { z } from "zod";
import { track } from "@vercel/analytics/server";

import { prisma } from "@/server/db/client";
import { createTokenProtectedApiHandler } from "@/server/utils/api";

const trackClickSchema = z.object({
  id: z.string().cuid(),
  slug: z.string(),
  link: z.string(),
  headers: z.record(z.union([z.string(), z.array(z.string())])),
});
export type TrackClickSchema = z.infer<typeof trackClickSchema>;

//API for short links tracking
export default createTokenProtectedApiHandler(
  trackClickSchema,
  async ({ id, slug, link, headers }) => {
    try {
      await prisma.shortLinksTracking.upsert({
        where: { id },
        create: { id, clicks: 1 },
        update: { clicks: { increment: 1 } },
      });
      await track("Short link clicked", { slug, link }, { headers });
      return true;
    } catch (e) {
      console.error("Failed to track click", e);
      return false;
    }
  },
);
