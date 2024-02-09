import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

    const userId = identity?.subject;

    const existingFavourite = await ctx.db
      .query("favourites")
      .withIndex("by_user_canvas", (q) =>
        q.eq("userId", userId).eq("canvasId", args?.id),
      )
      .unique();

    if (existingFavourite) await ctx.db.delete(existingFavourite?._id);
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

export const favourite = mutation({
  args: {
    id: v.id("canvases"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const canvas = await ctx.db.get(args?.id);
    if (!canvas) throw new Error("Canvas not found");

    const userId = identity?.subject;

    const existingFavourite = await ctx.db
      .query("favourites")
      .withIndex("by_user_canvas", (q) =>
        q.eq("userId", userId).eq("canvasId", args?.id),
      )
      .unique();

    if (existingFavourite) throw new Error("Already favourited");

    await ctx.db.insert("favourites", {
      userId,
      canvasId: args?.id,
      orgId: args?.orgId,
    });

    return canvas;
  },
});

export const unfavourite = mutation({
  args: {
    id: v.id("canvases"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const canvas = await ctx.db.get(args?.id);
    if (!canvas) throw new Error("Canvas not found");

    const userId = identity?.subject;

    const existingFavourite = await ctx.db
      .query("favourites")
      .withIndex("by_user_canvas", (q) =>
        q.eq("userId", userId).eq("canvasId", canvas?._id),
      )
      .unique();

    if (!existingFavourite) throw new Error("Favorited canvas not found");

    await ctx.db.delete(existingFavourite?._id);
  },
});

export const get = query({
  args: {
    id: v.id("canvases"),
  },
  handler: async (ctx, args) => {
    const canvas = await ctx.db.get(args?.id);

    return canvas;
  },
});
