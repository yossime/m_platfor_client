"use client"
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EMode, useEditor } from '@/context/useEditorContext';
import { IHeaderBoard, IParams, IProductBoard } from '../interface/paramsType';
import Architecture from '../Architecture';
import { ConvexMeshFromFBX } from '../TextLoader';
import styled from 'styled-components';

export const ViewportContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const headerBoard: IHeaderBoard = {
    name: 'headerboard',
    type: 'HeaderBoard',
    title: {
        text: "Welcome to Our Store",
        color: "#ffffff",
        scale: [1, 1, 1]
    },
    subTitle: {
        text: "subTitle",
        color: "#ffffff",
        scale: [1, 1, 1]
    },
    materialParams: { video: 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/video_1.mp4?alt=media&token=d948abc7-d187-4612-b315-8109faf98b84' },
}



const productBoard: IProductBoard = {
    name: '',
    materialParams: { map: 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/textura_4.jpeg?alt=media&token=642299bf-7758-4516-a0ae-9ac132c26c9f', color: 'pink' },
    type: 'ProductBoard',
    title: {
        text: "Welcome to Our Store",
        color: "#ffffff",
        scale: [1, 1, 1]
    },
    displays: [
        {
            title: {
                text: "Welcome to Our Store",
                color: "#ffffff",
                scale: [1, 1, 1]
            },
            type: 'blup1',
            products: [
                {
                    title: {
                        text: "Welcome to Our Store",
                        color: "#ffffff",
                        scale: [1, 1, 1]
                    },
                    price:{text: "$299"},
                    buttons: {
                        addToCart: "Add to Cart",
                        quickView: "Quick View",
                        buyNow: "Buy Now"
                    },
                    type: 'Product02',
                }
            ]
        },
        {
            title: {
                text: "Welcome to Our Store",
                color: "#ffffff",
                scale: [1, 1, 1]
            },
            type: 'blup1',
            products: [
                {
                    title: {
                        text: "Welcome to Our Store",
                        color: "#ffffff",
                        scale: [1, 1, 1]
                    },
                    price:{text: "$299"},
                    buttons: {
                        addToCart: "Add to Cart",
                        quickView: "Quick View",
                        buyNow: "Buy Now"
                    },
                    type: 'Product02',
                }
            ]
        },
        {
            title: {
                text: "Welcome to Our Store",
                color: "#ffffff",
                scale: [1, 1, 1]
            },
            type: 'blup1',
            products: [
                {
                    title: {
                        text: "Welcome to Our Store",
                        color: "#ffffff",
                        scale: [1, 1, 1]
                    },
                    price:{text: "$299"},
                    buttons: {
                        addToCart: "Add to Cart",
                        quickView: "Quick View",
                        buyNow: "Buy Now"
                    },
                    type: 'Product02',
                }
            ]
        },
        {
            title: {
                text: "Welcome to Our Store",
                color: "#ffffff",
                scale: [1, 1, 1]
            },
            type: 'blup1',
            products: [
                {
                    title: {
                        text: "Welcome to Our Store",
                        color: "#ffffff",
                        scale: [1, 1, 1]
                    },
                    price:{text: "$299"},
                    buttons: {
                        addToCart: "Add to Cart",
                        quickView: "Quick View",
                        buyNow: "Buy Now"
                    },
                    type: 'Product02',
                }
            ]
        }
    ]
}



const params: IParams = {
    architecture: "Barbiz",
    materialParams: { color: 'purple' },
    maxSlot: 5,
    boards: [
        headerBoard,
        productBoard,
    ],
}




const Viewport: React.FC = () => {
    const [selectedSlot, setSelectedSlot] = useState<string>('');
    const [selectedPBord, setSelectedBord] = useState<string>('')
    const [error, setError] = useState<string | null>(null);
    const [archColor, setArchColor] = useState<string>('yellow');



    const { setCurrentMode, dataParameters, setDataParameters } = useEditor();
    // useEffect(() => {
    //     setDataParameters(params);
    // }, [params]);

    const changeBoardType = (event: React.FormEvent) => {
        event.preventDefault();
        const index = parseInt(selectedSlot);
        if (index >= 0 && index < params.boards.length) {
            params.boards[index].type = selectedPBord;
            setDataParameters({ ...params });
        } else {
            setError('Index out of bounds');
        }
    }

    const changeArcColor = (event: React.FormEvent) => {
        event.preventDefault();
        params.materialParams.color = archColor;
        setDataParameters({ ...params });
    }




    return (
        <ViewportContainer>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {/* <form onSubmit={changeBoardType}>
                <input
                    type='number'
                    placeholder='select slot number'
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='select bord type'
                    value={selectedPBord}
                    onChange={(e) => setSelectedBord(e.target.value)}
                />
                <button type='submit'>Change</button>
            </form> */}

            <form onSubmit={changeArcColor}>
                {/* <input
                    type='text'
                    placeholder='select bord type'
                    value={archColor}
                    onChange={(e) => setArchColor(e.target.value)}
                /> */}
                {/* <button type='submit'>Change arch color</button> */}
            </form>

            {/* <br />

            <button onClick={() => setCurrentMode(EMode.AddBorad)}>Add borad</button>
            <br />
            <br /> */}

            <div style={{ position: 'absolute', width: '100%', height: '100%' }}>


                <Canvas style={{ height: '100%', width: '100%' }}>
                    <OrbitControls />
                    <ambientLight />
                    <gridHelper args={[100, 100, 0xff0000, 'teal']} />
                    {/* <ConvexMeshFromFBX/> */}
                    <Architecture />
                </Canvas>
            </div>
        </ViewportContainer>
    );
};

export default Viewport;