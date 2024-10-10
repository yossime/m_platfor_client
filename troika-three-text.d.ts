declare module 'troika-three-text' {
    import * as THREE from 'three';

    export enum FontWeight {
      Normal = 'normal',
      Bold = 'bold',
      Bolder = 'bolder',
      Lighter = 'lighter',
    }
    
    export enum TextAlign {
      Left = 'left',
      Center = 'center',
      Right = 'right',
      Justify = 'justify',
    }
    
    export class Text extends  THREE.Mesh{
      text: string;
      font: string | undefined;
      fontSize: number;
      fontWeight: FontWeight;
      anchorX: 'left' | 'center' | 'right';
      anchorY: 'top' | 'middle' | 'bottom';
      textAlign: 'left' | 'center' | 'right' | 'justify';
      lineHeight: number;
      letterSpacing: number;
      strokeWidth: number;
      curveRadius: number;
      outlineColor: string;
      maxWidth: number;
      color: string;
      glyphGeometryDetail: number;
      sync: () => void;
    }
  }
  