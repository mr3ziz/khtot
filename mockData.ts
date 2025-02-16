import { Flight } from "@shared/schema";

export const mockFlights: Flight[] = [
  {
    id: 1,
    flightNumber: "SV123",
    origin: "Riyadh (RUH)",
    destination: "Jeddah (JED)",
    departureTime: new Date("2024-02-20T10:00:00Z"),
    arrivalTime: new Date("2024-02-20T12:00:00Z"),
    price: 500,
    availableSeats: 120,
  },
  {
    id: 2,
    flightNumber: "SV456",
    origin: "Jeddah (JED)",
    destination: "Dubai (DXB)",
    departureTime: new Date("2024-02-20T14:00:00Z"),
    arrivalTime: new Date("2024-02-20T16:30:00Z"),
    price: 800,
    availableSeats: 85,
  },
  {
    id: 3,
    flightNumber: "SV789",
    origin: "Riyadh (RUH)",
    destination: "Cairo (CAI)",
    departureTime: new Date("2024-02-21T08:00:00Z"),
    arrivalTime: new Date("2024-02-21T10:30:00Z"),
    price: 900,
    availableSeats: 150,
  },
];

export const airports = [
  "Riyadh (RUH)",
  "Jeddah (JED)", 
  "Dubai (DXB)",
  "Cairo (CAI)",
  "London (LHR)",
  "Paris (CDG)",
  "New York (JFK)",
  "Tokyo (NRT)"
];