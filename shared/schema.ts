import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Photos schema
export const photos = pgTable("photos", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  type: text("type").notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  profession: text("profession").notNull(),
});

export const insertPhotoSchema = createInsertSchema(photos).pick({
  src: true,
  alt: true,
  type: true,
  name: true,
  age: true,
  profession: true,
});

export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photos.$inferSelect;

// Profile schema
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  birthdate: text("birthdate").notNull(), // Store as ISO string
  age: integer("age").notNull(),
  profession: text("profession").notNull(),
  bio: text("bio").notNull(),
  interests: text("interests").array().notNull(),
  socialLinks: jsonb("social_links").notNull(),
});

export const insertProfileSchema = createInsertSchema(profiles).pick({
  name: true,
  birthdate: true,
  age: true,
  profession: true,
  bio: true,
  interests: true,
  socialLinks: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profiles.$inferSelect;
