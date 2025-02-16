import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flight } from "@shared/schema";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { Plane } from "lucide-react";

interface FlightCardProps {
  flight: Flight;
  passengers: number;
}

export default function FlightCard({ flight, passengers }: FlightCardProps) {
  const [, setLocation] = useLocation();

  const departureTime = new Date(flight.departureTime);
  const arrivalTime = new Date(flight.arrivalTime);
  const duration = (arrivalTime.getTime() - departureTime.getTime()) / (1000 * 60); // in minutes

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Departure</p>
              <p className="font-semibold">
                {format(departureTime, "h:mm a")}
              </p>
              <p className="text-sm text-gray-600">{flight.origin}</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500 mb-1">
                {Math.floor(duration / 60)}h {duration % 60}m
              </p>
              <div className="relative w-24 h-px bg-gray-300">
                <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              </div>
            </div>

            <div className="flex-1 text-right">
              <p className="text-sm text-gray-500">Arrival</p>
              <p className="font-semibold">
                {format(arrivalTime, "h:mm a")}
              </p>
              <p className="text-sm text-gray-600">{flight.destination}</p>
            </div>
          </div>

          <div className="flex gap-4 text-sm text-gray-600">
            <p>Flight {flight.flightNumber}</p>
            <p>{flight.availableSeats} seats available</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <p className="text-2xl font-bold text-primary">
            ${flight.price * passengers}
          </p>
          <p className="text-sm text-gray-500">
            {passengers} passenger{passengers > 1 ? "s" : ""}
          </p>
          <Button
            onClick={() => setLocation(`/booking/${flight.id}`)}
            disabled={flight.availableSeats < passengers}
          >
            Select Flight
          </Button>
        </div>
      </div>
    </Card>
  );
}