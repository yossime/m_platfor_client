"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EMode, useEditor } from '@/context/useEditorContext';
import { IHeaderBoard, IParams, IProductBoard } from '../interface/paramsType';
import Architecture from '../Architecture';
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
    materialParams: { map: 'https://firebasestorage.googleapis.com/v0/b/fbx-bucket/o/textura_4.jpeg?alt=media&token=642299bf-7758-4516-a0ae-9ac132c26c9f' },
}



const productBoard: IProductBoard = {
    maxDisplay: 6,
    name: "ProductBoard",
    type: 'ProductBoard',
    title: {
        text: "Welcome to Our Store",
        color: "purple",
        scale: [1, 1, 1]
    },
    displays: [
        {
            materialParams: { color: "pink" },
            products: [
                {
                    // src: 'Podium',
                    src: 'heartglass1',
                    // src: 'Klee',
                    title: {
                        text: "Product Title 0",
                        color: "purple",
                        scale: [0.1, 0.1, 0.1]
                    },
                    description: {
                        text: "Product Description 0",
                        color: "yellow",
                        scale: [0.1, 0.1, 0.1]
                    },
                    buttons: {
                        price: {
                            text: { text: "$299" },
                            material: {
                                color: "#FF5733"
                            },
                            type: null
                        },
                        addToCart: {
                            type: null,

                            text: {
                                text: "111 Add 2 Cart",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#FF5733"
                            }
                        },
                        quickView: {
                            type: null,

                            text: {
                                text: "111 Quick View",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#33C1FF"
                            }
                        },
                        buyNow: {
                            type: null,

                            text: {
                                text: "111 Buy Now",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#75FF33"
                            }
                        }
                    },
                    type: 'Podium'
                }
            ],
            type: 'Podium'
            // type: 'PodiumModelOrigin'
        },
        {
            
            materialParams: { color: "pink" },
            products: [
                {
                    src: 'heartglass1',
                    

                    title: {
                        text: "Product Title 1",
                        color: "blue",
                        scale: [0.1, 0.1, 0.1]
                    },
                    description: {
                        text: "Product Description 1",
                        color: "black",
                        scale: [0.1, 0.1, 0.1]
                    },
                    buttons: {
                        price: {
                            text: { text: "$299" },
                            material: {
                                color: "#FF5733"
                            },
                            type: null
                        },
                        addToCart: {
                            type: null,

                            text: {
                                text: "Add 2 Cart",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#FFC300"
                            }
                        },
                        quickView: {
                            type: null,

                            text: {
                                text: "Quick View",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#C70039"
                            }
                        },
                        buyNow: {
                            type: null,

                            text: {
                                text: "Buy Now",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#900C3F"
                            }
                        }
                    },
                    type: 'Podium'
                }
            ],
            type: 'Podium'
        },
        {
            materialParams: { color: "pink" },
            products: [
                {
                    
                    title: {
                        text: "Product Title 2",
                        color: "#ffffff",
                        scale: [0.1, 0.1, 0.1]
                    },
                    description: {
                        text: "Product Description 2",
                        color: "#cccccc",
                        scale: [0.1, 0.1, 0.1]
                    },
                    buttons: {
                        price: {
                            text: { text: "$299" },
                            material: {
                                color: "#FF5733"
                            },
                            type: null
                        },
                        addToCart: {
                            type: null,

                            text: {
                                text: "Add 2 Cart",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#DAF7A6"
                            }
                        },
                        quickView: {
                            type: null,

                            text: {
                                text: "Quick View",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#FF6F61"
                            }
                        },
                        buyNow: {
                            type: null,

                            text: {
                                text: "Buy Now",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#D5AAFF"
                            }
                        }
                    },
                    type: 'Podium',

                }
            ],
            type: 'Podium'
        },
        {
            materialParams: { color: "pink" },
            products: [
                {
                    

                    title: {
                        text: "Product Title 3",
                        color: "#ffffff",
                        scale: [0.1, 0.1, 0.1]
                    },
                    description: {
                        text: "Product Description 3",
                        color: "#cccccc",
                        scale: [0.1, 0.1, 0.1]
                    },
                    buttons: {
                        price: {
                            text: { text: "$299" },
                            material: {
                                color: "#FF5733"
                            },
                            type: null
                        },
                        addToCart: {
                            type: null,
                            text: {
                                text: "Add 2 Cart",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#00BFFF"
                            }
                        },
                        quickView: {
                            type: null,
                            text: {
                                text: "Quick View",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#FF1493"
                            }
                        },
                        buyNow: {
                            type: null,
                            text: {
                                text: "Buy dd Now",
                                color: "#ffffff"
                            },
                            material: {
                                color: "#32CD32"
                            }
                        }
                    },
                    type: 'Podium'
                }
            ],
            type: 'Podium'
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

    const { setDataParameters } = useEditor();
    useEffect(() => {
        setDataParameters(params);
    }, [params]);



    return (
        <ViewportContainer>

            <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <Canvas style={{ height: '100%', width: '100%' }}>
                    <OrbitControls />
                    <ambientLight />
                    <gridHelper />
                    <Suspense>
                        <Architecture />
                    </Suspense>
                </Canvas>
            </div>
        </ViewportContainer>
    );
};

export default Viewport;