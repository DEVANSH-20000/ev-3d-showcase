import { useState, useCallback, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Info } from "lucide-react";
import Scene from "@/components/3d/Scene";
import ViewerControls from "@/components/ViewerControls";
import SpecsPanel from "@/components/SpecsPanel";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getModelBySlug } from "@/data/evModels";

const Viewer = () => {
  const { slug } = useParams<{ slug: string }>();
  const model = getModelBySlug(slug || "");
  
  const [viewMode, setViewMode] = useState<"exterior" | "interior">("exterior");
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSpecs, setShowSpecs] = useState(true);
  const [resetTrigger, setResetTrigger] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(console.error);
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(console.error);
    }
  }, []);

  const handleResetCamera = useCallback(() => {
    setResetTrigger((prev) => prev + 1);
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (!model) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-orbitron text-4xl font-bold text-foreground mb-4">
            Model Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The vehicle you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn-neon">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner message={`Loading ${model.name}...`} />;
  }

  return (
    <>
      <Helmet>
        <title>{model.name} | 360° 3D Viewer | EV Dashboard</title>
        <meta 
          name="description" 
          content={`Explore the ${model.name} in immersive 360° 3D. ${model.description}`} 
        />
      </Helmet>

      <div 
        ref={containerRef}
        className="relative w-full h-screen bg-background overflow-hidden"
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 glass-card border-b border-glass-border">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="btn-glass flex items-center gap-2 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Link>
              
              <div className="h-6 w-px bg-glass-border" />
              
              <div>
                <h1 className="font-orbitron text-xl font-bold text-foreground">
                  {model.name}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {viewMode === "exterior" ? "Exterior View" : "Interior View"} • 360° Interactive
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className={`btn-glass flex items-center gap-2 ${showSpecs ? "active" : ""}`}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">Specs</span>
            </button>
          </div>
        </div>

        {/* 3D Scene */}
        <Scene
          viewMode={viewMode}
          autoRotate={autoRotate}
          accentColor={model.colors.accent}
          resetTrigger={resetTrigger}
        />

        {/* Specs Panel */}
        {showSpecs && <SpecsPanel model={model} />}

        {/* Controls */}
        <ViewerControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          autoRotate={autoRotate}
          setAutoRotate={setAutoRotate}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          onResetCamera={handleResetCamera}
        />

        {/* Instructions Hint */}
        <div className="absolute bottom-20 left-6 z-10 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
          <div className="glass-card px-4 py-2 text-xs text-muted-foreground">
            <span className="text-primary">Drag</span> to rotate • 
            <span className="text-primary"> Scroll</span> to zoom • 
            <span className="text-primary"> Pan</span> to move
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewer;
