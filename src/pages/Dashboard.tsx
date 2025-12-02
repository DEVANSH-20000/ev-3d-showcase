import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import EVCard from "@/components/EVCard";
import { evModels } from "@/data/evModels";
import { Zap, ChevronDown } from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>EV 3D Dashboard | Explore Electric Vehicles in 360°</title>
        <meta 
          name="description" 
          content="Explore premium electric vehicles with immersive 360° 3D visualization. View interior and exterior of Harrier EV, Nexon EV, and Tesla EV models." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(ellipse at center, hsl(185 100% 50% / 0.1), transparent 70%)"
            }}
          />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4 opacity-0 animate-fade-in">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Next Generation EVs</span>
              </div>

              {/* Main Heading */}
              <h1 
                className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight opacity-0 animate-fade-in"
                style={{ animationDelay: "100ms" }}
              >
                Experience Electric{" "}
                <span className="text-primary neon-text">Vehicles</span>{" "}
                in <span className="text-primary neon-text">360°</span>
              </h1>

              {/* Subtitle */}
              <p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                Immerse yourself in the future of mobility. Explore stunning electric vehicles 
                with interactive 3D visualization, inside and out.
              </p>

              {/* CTA Buttons */}
              <div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0 animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                <a 
                  href="#models" 
                  className="btn-neon flex items-center gap-2 group"
                >
                  <span className="font-orbitron tracking-wider">Explore Models</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Animated Stats */}
            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16 opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              {[
                { value: "3", label: "EV Models" },
                { value: "360°", label: "Viewing" },
                { value: "2", label: "View Modes" },
                { value: "∞", label: "Angles" },
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="glass-card p-4 text-center"
                >
                  <div className="font-orbitron text-2xl md:text-3xl font-bold text-primary neon-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Models Section */}
        <section id="models" className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground mb-4">
                Select Your <span className="text-primary neon-text">Vehicle</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Click on any model to launch the immersive 360° viewer and explore every detail.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {evModels.map((model, index) => (
                <EVCard key={model.id} model={model} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-glass-border">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 EV 3D Dashboard. Built with React Three Fiber.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
