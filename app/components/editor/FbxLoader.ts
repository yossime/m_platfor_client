// import React, { useEffect, useState } from 'react';
// import { Group, LoadingManager } from 'three';
// import { FBXLoader as ThreeFBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// interface FbxLoaderProps {
//   url: string;
//   onLoaded: (object: Group) => void;
//   onError?: (error: ErrorEvent) => void;
// }

// const FBXLoader: React.FC<FbxLoaderProps> = ({ url, onLoaded, onError }) => {
//   const [fbx, setFbx] = useState<Group | null>(null);
//   const loader = new ThreeFBXLoader(new LoadingManager());

//   useEffect(() => {
//     loader.load(
//       url,
//       (object) => {
//         setFbx(object);
//         onLoaded(object);
//     console.log('Loading FBX objectobjectobjectobject:', object);
//     // object.children[0].

//       },
//       undefined,
//       (error) => {
//         if (onError) {
//           onError(error);
//         } else {
//           console.error('Error loading FBX:', error);
//         }
//       }
//     );
//   }, [url, onLoaded, onError, loader]);

//   return null;
// };

// export default FBXLoader;




// import { FBXLoader as ThreeFBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { Group, LoadingManager } from 'three';

// interface LoaderOptions {
//   url: string;
//   onLoad: (object: Group) => void;
//   onProgress?: (event: ProgressEvent) => void;
//   onError?: (event: ErrorEvent) => void;
// }

// const loadFBX = ({ url, onLoad, onProgress, onError }: LoaderOptions): void => {
//   const loader = new ThreeFBXLoader(new LoadingManager());

//   loader.load(
//     url,
//     (object) => {
//       onLoad(object);
//       console.log('Loading FBX objectobjectobjectobject:', object);
//     },
//     undefined,
//     (error) => {
//       if (onError) {
//         onError(error);
//       } else {
//         console.error('Error loading FBX:', error);
//       }
//     }
//   );

// };

// export default loadFBX;








// import { FBXLoader as ThreeFBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { Group, LoadingManager } from 'three';

// interface LoaderOptions {
//   url: string;
//   onLoad: (object: Group) => void;
//   onProgress?: (event: ProgressEvent) => void;
//   onError?: (event: ErrorEvent | Error) => void;
// }

// const loadFBX = ({ url, onLoad, onProgress, onError }: LoaderOptions): void => {
//   const loader = new ThreeFBXLoader(new LoadingManager());

//   loader.load(
//     url,
//     (object) => {
//       onLoad(object);
//       console.log('Loading FBX object:', object);
//     },
//     (event) => {
//       if (onProgress) {
//         onProgress(event);
//       } else {
//         console.log(`Loading progress: ${(event.loaded / event.total) * 100}%`);
//       }
//     },
//     (error) => {
//       if (onError) {
//         onError(error);
//       } else {
//         console.error('Error loading FBX:', error);
//       }
//     }
//   );
// };

// export default loadFBX;



export {}