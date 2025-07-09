
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-float opacity-40" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-float opacity-80" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-pink-300 rounded-full animate-float opacity-30" style={{animationDelay: '0.5s'}}></div>
    </div>
  );
};

export default AnimatedBackground;
