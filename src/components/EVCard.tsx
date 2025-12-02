import { Link } from "react-router-dom";
import { Battery, Zap, Gauge, ArrowRight } from "lucide-react";
import { EVModel } from "@/data/evModels";

interface EVCardProps {
  model: EVModel;
  index: number;
}

const EVCard = ({ model, index }: EVCardProps) => {
  return (
    <div
      className="glass-card card-hover neon-border p-6 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Card Header with Model Preview */}
      <div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-secondary to-space-dark">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse at center, ${model.colors.accent}40, transparent 70%)`
          }}
        />
        
        {/* Car Silhouette Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <CarSilhouette color={model.colors.accent} />
            <div 
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full blur-xl"
              style={{ backgroundColor: model.colors.accent, opacity: 0.5 }}
            />
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/20 border border-primary/50 backdrop-blur-sm">
          <span className="text-xs font-semibold text-primary tracking-wider">360° VIEW</span>
        </div>
      </div>

      {/* Model Info */}
      <div className="space-y-4">
        <div>
          <h3 className="font-orbitron text-2xl font-bold text-foreground mb-2">
            {model.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {model.description}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3">
          <SpecItem 
            icon={<Battery className="w-4 h-4" />} 
            value={model.specs.range} 
            label="Range" 
          />
          <SpecItem 
            icon={<Zap className="w-4 h-4" />} 
            value={model.specs.power} 
            label="Power" 
          />
          <SpecItem 
            icon={<Gauge className="w-4 h-4" />} 
            value={model.specs.battery} 
            label="Battery" 
          />
        </div>

        {/* CTA Button */}
        <Link
          to={`/viewer/${model.slug}`}
          className="btn-neon w-full flex items-center justify-center gap-2 mt-4 group"
        >
          <span className="font-orbitron text-sm tracking-wider">View 360°</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const SpecItem = ({ 
  icon, 
  value, 
  label 
}: { 
  icon: React.ReactNode; 
  value: string; 
  label: string; 
}) => (
  <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-secondary/50 border border-glass-border">
    <div className="text-primary">{icon}</div>
    <span className="text-sm font-semibold text-foreground">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

const CarSilhouette = ({ color }: { color: string }) => (
  <svg 
    width="200" 
    height="80" 
    viewBox="0 0 200 80" 
    fill="none" 
    className="float-animation"
  >
    {/* Car body */}
    <path
      d="M20 50 L30 50 L40 35 L70 30 L130 30 L160 35 L170 50 L180 50 L180 55 L175 60 L165 60 L160 55 L40 55 L35 60 L25 60 L20 55 Z"
      fill={color}
      opacity="0.3"
    />
    <path
      d="M20 50 L30 50 L40 35 L70 30 L130 30 L160 35 L170 50 L180 50 L180 55 L175 60 L165 60 L160 55 L40 55 L35 60 L25 60 L20 55 Z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    {/* Windows */}
    <path
      d="M45 35 L72 32 L72 45 L48 48 Z"
      fill={color}
      opacity="0.5"
    />
    <path
      d="M75 32 L125 32 L125 45 L75 45 Z"
      fill={color}
      opacity="0.5"
    />
    <path
      d="M128 32 L155 35 L152 48 L128 45 Z"
      fill={color}
      opacity="0.5"
    />
    {/* Wheels */}
    <circle cx="50" cy="58" r="12" fill={color} opacity="0.6" />
    <circle cx="50" cy="58" r="8" fill="#0a0a0a" />
    <circle cx="50" cy="58" r="4" fill={color} opacity="0.8" />
    <circle cx="150" cy="58" r="12" fill={color} opacity="0.6" />
    <circle cx="150" cy="58" r="8" fill="#0a0a0a" />
    <circle cx="150" cy="58" r="4" fill={color} opacity="0.8" />
    {/* Headlights */}
    <rect x="172" y="45" width="8" height="3" rx="1" fill={color} />
    <rect x="20" y="45" width="8" height="3" rx="1" fill={color} />
  </svg>
);

export default EVCard;
