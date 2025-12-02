export interface EVModel {
  id: string;
  name: string;
  slug: string;
  description: string;
  specs: {
    range: string;
    battery: string;
    power: string;
    acceleration: string;
    topSpeed: string;
  };
  colors: {
    primary: string;
    accent: string;
    interior: string;
  };
}

export const evModels: EVModel[] = [
  {
    id: "1",
    name: "Harrier EV",
    slug: "harrier-ev",
    description: "A premium electric SUV with bold design, commanding presence, and exceptional range for long journeys.",
    specs: {
      range: "450 km",
      battery: "80 kWh",
      power: "250 hp",
      acceleration: "0-100 in 6.5s",
      topSpeed: "180 km/h",
    },
    colors: {
      primary: "#1a1a2e",
      accent: "#00d4ff",
      interior: "#2d2d44",
    },
  },
  {
    id: "2",
    name: "Nexon EV",
    slug: "nexon-ev",
    description: "Compact electric SUV with city-friendly performance, agile handling, and smart connectivity features.",
    specs: {
      range: "320 km",
      battery: "50 kWh",
      power: "150 hp",
      acceleration: "0-100 in 8.9s",
      topSpeed: "150 km/h",
    },
    colors: {
      primary: "#0f3460",
      accent: "#e94560",
      interior: "#16213e",
    },
  },
  {
    id: "3",
    name: "Tesla EV",
    slug: "tesla-ev",
    description: "High-performance electric sedan with cutting-edge autonomous tech, ludicrous acceleration, and minimalist luxury.",
    specs: {
      range: "550 km",
      battery: "90 kWh",
      power: "350 hp",
      acceleration: "0-100 in 3.2s",
      topSpeed: "250 km/h",
    },
    colors: {
      primary: "#1e1e1e",
      accent: "#ff0055",
      interior: "#2a2a2a",
    },
  },
];

export const getModelBySlug = (slug: string): EVModel | undefined => {
  return evModels.find((model) => model.slug === slug);
};
