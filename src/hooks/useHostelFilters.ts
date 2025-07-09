
import { useState, useMemo } from "react";

interface Hostel {
  id: number;
  name: string;
  distance: string;
  gender: string;
  rating: number;
  isRecommended: boolean;
  facilities: string[];
  pricing: Record<string, number>;
  images: string[];
}

export const useHostelFilters = (hostels: Hostel[]) => {
  const [genderFilter, setGenderFilter] = useState("all");
  const [distanceRange, setDistanceRange] = useState([10]);
  const [priceRange, setPriceRange] = useState([10000]);
  const [sharingType, setSharingType] = useState("all");

  const filteredHostels = useMemo(() => {
    return hostels.filter(hostel => {
      // Gender filter
      if (genderFilter !== "all" && hostel.gender.toLowerCase() !== genderFilter.toLowerCase()) {
        return false;
      }

      // Distance filter (convert distance string to number)
      const hostelDistance = parseFloat(hostel.distance.split(" ")[0]);
      if (hostelDistance > distanceRange[0]) {
        return false;
      }

      // Price filter (check if any sharing type is within budget)
      const prices = Object.values(hostel.pricing);
      const hasAffordableOption = prices.some(price => price <= priceRange[0]);
      if (!hasAffordableOption) {
        return false;
      }

      // Sharing type filter
      if (sharingType !== "all") {
        const sharingKey = `${sharingType} Sharing`;
        if (!hostel.pricing[sharingKey]) {
          return false;
        }
      }

      return true;
    });
  }, [hostels, genderFilter, distanceRange, priceRange, sharingType]);

  return {
    filteredHostels,
    genderFilter,
    setGenderFilter,
    distanceRange,
    setDistanceRange,
    priceRange,
    setPriceRange,
    sharingType,
    setSharingType
  };
};
