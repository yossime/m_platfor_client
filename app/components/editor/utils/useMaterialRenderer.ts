import { useEffect, useRef } from 'react';
import { Material2D, MaterialRenderer } from './materialRenderer';

export const useMaterialRenderer = (material: Material2D) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderer = new MaterialRenderer(canvasRef.current);
      renderer.render(material).catch(console.error);
    }
  }, [material]);

  return canvasRef;
};