
import { useState } from "react";
import { MapPin, Star, Wifi, Shield, Utensils, Car, Dumbbell, Zap, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HostelCardProps {
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
  onClick: () => void;
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

const HostelCard = ({ hostel, onClick }: HostelCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getLowestPrice = () => {
    const prices = Object.values(hostel.pricing);
    return Math.min(...prices);
  };

  return (
    <Card
      className="glass-card border-white/20 animate-card-hover cursor-pointer overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={hostel.images[0]}
          alt={hostel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Recommended Badge */}
        {hostel.isRecommended && (
          <Badge className="absolute top-3 right-3 bg-gradient-primary text-black font-semibold animate-pulse-glow">
            <Sparkles className="w-3 h-3 mr-1" />
            Recommended
          </Badge>
        )}

        {/* Rating */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-sm font-medium">{hostel.rating}</span>
        </div>

        {/* Gender Badge */}
        <Badge 
          variant="secondary" 
          className="absolute bottom-3 left-3 bg-white/20 text-white border-white/30"
        >
          {hostel.gender}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-gradient transition-all">
            {hostel.name}
          </h3>
          <div className="flex items-center gap-1 text-gray-300">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-sm">{hostel.distance} from college</span>
          </div>
        </div>

        {/* Facilities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hostel.facilities.slice(0, 4).map((facility, index) => {
            const IconComponent = facilityIcons[facility] || Users;
            return (
              <div
                key={index}
                className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1 text-xs text-gray-300 hover:bg-white/20 transition-colors"
              >
                <IconComponent className="w-3 h-3" />
                <span>{facility}</span>
              </div>
            );
          })}
          {hostel.facilities.length > 4 && (
            <div className="bg-white/10 rounded-full px-2 py-1 text-xs text-gray-300">
              +{hostel.facilities.length - 4} more
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Starting from</p>
            <p className="text-lg font-bold text-gradient">
              ₹{getLowestPrice().toLocaleString()}/month
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Click to view details</p>
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
              <span className="text-black font-bold">→</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HostelCard;
