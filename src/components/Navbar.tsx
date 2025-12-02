import { Link } from "react-router-dom";
import { Zap, Battery, Car } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center neon-glow">
                <Zap className="w-6 h-6 text-space-dark" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue opacity-50 blur-lg group-hover:opacity-80 transition-opacity" />
            </div>
            <div>
              <h1 className="font-orbitron text-xl font-bold tracking-wider text-foreground">
                EV <span className="text-primary neon-text">3D</span> Dashboard
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                Next-Gen Electric Vehicles
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavItem icon={<Car className="w-4 h-4" />} label="Models" />
            <NavItem icon={<Battery className="w-4 h-4" />} label="Specs" />
            <NavItem icon={<Zap className="w-4 h-4" />} label="Charging" />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-glass-border">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-muted-foreground">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group">
    <span className="group-hover:text-primary transition-colors">{icon}</span>
    <span className="text-sm font-medium tracking-wide">{label}</span>
  </button>
);

export default Navbar;
