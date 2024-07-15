// import React from 'react';
// import { useLoader } from 'react-three-fiber';
// import { TextureLoader } from 'three';



// const AddImage: React.FC = () => {
//     const texture = useLoader(TextureLoader, '/images/logo/Frame 1261155245.png');

//   return (
//     <mesh>
//     <planeGeometry args={[1, 1]} />
//     <meshBasicMaterial map={texture} />
//   </mesh>
//   );
// };

// export default AddImage;






import { VideoTexture } from 'three';

export const VideoObject = () => {
  const video = document.createElement('video');
  // video.src = '/FbxHdrGlb/אדם - סוד.mp4';
  video.crossOrigin = 'Anonymous';
  video.loop = true;
  video.muted = true;
  video.play();

  return (
    <mesh>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
};
