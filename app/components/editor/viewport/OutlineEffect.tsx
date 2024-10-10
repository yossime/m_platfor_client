
import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import * as THREE from 'three';


extend({ EffectComposer, RenderPass, ShaderPass, OutlinePass });

interface OutlineEffectProps {
    selectedObjects: THREE.Object3D[];
}


const OutlineEffect: React.FC<OutlineEffectProps> = ({ selectedObjects }) => {
    const { gl, scene, camera, size } = useThree();
    const composer = useRef<EffectComposer | null>(null);
    const outlinePass = useRef<OutlinePass | null>(null);
    // const patternTexture = useTexture('/textures/stonem.jpg');

    const outlineProps = {
        edgeStrength: 3,
        edgeGlow: 0,
        edgeThickness: 1,
        pulsePeriod: 0,
        visibleEdgeColor: '#b12828',
        hiddenEdgeColor: '#190a05',
        usePatternTexture: false,
        rotate: false,
    };

    const { edgeStrength, edgeGlow, edgeThickness, pulsePeriod, visibleEdgeColor, hiddenEdgeColor, usePatternTexture } = outlineProps;

    useEffect(() => {
        composer.current = new EffectComposer(gl);
        const renderPass = new RenderPass(scene, camera);
        composer.current.addPass(renderPass);

        outlinePass.current = new OutlinePass(new THREE.Vector2(size.width, size.height), scene, camera);
        composer.current.addPass(outlinePass.current);

        const effectFXAA = new ShaderPass(FXAAShader);
        effectFXAA.uniforms['resolution'].value.set(1 / size.width, 1 / size.height);
        composer.current.addPass(effectFXAA);

        return () => {
            composer.current?.dispose();
        };
    }, [gl, scene, camera, size]);

    useEffect(() => {
        if (outlinePass.current) {
            outlinePass.current.edgeStrength = edgeStrength;
            outlinePass.current.edgeGlow = edgeGlow;
            outlinePass.current.edgeThickness = edgeThickness;
            outlinePass.current.pulsePeriod = pulsePeriod;
            outlinePass.current.visibleEdgeColor.set(visibleEdgeColor);
            outlinePass.current.hiddenEdgeColor.set(hiddenEdgeColor);
            outlinePass.current.usePatternTexture = usePatternTexture;
            // if (usePatternTexture && patternTexture) {
            //   outlinePass.current.patternTexture = patternTexture;
            // }
        }
    }, [edgeStrength, edgeGlow, edgeThickness, pulsePeriod, visibleEdgeColor, hiddenEdgeColor, usePatternTexture]);


    useEffect(() => {
        if (outlinePass.current) {
            console.log("outline", selectedObjects)
            outlinePass.current.selectedObjects = selectedObjects;
        }

    }, [selectedObjects]);

    useFrame(() => {
        composer.current?.render();
    }, 1);

    return null;
};

export default OutlineEffect;