"use client"
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {OrbitControls } from '@react-three/drei';
import { EMode, useEditor } from '@/context/useEditorContext';
import { IHeaderBoard, IParams, IProductBoard } from '../interface/paramsType';
import Architecture from '../Architecture';



const headerBoard: IHeaderBoard = {
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
    materialParams: { map: 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/textura_4.jpeg?alt=media&token=642299bf-7758-4516-a0ae-9ac132c26c9f', color: 'pink' },
}



const productBoard: IProductBoard = {
    materialParams: { map: 'textura_3.jpeg', color: 'pink' },
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
            products: [
                {
                    title: {
                        text: "Welcome to Our Store",
                        color: "#ffffff",
                        scale: [1, 1, 1]
                    },
                    price: {text:"$299"},
                    buttons: {
                        addToCart: "Add to Cart",
                        quickView: "Quick View",
                        buyNow: "Buy Now"
                    },
                    type: 'blup1',
                    materialParams: { map: 'textura_3.jpeg', color: 'pink' },
                }
            ],
            type: 'blup1'
        },
        {
            title: {
                text: "Welcome to Our Store",
                color: "#ffffff",
                scale: [1, 1, 1]
            },
            products: [
                {
                    title: {
                        text: "Welcome to Our Store",
                        color: "#ffffff",
                        scale: [1, 1, 1]
                    },
                    price: {text:"$299"},
                    buttons: {
                        addToCart: "Add to Cart",
                        quickView: "Quick View",
                        buyNow: "Buy Now"
                    },
                    type: 'blup1',
                    materialParams: { map: 'textura_3.jpeg', color: 'pink' },
                }
            ],
            type: 'blup1',
            materialParams: null
        }
    ]
}


// product: [
//     {
//         title: {
//             text: "Welcome to Our Store",
//             color: "#ffffff",
//             scale: [1, 1, 1]
//         },
//         price: "$299",
//         buttons: {
//             addToCart: "Add to Cart",
//             quickView: "Quick View",
//             buyNow: "Buy Now"
//         },
//         type: 'blup1',
//         materialParams: { map: 'textura_3.jpeg', color: 'pink' },
//     },
//     {
//         title: {
//             text: "Welcome to Our Store",
//             color: "#ffffff",
//             scale: [1, 1, 1]
//         },
//         price: "$299",
//         buttons: {
//             addToCart: "Add to Cart",
//             quickView: "Quick View",
//             buyNow: "Buy Now"
//         },
//         type: 'blup1',
//         materialParams: { map: 'textura_3.jpeg', color: 'pink' },
//     }
// ]

const params: IParams = {
    architecture: "Barbiz_Skeleton4",
    materialParams: { color: 'yellow' },
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
    useEffect(() => {
        // setDataParameters(params);
        console.log("dataParameters", dataParameters);
    }, [params]);

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


// console.log("dataParameters", dataParameters);

    return (
        <>
            {/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
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

            {/* <form onSubmit={changeArcColor}>
                <input
                    type='text'
                    placeholder='select bord type'
                    value={archColor}
                    onChange={(e) => setArchColor(e.target.value)}
                />
                <button type='submit'>Change arch color</button>
            </form> */}
{/* 
            <br />

            <button onClick={() => setCurrentMode(EMode.AddBorad)}>Add borad</button>
            <br />
            <br /> */}

            <div style={{  width: '100%', height:'100%'}}>


                <Canvas>
                    <OrbitControls />
                    <ambientLight />
                    <Architecture />
                </Canvas>
            </div>
        </>
    );
};

export default Viewport;