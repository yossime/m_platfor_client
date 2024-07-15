import { Mesh, Object3D } from "three";

export const LaoderChildren = (obj: Object3D, onclicked: (mesh: Mesh ) => void ): JSX.Element[] => {

    return obj.children.flatMap(child => {
      if (child instanceof Mesh) {
        return (
          <mesh
            key={child.uuid}
            geometry={child.geometry}
            material={child.material}
            position={child.position}
            rotation={child.rotation}
            scale={child.scale}
            onClick={() => onclicked(child)}
          />
        );
      } else if (child instanceof Object3D) {
        return LaoderChildren(child, onclicked);
      } else {
        return [];
      }
    });
  };
  