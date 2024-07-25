import { useLoader, ThreeEvent } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import { Object3D, Mesh, Group, Color, MeshStandardMaterial  } from "three";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { LoadMaterial } from "./loadMaterial";
import { MaterialParams } from "./paramsType";
import { EMode, useEditor } from "@/context/useEditorContext";
import Board from "./models/boards/Borad";


const API = process.env.NEXT_PUBLIC_BACKEND_URL!

const Architecture = () => {
  const { setCurrentMode, currentMode, setCameraPosition, cameraDirection, setCameraDirection, dataParameters, setDataParameters } = useEditor();
  if (!dataParameters.architecture) return null;
  const params = dataParameters;
  const url = `${API}/project/fbx/${params.architecture}`;


  const architectureFbx = useLoader(FBXLoader, url) as Object3D;
  const architectureRef = useRef<Group>(null);
  const emptySlotsRef = useRef<Group>(null);


  const [emptySlots, setEmptySlots] = useState<Object3D[]>([]);
  const [slots, setSlots] = useState<Object3D[] | null>(null);

  // const textures: Record<string, Texture> = {};
  // parts.forEach(part => {
  //   textures[part.name] = useLoader(TextureLoader, part.initialTexturePath);
  // });

  const boards = params.boards;


  const getSlots = () => {
    const slots: Object3D[] = [];
    architectureFbx.traverse((child) => {
      if (child.name.startsWith('Slot_')) {
        slots.push(child);
      }
    })
    slots.sort((a, b) => {
      const numA = parseInt(a.name.split('_')[1]);
      const numB = parseInt(b.name.split('_')[1]);
      return numA - numB;
    });
    return slots;
  }
  // const slots1 = getSlots()
  // setSlots(slots1);

  const buildTexture = async (materialParams: MaterialParams, mash: Mesh) => {
    const boradMaterial = await LoadMaterial(materialParams)
    mash.material = boradMaterial;
  }


  useEffect(() => {
    if (!architectureFbx) return;

    const slots = getSlots();

    const emptySlots1 = slots.filter((slot, index) => (index >= boards.length || boards[index].type === null));
    setEmptySlots(emptySlots1);
    setSlots(slots);

    const arcMash = architectureFbx.children[0] as Mesh;

    buildTexture(params.materialParams, arcMash);


    architectureFbx.children[0].children = [];

    // if (currentMode == EMode.AddBorad) {
    // console.log("emptySlots.length", emptySlots1.length);

    //   architectureFbx.children[0].children = [...emptySlots1];
    // }

    architectureRef.current?.add(architectureFbx);
    // console.log("emptySlots.length", emptySlots.length);
    // emptySlotsRef.current?.add(...emptySlots);
    // emptySlots.forEach(slot => emptySlotsRef.current?.add(slot));
    // slots !== null ?? slots.forEach((slot, index) => { console.log("slot", slot) });
  }, [params]);


  useEffect(() => {
    if (currentMode === EMode.AddBorad) {
      architectureFbx.children[0].children = [...emptySlots];
    }
  }, [currentMode, emptySlots]);


  const handleSelectArc = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();


    if (event.object instanceof Mesh) {
      // console.log("clicked");
      const highlightMaterial = new MeshStandardMaterial({
        color: new Color('pink'),
        opacity: 0.5,
        transparent: true,
        wireframe: true,
        // map: texture,
      });

      event.object.material = highlightMaterial;
    }

  };



 


  const handleSelectEmptySlot = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    console.log("handleSelectEmptySlot.name", event.object.name);

    if (event.object instanceof Mesh) {
      // console.log("clicked");
      const highlightMaterial = new MeshStandardMaterial({
        color: new Color('blue'),
        opacity: 0.5,
        transparent: true,
        wireframe: true,
        // map: texture,
      });

      event.object.material = highlightMaterial;
    }

  };

  return (
    <group ref={architectureRef} onPointerDown={handleSelectArc} >

      {slots && boards.map((board, index) => (
        <group key={index}>
          <Board board={board} slotPlaceholder={slots[index]} />
        </group>

      ))}
    </group>
  );
};

export default Architecture;