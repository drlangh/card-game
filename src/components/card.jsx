'use client';

import useIsMobile from '@/hooks/useIsMobile';
import {
  Center,
  PresentationControls,
  RoundedBox,
  Svg,
  Text,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const createNoiseTexture = (intensity = 1) => {
  const size = 256;
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;

      const noise = Math.random();
      const noiseValue = Math.floor(noise * noise * intensity * 255);

      data[i] = noiseValue; // R
      data[i + 1] = noiseValue; // G
      data[i + 2] = noiseValue; // B
      data[i + 3] = 255; // A
    }
  }

  const texture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat
  );

  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  return texture;
};

const Card = ({ cardData, rotating, category, isMobile }) => {
  const meshRef = useRef();
  const cardRef = useRef();
  const svgRef = useRef();

  const roughnessTexture = createNoiseTexture(0.8);
  const normalTexture = createNoiseTexture(1.2);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (rotating) {
      meshRef.current.rotation.y += 0.1;
      meshRef.current.scale.x =
        meshRef.current.scale.y =
        meshRef.current.scale.z =
          0.7;
    } else {
      meshRef.current.scale.x =
        meshRef.current.scale.y =
        meshRef.current.scale.z =
          1;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
      meshRef.current.rotation.y = Math.sin(t * 1.2) * 0.05;
    }

    if (isMobile) {
      cardRef.current.rotation.z = Math.PI / 2;
      svgRef.current.position.y = 1.8;
      state.camera.position.z = 8;
    } else {
      cardRef.current.rotation.z = 0;
      svgRef.current.position.y = 1.05;
      state.camera.position.z = 5;
    }
  });

  useEffect(() => {
    svgRef.current.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set('#58589d');
      }
    });
  }, []);

  return (
    <group ref={meshRef}>
      <Svg
        ref={svgRef}
        position={cardData ? [-0.14, 1.05, 0.02] : [-0.14, 0.2, 0.02]}
        src={category.svgPath}
        scale={0.012}
        color="#58589d"
      />
      <Text
        textAlign={!cardData ? 'center' : 'left'}
        position={[0, -0.1, 0.02]}
        color="#58589d"
        anchorX="center"
        fontWeight={500}
        anchorY="middle"
        fontSize={isMobile ? 0.145 : 0.1}
        maxWidth={isMobile ? 1.8 : 3.2}
      >
        {cardData}
      </Text>
      <RoundedBox
        ref={cardRef}
        args={[4.1, 2.5, 0.22]}
        radius={0.1}
        smoothness={10}
        bevelSegments={0}
        creaseAngle={0.4}
      >
        {/* <meshStandardMaterial
          color="#cbc2d8"
          roughness={0.9}
          metalness={0.76}
          roughnessMap={roughnessTexture}
          normalMap={normalTexture}
          normalScale={[0.15, 0.15]}
          transparent={true}
          opacity={0.4}
        /> */}
        <meshPhysicalMaterial
          transmission={0.85}
          thickness={1.5}
          roughness={0.9}
          roughnessMap={roughnessTexture}
          normalMap={normalTexture}
          clearcoat={0.5}
          clearcoatRoughness={0.4}
          ior={1.45}
          color={'#ebe8fd'}
          attenuationColor={'#ffffff'}
          attenuationDistance={1}
          opacity={0.9}
          transparent={true}
          metalness={0.1}
          envMapIntensity={0.8}
        />
      </RoundedBox>
    </group>
  );
};

const CardScene = ({
  cardData,
  rotating,
  category,
  setCardReady,
}) => {
  const isMobile = useIsMobile();

  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 50,
      }}
      className="-mt-11 md:mt-0"
      style={{ width: '100%', height: '100%' }}
      onCreated={({ gl }) => {
        setCardReady(true);
      }}
    >
      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-0.4, 0.4]}
        azimuth={[-0.4, 0.4]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Center>
          <Card
            cardData={cardData}
            rotating={rotating}
            category={category}
            isMobile={isMobile}
          />
        </Center>
      </PresentationControls>

      <ambientLight intensity={16} color={'#eab6f1'} />
      <directionalLight
        color={'#0513a8'}
        position={[10, 2, 3]}
        intensity={3}
      />
      <spotLight
        color={'#cadfed'}
        position={[4, -2, 1]}
        intensity={900}
        angle={125}
        penumbra={0}
      />
      <spotLight
        color={'#f5d3fd'}
        position={[-6, -4, 2]}
        intensity={900}
        angle={45}
        penumbra={0}
      />
    </Canvas>
  );
};

export default CardScene;
