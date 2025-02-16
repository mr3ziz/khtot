import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { searchFlightSchema, insertBookingSchema } from "@shared/schema";
import { airports } from "./mockData";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  app.get("/api/airports", (req, res) => {
    res.json(airports);
  });

  app.get("/api/flights", async (req, res) => {
    const flights = await storage.getFlights();
    res.json(flights);
  });

  app.post("/api/flights/search", async (req, res) => {
    const result = searchFlightSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const { origin, destination, departureDate } = result.data;
    const flights = await storage.searchFlights(origin, destination, departureDate);
    res.json(flights);
  });

  app.post("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    const result = insertBookingSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const booking = await storage.createBooking({
      ...result.data,
      userId: req.user.id,
    });
    res.status(201).json(booking);
  });

  app.get("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    const bookings = await storage.getUserBookings(req.user.id);
    res.json(bookings);
  });

  const httpServer = createServer(app);
  return httpServer;
}