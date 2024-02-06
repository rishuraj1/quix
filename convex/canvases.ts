import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const canvases = await ctx.db
      .query("canvases")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

    const canvasesWithFavouriteRelation = canvases.map((canvas) => {
      return ctx.db
        .query("favourites")
        .withIndex("by_user_canvas", (q) =>
          q.eq("userId", identity.subject).eq("canvasId", canvas._id),
        )
        .unique()
        .then((favourite) => {
          return {
            ...canvas,
            isFavourite: !!favourite,
          };
        });
    });

    const canvasesWithFavouriteBoolean = Promise.all(
      canvasesWithFavouriteRelation,
    );
    return canvasesWithFavouriteBoolean;
  },
});
