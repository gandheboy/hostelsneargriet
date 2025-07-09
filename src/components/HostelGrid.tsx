
import HostelCard from "@/components/HostelCard";

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

interface HostelGridProps {
  hostels: Hostel[];
  onHostelClick: (hostel: Hostel) => void;
}

const HostelGrid = ({ hostels, onHostelClick }: HostelGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hostels.length > 0 ? (
        hostels.map((hostel, index) => (
          <div
            key={hostel.id}
            className="animate-slide-in-up"
            style={{animationDelay: `${0.3 + index * 0.1}s`}}
          >
            <HostelCard
              hostel={hostel}
              onClick={() => onHostelClick(hostel)}
            />
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No hostels match your filters</h3>
          <p className="text-gray-400">Try adjusting your filter criteria to see more options</p>
        </div>
      )}
    </div>
  );
};

export default HostelGrid;
