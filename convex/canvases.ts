import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favourites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    if (args?.favourites) {
      const favouritedBoards = await ctx.db
        .query("favourites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity?.subject).eq("orgId", args.orgId),
        )
        .order("desc")
        .collect();

      const ids = favouritedBoards.map((b) => b?.canvasId);
      const canvases = await getAllOrThrow(ctx.db, ids);

      return canvases.map((canvas) => ({
        ...canvas,
        isFavourite: true,
      }));
    }

    const title = args?.search as string;
    let canvases = [];

    if (title) {
      canvases = await ctx.db
        .query("canvases")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId),
        )
        .collect();
    } else {
      canvases = await ctx.db
        .query("canvases")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

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
