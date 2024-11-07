"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Texture } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import * as THREE from 'three';

interface Environment {
  name: string;
  image: string;
  texture: Texture;
}

interface EnvironmentPath {
  name: string;
  image: string;
  path: string;
}

interface EnvironmentContextProps {
  currentEnvironment: Environment | null;
  setCurrentEnvironment: (texture: Environment | null) => void;
  environmentsPaths: EnvironmentPath[];
  setEnvironmentsPaths: (envs: EnvironmentPath[]) => void;
  environment: Environment[];
  setEnvironment: (indices: number[]) => Promise<void>;
  loadTextureByName: (fileName: string) => void;
}

const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(
  undefined
);

export const EnvironmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentEnvironment, setCurrentEnvironment] =
    useState<Environment | null>(null);
  const [environmentsPaths, setEnvironmentsPaths] = useState<EnvironmentPath[]>(
    [
      {
        name: "Industrial Sunset",
        image: "industrial_sunset.jpg",
        path: "https://storage.googleapis.com/library-all-test/hdri/industrial_sunset_puresky_4k.hdr",
      },
      {
        name: "Rosendal Park Sunset",
        image: "rosendal_park_sunset.jpg",
        path: "https://storage.googleapis.com/library-all-test/hdri/rosendal_park_sunset_puresky_8k.hdr",
      },
      {
        name: "Rosendal Park 4K",
        image: "rosendal_park_4k.jpg",
        path: "https://storage.googleapis.com/library-all-test/hdri/rosendal_park_sunset_4k.hdr",
      },
    ]
  );
  const [environment, setEnvironment] = useState<Environment[]>([]);

  // useEffect(() => {
  //   const loadFirstTwoTextures = async () => {
  //     const loader = new RGBELoader();
  //     const loadedTextures: Environment[] = [];

  //     for (let i = 0; i < Math.min(environmentsPaths.length, 2); i++) {
  //       try {
  //         const texture = await loader.loadAsync(environmentsPaths[i].path);
  //         loadedTextures.push({
  //           name: environmentsPaths[i].name,
  //           image: environmentsPaths[i].image,
  //           texture: texture,
  //         });
  //       } catch (error) {
  //         console.error(`Error loading texture from path: ${environmentsPaths[i].path}`, error);
  //       }
  //     }

  //     setEnvironment(loadedTextures);
  //   };

  //   if (environmentsPaths.length > 0) {
  //     loadFirstTwoTextures();
  //   }
  // }, [environmentsPaths]);


  const loadTexturesByIndices = async (indices: number[]) => {
    const loader = new RGBELoader();
    const updatedTextures = [...environment];

    for (const index of indices) {
      if (index < environmentsPaths.length) {
        try {
          const texture = await loader.loadAsync(environmentsPaths[index].path);
          updatedTextures.push({
            name: environmentsPaths[index].name,
            image: environmentsPaths[index].image,
            texture: texture,
          });
        } catch (error) {
          console.error(
            `Error loading texture from path: ${environmentsPaths[index].path}`,
            error
          );
        }
      }
    }

    setEnvironment(updatedTextures);
  };

  // const loadTextureByName = async (name: string) => {
  //   const loader = new RGBELoader();
  //   const basePath = "https://storage.googleapis.com/library-all-test/hdri/";
  //   const fullPath = `${basePath}${name}.hdr`;

  //   try {
  //     const texture = await loader.loadAsync(fullPath);
  //     const newEnvironment: Environment = {
  //       name: name,
  //       image: `${name}.jpg`,
  //       texture: texture,
  //     };
  //     setCurrentEnvironment(newEnvironment);
  //   } catch (error) {
  //     console.error(`Error loading texture from path: ${fullPath}`, error);
  //   }
  // };



  const loadTextureByName = async (
    name: string,
    options: {
      mapping?: THREE.Mapping;
      wrapS?: THREE.Wrapping;
      wrapT?: THREE.Wrapping;
      repeat?: THREE.Vector2;
      rotation?: number;
      intensity?: number;
    } = {}
  ) => {
    const loader = new RGBELoader();
    const basePath = "https://storage.googleapis.com/library-all-test/hdri/";
    const fullPath = `${basePath}${name}.hdr`;
  
    try {
      const texture = await loader.loadAsync(fullPath);
  
      // Apply texture settings based on options
      texture.mapping = options.mapping || THREE.EquirectangularReflectionMapping;
      texture.wrapS = options.wrapS || THREE.ClampToEdgeWrapping;
      texture.wrapT = options.wrapT || THREE.ClampToEdgeWrapping;
      texture.repeat?.copy(options.repeat || new THREE.Vector2(2, 2));
      texture.rotation = options.rotation || 0;
      texture.colorSpace = "srgb-linear"
  
      // Optional intensity setting
      if (options.intensity !== undefined) {
        texture.userData = { intensity: options.intensity };
      }
  
      const newEnvironment: Environment = {
        name: name,
        image: `${name}.jpg`,
        texture: texture,
      };
      setCurrentEnvironment(newEnvironment);
    } catch (error) {
      console.error(`Error loading texture from path: ${fullPath}`, error);
    }
  };
  

  return (
    <EnvironmentContext.Provider
      value={{
        currentEnvironment,
        setCurrentEnvironment,
        environmentsPaths: environmentsPaths,
        setEnvironmentsPaths: setEnvironmentsPaths,
        environment: environment,
        setEnvironment: loadTexturesByIndices,
        loadTextureByName,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironmentContext = (): EnvironmentContextProps => {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error(
      "useEnvironmentContext must be used within an EnvironmentProvider"
    );
  }
  return context;
};
