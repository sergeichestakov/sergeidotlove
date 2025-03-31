import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get all photos
  app.get('/api/photos', async (req, res) => {
    try {
      const photos = await storage.getPhotos();
      res.json(photos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).json({ message: 'Failed to fetch photos' });
    }
  });

  // API route to get profile
  app.get('/api/profile', async (req, res) => {
    try {
      const profile = await storage.getProfile();
      
      // Ensure birthdate is sent to client as a proper string
      // that can be converted to a Date object on the client side
      const profileWithDateString = {
        ...profile,
        birthdate: profile.birthdate ? profile.birthdate.toString() : null
      };
      
      res.json(profileWithDateString);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Failed to fetch profile' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
