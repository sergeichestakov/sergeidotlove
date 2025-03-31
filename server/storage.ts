import { users, type User, type InsertUser, Photo, Profile } from "@shared/schema";
import { stockPhotos } from "../client/src/data/photos";
import { profileData } from "../client/src/data/profile";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPhotos(): Promise<Photo[]>;
  getProfile(): Promise<Profile>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private photos: Photo[];
  private profile: Profile;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.photos = stockPhotos;
    this.profile = profileData;
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPhotos(): Promise<Photo[]> {
    return this.photos;
  }

  async getProfile(): Promise<Profile> {
    return this.profile;
  }
}

export const storage = new MemStorage();
