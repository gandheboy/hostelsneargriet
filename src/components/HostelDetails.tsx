
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Star, Wifi, Shield, Utensils, Car, Dumbbell, Zap, Users, ChevronLeft, ChevronRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HostelDetailsProps {
  hostel: {
    id: number;
    name: string;
    distance: string;
    gender: string;
    rating: number;
    isRecommended: boolean;
    facilities: string[];
    pricing: Record<string, number>;
    images: string[];
  };
  onBack: () => void;
}

const facilityIcons: Record<string, any> = {
  "Wifi": Wifi,
  "CCTV": Shield,
  "Security": Shield,
  "Mess": Utensils,
  "Laundry": Car,
  "Gym": Dumbbell,
  "Power Backup": Zap,
  "Study Room": Users,
};

const HostelDetails = ({ hostel, onBack }: HostelDetailsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % hostel.images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [hostel.images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hostel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hostel.images.length) % hostel.images.length);
  };

  const handleViewLocation = () => {
    setShowMap(true);
    // Simulate map loading with animation
    setTimeout(() => {
      alert("Opening Google Maps location...");
      setShowMap(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-float opacity-80" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in-scale">
          <Button
            onClick={onBack}
            variant="outline"
            className="glass-card border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gradient">{hostel.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300">{hostel.distance} from college</span>
              <div className="flex items-center gap-1 ml-4">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-medium">{hostel.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Slideshow */}
          <div className="animate-slide-in-up">
            <Card className="glass-card border-white/20 overflow-hidden">
              <div className="relative h-96 group">
                <img
                  src={hostel.images[currentImageIndex]}
                  alt={`${hostel.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                
                {/* Navigation Arrows */}
                <Button
                  onClick={prevImage}
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={nextImage}
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {hostel.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-cyan-400 w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                {/* Badges */}
                {hostel.isRecommended && (
                  <Badge className="absolute top-4 right-4 bg-gradient-primary text-black font-semibold animate-pulse-glow">
                    🌟 Recommended
                  </Badge>
                )}
                <Badge className="absolute top-4 left-4 bg-white/20 text-white border-white/30">
                  {hostel.gender}
                </Badge>
              </div>
            </Card>
          </div>

          {/* Hostel Information */}
          <div className="space-y-6 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            {/* Facilities */}
            <Card className="glass-card border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Facilities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {hostel.facilities.map((facility, index) => {
                    const IconComponent = facilityIcons[facility] || Users;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                      >
                        <IconComponent className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-white">{facility}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="glass-card border-white/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Pricing</h2>
                <div className="space-y-3">
                  {Object.entries(hostel.pricing).map(([type, price], index) => (
                    <div
                      key={type}
                      className="flex justify-between items-center p-4 bg-gradient-card rounded-lg hover:scale-105 transition-transform cursor-pointer"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span className="text-white font-medium">{type}</span>
                      </div>
                      <span className="text-xl font-bold text-gradient">
                        ₹{price.toLocaleString()}/month
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Button */}
            <Button
              onClick={handleViewLocation}
              className="w-full bg-gradient-primary hover:opacity-80 text-black font-semibold text-lg py-6 rounded-xl transition-all transform hover:scale-105"
              disabled={showMap}
            >
              {showMap ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Loading Map...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 animate-pulse" />
                  View Location
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 animate-slide-in-up" style={{animationDelay: '0.4s'}}>
          <Card className="glass-card border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">About This Hostel</h2>
              <p className="text-gray-300 leading-relaxed">
                Experience comfortable living at {hostel.name}, one of the premier hostels near your college. 
                Our {hostel.gender.toLowerCase()} hostel offers modern amenities and a safe, conducive environment 
                for students. With excellent connectivity and all essential facilities, we ensure your 
                stay is both comfortable and convenient.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-gradient">{hostel.rating}</div>
                  <div className="text-gray-400">Rating</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-gradient">{hostel.distance}</div>
                  <div className="text-gray-400">Distance</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-gradient">{hostel.facilities.length}</div>
                  <div className="text-gray-400">Facilities</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HostelDetails;
