import { Battery, Zap, Gauge, Timer, Rocket } from "lucide-react";
import { EVModel } from "@/data/evModels";

interface SpecsPanelProps {
  model: EVModel;
}

const SpecsPanel = ({ model }: SpecsPanelProps) => {
  const specs = [
    { icon: <Battery className="w-5 h-5" />, label: "Range", value: model.specs.range },
    { icon: <Zap className="w-5 h-5" />, label: "Battery", value: model.specs.battery },
    { icon: <Gauge className="w-5 h-5" />, label: "Power", value: model.specs.power },
    { icon: <Timer className="w-5 h-5" />, label: "0-100", value: model.specs.acceleration },
    { icon: <Rocket className="w-5 h-5" />, label: "Top Speed", value: model.specs.topSpeed },
  ];

  return (
    <div className="absolute top-24 right-6 z-20 w-64">
      <div className="glass-card neon-border p-4 space-y-4">
        <h3 className="font-orbitron text-sm text-muted-foreground tracking-wider uppercase">
          Specifications
        </h3>
        
        <div className="space-y-3">
          {specs.map((spec, index) => (
            <div 
              key={spec.label}
              className="flex items-center justify-between py-2 border-b border-glass-border last:border-0 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="text-primary">{spec.icon}</div>
                <span className="text-sm text-muted-foreground">{spec.label}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecsPanel;
