import { ContentMaterial, ICustomMaterial } from "../types";



export const barkMaterial: ContentMaterial = {
  materialName: "Bark",
  customMaterial: {
    diffuse: {
      map: "./Bark014_8K-JPG_Color.jpg",
      color: "#ffffff",
    },
    normal: {
      map: "./Bark014_8K-JPG_NormalGL.jpg",
      intensity: 1.0,
    },
    roughness: {
      map: "./Bark014_8K-JPG_Roughness.jpg",
      intensity: 1.0,
    },
    opacity: {
      value: 1,
    },
    metalness: {
      value: 0,
    },
    tint: {
      value: 0.1,
    },
  },
  materialImage: "./Bark014_8K-JPG_Color.jpg",
};

export const woodMaterial: ContentMaterial = {
  materialName: "Wood",
  customMaterial: {
    emission: {
      map: "/textures/weathered-wooden-surface_1249-32.png",
    },
    diffuse: {
      map: "/textures/weathered-wooden-surface_1249-32.png",
    },
    opacity: {
      value: 1,
    },
  },
  materialImage: "/textures/weathered-wooden-surface_1249-32.png",
};

export const marbleMaterial: ContentMaterial = {
  materialName: "Marble",
  customMaterial: {
    diffuse: {
      map: "https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    opacity: {
      value: 1,
    },
  },
  materialImage: "https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

export const goldMaterial: ContentMaterial = {
  materialName: "Gold",
  customMaterial: {
    emission: {
      map: "https://images.cnbctv18.com/uploads/2024/07/shutterstock-2315967489-2024-07-896154553c54c07328481c63c5fc50e0-scaled.jpg?impolicy=website&width=640&height=360",
    },
    diffuse: {
      map: "https://images.cnbctv18.com/uploads/2024/07/shutterstock-2315967489-2024-07-896154553c54c07328481c63c5fc50e0-scaled.jpg?impolicy=website&width=640&height=360",
    },
    opacity: {
      value: 1,
    },
  },
  materialImage: "https://images.cnbctv18.com/uploads/2024/07/shutterstock-2315967489-2024-07-896154553c54c07328481c63c5fc50e0-scaled.jpg?impolicy=website&width=640&height=360",
};

export const leatherMaterial: ContentMaterial = {
  materialName: "Leather",
  customMaterial: {
    diffuse: {
      map: "https://images.unsplash.com/photo-1556821888-c4612c0066c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "#8B4513",
    },
    opacity: {
      value: 1,
    },
  },
  materialImage: "https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

export const concreteMaterial: ContentMaterial = {
  materialName: "Concrete",
  customMaterial: {
    diffuse: {
      map: "https://images.unsplash.com/photo-1541631955677-dc258e5fad81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      color: "#808080",
    },
    opacity: {
      value: 1,
    },
  },
  materialImage: "https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
};

export const neonMaterial: ContentMaterial = {
  materialName: "Neon",
  customMaterial: {
    diffuse: {
      color: "#000000",
    },
    emission: {
      color: "#00FF00",
      intensity: 1,
    },
    opacity: {
      value: 1,
    },
  },
  materialImage: "https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

};

export const glassMaterial: ContentMaterial = {
  materialName: "Glass",
  customMaterial: {
    diffuse: {
      color: "#ffffff",
    },
    emission: {
      color: "#000000",
      intensity: 0,
    },
    opacity: {
      value: 1,
    },
    roughness: {
      value: 0,
    },
    metalness: {
      value: 0,
    },
    tint: {
      value: 0.9,
    },
  },
  materialImage: "https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

};

export const metalMaterial: ContentMaterial = {
  materialName: "Metal",
  customMaterial: {
    diffuse: {
      color: "#aaaaaa",
    },
    emission: {
      color: "#000000",
      intensity: 0,
    },
    opacity: {
      value: 1,
    },
    roughness: {
      value: 0.3,
    },
    metalness: {
      value: 1,
    },
    tint: {
      value: 0.8,
    },
  },
  materialImage: "https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

};

export const materials = {
  barkMaterial,
  woodMaterial,
  metalMaterial,
  marbleMaterial,
  goldMaterial,
  leatherMaterial,
  concreteMaterial,
  neonMaterial,
  glassMaterial,
};


export enum MaterialNames {
  Bark = "Bark",
  Wood = "Wood",
  Metal = "Metal",
  Marble = "Marble",
  Gold = "Gold",
  Leather = "Leather",
  Concrete = "Concrete",
  Neon = "Neon",
  Glass = "Glass",
}

export const materialMap: Record<MaterialNames, ContentMaterial> = {
  [MaterialNames.Bark]: barkMaterial,
  [MaterialNames.Wood]: woodMaterial,
  [MaterialNames.Metal]: metalMaterial,
  [MaterialNames.Marble]: marbleMaterial,
  [MaterialNames.Gold]: goldMaterial,
  [MaterialNames.Leather]: leatherMaterial,
  [MaterialNames.Concrete]: concreteMaterial,
  [MaterialNames.Neon]: neonMaterial,
  [MaterialNames.Glass]: glassMaterial,
};

