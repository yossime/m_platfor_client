export interface MaterialProps {
  diffuseTexturePath?: string;
  normalTexturePath?: string;
  roughnessTexturePath?: string;
  metallicTexturePath?: string;
  emissionTexturePath?: string;
  color?: string | number;
  emissiveColor?: string | number;
  emissiveIntensity?: number;
  opacity?: number;
}

export const testMaterial: MaterialProps = {
  diffuseTexturePath:
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600",
  emissionTexturePath:
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600",
  color: "#ffffff",
  emissiveColor: "#ff8800",
  emissiveIntensity: 0.5,
  opacity: 0.9,
};

// Wood Material
export const woodMaterial: MaterialProps = {
  emissionTexturePath:
    "https://images.unsplash.com/photo-1580995861007-e20b4c9b8915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // Wood texture
  color: "#FFFFFF",
  opacity: 1,
};

// Metal Material
export const metalMaterial: MaterialProps = {
  emissionTexturePath:
    "https://images.unsplash.com/photo-1585405247634-4bfc512223b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // Metal texture
  color: "#FFFFFF",
  opacity: 1,
};

// Marble Material
export const marbleMaterial: MaterialProps = {
  diffuseTexturePath:
    "https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Marble texture
  color: "#FFFFFF",
  opacity: 1,
};

// Gold Material
export const goldMaterial: MaterialProps = {
  emissionTexturePath:
    "https://images.pexels.com/photos/2248589/pexels-photo-2248589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Gold texture
  color: "#FFD700",
  opacity: 1,
};

// Rubber Material
export const rubberMaterial: MaterialProps = {
  diffuseTexturePath:
    "https://images.unsplash.com/photo-1512163143273-bde3c66f34b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // Rubber texture
  color: "#000000",
  opacity: 1,
};

// Fabric Material
export const fabricMaterial: MaterialProps = {
  diffuseTexturePath:
    "https://images.unsplash.com/photo-1588795941016-c6c73e55f70b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // Fabric texture
  color: "#FFFFFF",
  opacity: 1,
};

// Leather Material
export const leatherMaterial: MaterialProps = {
  diffuseTexturePath:
    "https://images.unsplash.com/photo-1556821888-c4612c0066c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // Leather texture
  color: "#8B4513",
  opacity: 1,
};

// Concrete Material
export const concreteMaterial: MaterialProps = {
  diffuseTexturePath:
    "https://images.unsplash.com/photo-1541631955677-dc258e5fad81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // Concrete texture
  color: "#808080",
  opacity: 1,
};

// Emissive Material (Neon)
export const neonMaterial: MaterialProps = {
  color: "#000000",
  emissiveColor: "#00FF00",
  emissiveIntensity: 1,
  opacity: 1,
};

// Export all materials
export const materials = {
  woodMaterial,
  metalMaterial,
  marbleMaterial,
  goldMaterial,
  rubberMaterial,
  fabricMaterial,
  leatherMaterial,
  concreteMaterial,
  neonMaterial,
};
