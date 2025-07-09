
import { useState, useEffect } from "react";
import { Search, MapPin, Wifi, Shield, Utensils, Car, Dumbbell, Zap, Users, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HostelCard from "@/components/HostelCard";
import HostelDetails from "@/components/HostelDetails";

const colleges = [
  "IIT Delhi", "Delhi University", "Jamia Millia Islamia", "JNU", "NSUT", 
  "DTU", "Amity University", "GGSIPU", "Sharda University", "Bennett University"
];

const mockHostels = [
  {
    id: 1,
    name: "Sky View Hostel",
    distance: "0.5 km",
    gender: "Co-ed",
    rating: 4.8,
    isRecommended: true,
    facilities: ["Wifi", "CCTV", "Mess", "Laundry", "Gym", "Power Backup"],
    pricing: {
      "2 Sharing": 8000,
      "3 Sharing": 6500,
      "4 Sharing": 5200
    },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
    ]
  },
  {
    id: 2,
    name: "Green Valley Residence",
    distance: "1.2 km",
    gender: "Male",
    rating: 4.6,
    isRecommended: false,
    facilities: ["Wifi", "Security", "Mess", "Study Room"],
    pricing: {
      "2 Sharing": 7500,
      "3 Sharing": 6000,
      "4 Sharing": 4800
    },
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"
    ]
  },
  {
    id: 3,
    name: "Urban Nest",
    distance: "0.8 km",
    gender: "Female",
    rating: 4.9,
    isRecommended: true,
    facilities: ["Wifi", "CCTV", "Mess", "Laundry", "Study Room", "Power Backup"],
    pricing: {
      "2 Sharing": 8500,
      "3 Sharing": 7000,
      "4 Sharing": 5500
    },
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=400&fit=crop"
    ]
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [showHostels, setShowHostels] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<any>(null);
  
  // Filter states
  const [genderFilter, setGenderFilter] = useState("all");
  const [distanceRange, setDistanceRange] = useState([10]);
  const [priceRange, setPriceRange] = useState([10000]);
  const [sharingType, setSharingType] = useState("all");

  useEffect(() => {
    if (searchQuery) {
      const filtered = colleges.filter(college =>
        college.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredColleges(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleCollegeSelect = (college: string) => {
    setSelectedCollege(college);
    setSearchQuery(college);
    setShowSuggestions(false);
    setShowHostels(true);
  };

  const handleSearch = () => {
    if (searchQuery) {
      setShowHostels(true);
      setShowSuggestions(false);
    }
  };

  if (selectedHostel) {
    return <HostelDetails hostel={selectedHostel} onBack={() => setSelectedHostel(null)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-float opacity-80" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-pink-300 rounded-full animate-float opacity-30" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-scale">
          <h1 className="text-6xl font-bold text-gradient mb-4">
            HostelNest
          </h1>
          <p className="text-xl text-gray-300 mb-2">Your Hostel, Just a Search Away!</p>
          <p className="text-gray-400">Find the perfect hostel near your college with futuristic ease</p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12 relative animate-slide-in-up">
          <Card className="glass-card glow-border p-6">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by College / Institution Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-20 py-4 text-lg bg-white/5 border-white/20 rounded-xl focus:border-cyan-400 focus:ring-cyan-400 transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-primary hover:opacity-80 transition-all rounded-lg"
                >
                  Search
                </Button>
              </div>

              {/* Auto-suggestions */}
              {showSuggestions && filteredColleges.length > 0 && (
                <Card className="absolute top-full mt-2 w-full glass-card border-white/20 z-50 animate-fade-in-scale">
                  <CardContent className="p-0">
                    {filteredColleges.slice(0, 5).map((college, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10 last:border-b-0"
                        onClick={() => handleCollegeSelect(college)}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-cyan-400" />
                          <span className="text-white">{college}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </Card>
        </div>

        {/* Filters Section */}
        {showHostels && (
          <div className="mb-8 animate-slide-in-up" style={{animationDelay: '0.2s'}}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">
                Hostels near <span className="text-gradient">{selectedCollege}</span>
              </h2>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="glass-card border-white/20 text-white hover:bg-white/10"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <Card className="glass-card border-white/20 p-6 mb-6 animate-fade-in-scale">
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Gender</label>
                    <Select value={genderFilter} onValueChange={setGenderFilter}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="co-ed">Co-ed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">
                      Distance: {distanceRange[0]}km
                    </label>
                    <Slider
                      value={distanceRange}
                      onValueChange={setDistanceRange}
                      max={10}
                      min={0.5}
                      step={0.5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">
                      Price: ₹{priceRange[0]}/month
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={15000}
                      min={3000}
                      step={500}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Sharing</label>
                    <Select value={sharingType} onValueChange={setSharingType}>
                      <SelectTrigger className="bg-white/5 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="2">2 Sharing</SelectItem>
                        <SelectItem value="3">3 Sharing</SelectItem>
                        <SelectItem value="4">4 Sharing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Hostel Cards */}
        {showHostels && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockHostels.map((hostel, index) => (
              <div
                key={hostel.id}
                className="animate-slide-in-up"
                style={{animationDelay: `${0.3 + index * 0.1}s`}}
              >
                <HostelCard
                  hostel={hostel}
                  onClick={() => setSelectedHostel(hostel)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!showHostels && (
          <div className="text-center py-20 animate-fade-in-scale">
            <div className="text-6xl mb-6">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">Ready to find your perfect hostel?</h3>
            <p className="text-gray-400">Start by searching for your college or institution above</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
