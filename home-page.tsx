import { Card } from "@/components/ui/card";
import FlightSearchForm from "@/components/flight-search-form";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-primary h-[500px] flex items-center">
        <div 
          className="absolute inset-0 bg-black/40 z-10"
          style={{
            backgroundImage: `url(${encodeURI('https://images.unsplash.com/photo-1631478365665-aeb1f97f702b')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to Saudia Airlines
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover the world with comfort and luxury
            </p>
          </div>

          <Card className="p-6 bg-white/95 backdrop-blur">
            <FlightSearchForm />
          </Card>
        </div>
      </div>

      {/* Destinations Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1558204692-5f402fe220b9",
                title: "Dubai",
                code: "DXB"
              },
              {
                image: "https://images.unsplash.com/photo-1545460463-afdcfb3a3e53",
                title: "Cairo",
                code: "CAI"
              },
              {
                image: "https://images.unsplash.com/photo-1542296332-2e4473faf563",
                title: "London",
                code: "LHR"
              },
              {
                image: "https://images.unsplash.com/photo-1532372768454-c936572f87ea",
                title: "Paris",
                code: "CDG"
              }
            ].map((destination) => (
              <Card key={destination.code} className="overflow-hidden group">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{destination.title}</h3>
                  <p className="text-sm text-gray-500">{destination.code}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}