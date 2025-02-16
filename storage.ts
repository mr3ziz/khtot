import { User, Flight, Booking, InsertUser, InsertBooking } from "@shared/schema";
import { mockFlights } from "./mockData";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getFlights(): Promise<Flight[]>;
  searchFlights(origin: string, destination: string, date: string): Promise<Flight[]>;
  getFlight(id: number): Promise<Flight | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getUserBookings(userId: number): Promise<Booking[]>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookings: Map<number, Booking>;
  private currentUserId: number;
  private currentBookingId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.currentUserId = 1;
    this.currentBookingId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
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
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFlights(): Promise<Flight[]> {
    return mockFlights;
  }

  async searchFlights(origin: string, destination: string, date: string): Promise<Flight[]> {
    const searchDate = new Date(date);
    return mockFlights.filter(
      (flight) =>
        flight.origin === origin &&
        flight.destination === destination &&
        flight.departureTime.toDateString() === searchDate.toDateString(),
    );
  }

  async getFlight(id: number): Promise<Flight | undefined> {
    return mockFlights.find((flight) => flight.id === id);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const newBooking = { ...booking, id };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async getUserBookings(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId,
    );
  }
}

export const storage = new MemStorage();