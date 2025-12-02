import { 
  RotateCcw, 
  Maximize, 
  Minimize, 
  Car, 
  Armchair,
  RefreshCw,
  Pause,
  Play
} from "lucide-react";

interface ViewerControlsProps {
  viewMode: "exterior" | "interior";
  setViewMode: (mode: "exterior" | "interior") => void;
  autoRotate: boolean;
  setAutoRotate: (rotate: boolean) => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onResetCamera: () => void;
}

const ViewerControls = ({
  viewMode,
  setViewMode,
  autoRotate,
  setAutoRotate,
  isFullscreen,
  onToggleFullscreen,
  onResetCamera,
}: ViewerControlsProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
      <div className="glass-card neon-border px-2 py-2 flex items-center gap-2">
        {/* View Mode Toggle */}
        <div className="flex items-center bg-secondary/50 rounded-lg p-1">
          <button
            onClick={() => setViewMode("exterior")}
            className={`btn-glass flex items-center gap-2 ${
              viewMode === "exterior" ? "active" : ""
            }`}
          >
            <Car className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Exterior</span>
          </button>
          <button
            onClick={() => setViewMode("interior")}
            className={`btn-glass flex items-center gap-2 ${
              viewMode === "interior" ? "active" : ""
            }`}
          >
            <Armchair className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Interior</span>
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-glass-border" />

        {/* Auto Rotate Toggle (only for exterior) */}
        {viewMode === "exterior" && (
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`btn-glass flex items-center gap-2 ${autoRotate ? "active" : ""}`}
            title={autoRotate ? "Stop Auto-Rotate" : "Start Auto-Rotate"}
          >
            {autoRotate ? (
              <Pause className="w-4 h-4" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            <span className="hidden sm:inline text-sm">
              {autoRotate ? "Stop" : "Rotate"}
            </span>
          </button>
        )}

        {/* Reset Camera */}
        <button
          onClick={onResetCamera}
          className="btn-glass flex items-center gap-2"
          title="Reset Camera"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Reset</span>
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="btn-glass flex items-center gap-2"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4" />
          ) : (
            <Maximize className="w-4 h-4" />
          )}
          <span className="hidden sm:inline text-sm">
            {isFullscreen ? "Exit" : "Fullscreen"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ViewerControls;
