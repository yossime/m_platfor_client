import { Text } from "@react-three/drei";

interface Props {
    text: string;
    radius: number;
    height: number;
    segments: number;
  }
  
  export default function Ring({ text, radius, height, segments }: Props) {
    // Calculate positions for text
    const textPositions: { x: number; z: number }[] = [];
    const angleStep = (2 * Math.PI) / text.length;
    for (let i = 0; i < text.length; i++) {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      textPositions.push({ x, z });
    }
  
    return (
      <group>
        <mesh>
          <cylinderGeometry args={[radius, radius, height, segments]} />
          <meshBasicMaterial />
        </mesh>
        {text.split("").map((char: string, index: number) => (
          <Text
            key={index}
            position={[textPositions[index].x, 0, textPositions[index].z]}
            rotation={[0, -angleStep * index + Math.PI / 2, 0]}
            fontSize={0.3}
            lineHeight={1}
            letterSpacing={0.02}
            color="white"
            textAlign="center"
          >
            {char}
          </Text>
        ))}
      </group>
    );
  }