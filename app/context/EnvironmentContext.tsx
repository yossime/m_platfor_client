import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Texture } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

interface EnvironmentContextProps {
  currentEnvironment: Texture | null;
  setCurrentEnvironment: (texture: Texture | null) => void;
  filePaths: string[];
  setFilePaths: (paths: string[]) => void;
  textures: Texture[];
  loadTexturesByIndices: (indices: number[]) => Promise<void>;
}

const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(
  undefined
);

export const EnvironmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentEnvironment, setCurrentEnvironment] = useState<Texture | null>(
    null
  );
  const [filePaths, setFilePaths] = useState<string[]>([
    "https://storage.googleapis.com/library-all-test/hdri/industrial_sunset_puresky_4k.hdr",
    "https://storage.googleapis.com/library-all-test/hdri/rosendal_park_sunset_puresky_8k.hdr",
    "https://storage.googleapis.com/library-all-test/hdri/rosendal_park_sunset_4k.hdr"
  ]);
  const [textures, setTextures] = useState<Texture[]>([]);

  useEffect(() => {
    const loadFirstTwoTextures = async () => {
      const loader = new RGBELoader();
      const loadedTextures: Texture[] = [];

      for (let i = 0; i < Math.min(filePaths.length, 2); i++) {
        try {
          const texture = await loader.loadAsync(filePaths[i]);
          loadedTextures.push(texture);
        } catch (error) {
          console.error(
            `Error loading texture from path: ${filePaths[i]}`,
            error
          );
        }
      }

      setTextures(loadedTextures);
    };

    if (filePaths.length > 0) {
      loadFirstTwoTextures();
    }
  }, [filePaths]);

  const loadTexturesByIndices = async (indices: number[]) => {
    const loader = new RGBELoader();
    const loadedTextures: Texture[] = [...textures];

    for (const index of indices) {
      if (index < filePaths.length) {
        try {
          const texture = await loader.loadAsync(filePaths[index]);
          loadedTextures.push(texture);
        } catch (error) {
          console.error(
            `Error loading texture from path: ${filePaths[index]}`,
            error
          );
        }
      }
    }

    setTextures(loadedTextures);
  };

  return (
    <EnvironmentContext.Provider
      value={{
        currentEnvironment,
        setCurrentEnvironment,
        filePaths,
        setFilePaths,
        textures,
        loadTexturesByIndices,
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
