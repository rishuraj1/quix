import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const images = [
      "/placeholders/1.svg",
      "/placeholders/2.svg",
      "/placeholders/3.svg",
      "/placeholders/4.svg",
      "/placeholders/5.svg",
      "/placeholders/6.svg",
      "/placeholders/7.svg",
    ];

    const getImage = images[Math.floor(Math.random() * images.length)];

    const canvas = await ctx.db.insert("canvases", {
      title: args?.title,
      orgId: args?.orgId,
      authorId: identity?.subject,
      authorName: identity?.name!,
      imageUrl: getImage,
    });

    return canvas;
  },
});

export const remove = mutation({
  args: {
    id: v.id("canvases"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    await ctx.db.delete(args?.id);

    //TODO: later remove fav relations.
  },
});

export const update = mutation({
  args: {
    id: v.id("canvases"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (!identity) throw new Error("Unauthorized");

    const title = args?.title.trim();
    if (!title) throw new Error("Title is required");

    const canvas = await ctx.db.patch(args?.id, {
      title: args?.title,
    });

    return canvas;
  },
});
