
import { useState } from "react";
import HostelDetails from "@/components/HostelDetails";
import FilterPanel from "@/components/FilterPanel";
import HostelGrid from "@/components/HostelGrid";
import SearchHeader from "@/components/SearchHeader";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useHostelFilters } from "@/hooks/useHostelFilters";
import { mockHostels } from "@/data/mockHostels";

const Index = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<any>(null);
  
  const {
    filteredHostels,
    genderFilter,
    setGenderFilter,
    distanceRange,
    setDistanceRange,
    priceRange,
    setPriceRange,
    sharingType,
    setSharingType
  } = useHostelFilters(mockHostels);

  if (selectedHostel) {
    return <HostelDetails hostel={selectedHostel} onBack={() => setSelectedHostel(null)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <SearchHeader />

        <FilterPanel
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          genderFilter={genderFilter}
          onGenderFilterChange={setGenderFilter}
          distanceRange={distanceRange}
          onDistanceRangeChange={setDistanceRange}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sharingType={sharingType}
          onSharingTypeChange={setSharingType}
        />

        <HostelGrid
          hostels={filteredHostels}
          onHostelClick={setSelectedHostel}
        />
      </div>
    </div>
  );
};

export default Index;
