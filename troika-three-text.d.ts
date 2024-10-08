declare module 'troika-three-text' {
    import * as THREE from 'three';
    
    export class Text extends  THREE.Mesh{
      text: string;
      fontSize: number;
      color: string;
      anchorX: 'left' | 'center' | 'right';
      anchorY: 'top' | 'middle' | 'bottom';
      textAlign: 'left' | 'center' | 'right';
      strokeColor: string;
      strokeWidth: number;
      curveRadius: number;
      maxWidth: number;
      glyphGeometryDetail: number;
      sync: () => void;
    }
  }
  