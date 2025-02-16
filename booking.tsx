import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Flight } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Booking() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: flight, isLoading } = useQuery<Flight>({
    queryKey: [`/api/flights/${id}`],
  });

  const form = useForm({
    defaultValues: {
      passengerName: user?.name || "",
      passengerEmail: user?.email || "",
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: {
      passengerName: string;
      passengerEmail: string;
    }) => {
      const res = await apiRequest("POST", "/api/bookings", {
        flightId: parseInt(id!),
        ...data,
        status: "confirmed",
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed",
        description: "Your flight has been successfully booked!",
      });
      setLocation("/");
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Flight not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Complete Your Booking
        </h1>

        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-2">Flight Details</h2>
          <p className="text-sm text-gray-600">
            {flight.flightNumber} - {flight.origin} to {flight.destination}
          </p>
          <p className="text-sm text-gray-600">
            Departure:{" "}
            {new Date(flight.departureTime).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            Price: ${flight.price}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => bookingMutation.mutate(data))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="passengerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passenger Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passengerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passenger Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={bookingMutation.isPending}
            >
              {bookingMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Confirm Booking
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}