import { useEditor } from "@/context/useEditorContext";
import { useState } from "react";
import { Color } from "three";



const ControlsPanel: React.FC = () => {
    const {currentMesh} = useEditor();
    const [selectedColor, setSelectedColor] = useState<string>('');
  
    const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;
      setSelectedColor(newColor);
      if (currentMesh) {
        if (newColor.match(/^#[0-9a-fA-F]{6}$/)) {
          (currentMesh.material as any).color.set(new Color(newColor));
        }
      }
    };
  
    return (
      <div style={{ position: 'absolute', top: 10, left: 10 }}>
        <p>Selected Color: {selectedColor}</p>
        <input
          type="color"
          value={selectedColor}
          onChange={handleChangeColor}
        />
      </div>
    );
  };
  
  
  export default ControlsPanel;