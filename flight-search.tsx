import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Flight } from "@shared/schema";
import FlightCard from "@/components/flight-card";
import { Loader2 } from "lucide-react";

export default function FlightSearch() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split("?")[1]);
  
  const { data: flights, isLoading } = useQuery<Flight[]>({
    queryKey: ["/api/flights/search", {
      origin: searchParams.get("origin"),
      destination: searchParams.get("destination"),
      departureDate: searchParams.get("departureDate"),
      passengers: searchParams.get("passengers")
    }],
    queryFn: async ({ queryKey }) => {
      const [_, params] = queryKey;
      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error("Failed to fetch flights");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {flights?.length} Flights Found
        </h1>
        <p className="text-gray-600">
          {searchParams.get("origin")} to {searchParams.get("destination")} on{" "}
          {new Date(searchParams.get("departureDate") || "").toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-4">
        {flights?.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            passengers={parseInt(searchParams.get("passengers") || "1")}
          />
        ))}
      </div>
    </div>
  );
}