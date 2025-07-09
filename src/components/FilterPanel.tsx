
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterPanelProps {
  showFilters: boolean;
  onToggleFilters: () => void;
  genderFilter: string;
  onGenderFilterChange: (value: string) => void;
  distanceRange: number[];
  onDistanceRangeChange: (value: number[]) => void;
  priceRange: number[];
  onPriceRangeChange: (value: number[]) => void;
  sharingType: string;
  onSharingTypeChange: (value: string) => void;
}

const FilterPanel = ({
  showFilters,
  onToggleFilters,
  genderFilter,
  onGenderFilterChange,
  distanceRange,
  onDistanceRangeChange,
  priceRange,
  onPriceRangeChange,
  sharingType,
  onSharingTypeChange
}: FilterPanelProps) => {
  return (
    <div className="mb-8 animate-slide-in-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">
          Hostels near <span className="text-gradient">GRIET</span>
        </h2>
        <Button
          onClick={onToggleFilters}
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
              <Select value={genderFilter} onValueChange={onGenderFilterChange}>
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
                onValueChange={onDistanceRangeChange}
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
                onValueChange={onPriceRangeChange}
                max={15000}
                min={3000}
                step={500}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Sharing</label>
              <Select value={sharingType} onValueChange={onSharingTypeChange}>
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
  );
};

export default FilterPanel;
