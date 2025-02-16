import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const flights = pgTable("flights", {
  id: serial("id").primaryKey(),
  flightNumber: text("flight_number").notNull(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  departureTime: timestamp("departure_time").notNull(),
  arrivalTime: timestamp("arrival_time").notNull(),
  price: integer("price").notNull(),
  availableSeats: integer("available_seats").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  flightId: integer("flight_id").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  passengerName: text("passenger_name").notNull(),
  passengerEmail: text("passenger_email").notNull(),
  seatNumber: text("seat_number"),
});

export const insertUserSchema = createInsertSchema(users);
export const insertFlightSchema = createInsertSchema(flights);
export const insertBookingSchema = createInsertSchema(bookings);

export const searchFlightSchema = z.object({
  origin: z.string().min(3),
  destination: z.string().min(3),
  departureDate: z.string(),
  returnDate: z.string().optional(),
  passengers: z.number().min(1).max(9),
});

export type User = typeof users.$inferSelect;
export type Flight = typeof flights.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertFlight = z.infer<typeof insertFlightSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type SearchFlight = z.infer<typeof searchFlightSchema>;