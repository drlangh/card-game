'use client';

import useIsMobile from '@/hooks/useIsMobile';
import useCardStore from '@/stores/cardStore';
import useInformationStore from '@/stores/InformationStore';
import {
  Center,
  PresentationControls,
  RoundedBox,
  Svg,
  Text,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const Card = ({ cardData, rotating, category, isMobile }) => {
  const meshRef = useRef();
  const cardRef = useRef();
  const svgRef = useRef();

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
      state.camera.position.z = 8;
      if (svgRef.current) svgRef.current.position.y = 1.8;
    } else {
      cardRef.current.rotation.z = 0;
      if (svgRef.current) svgRef.current.position.y = 1.05;
      state.camera.position.z = 5;
      state.camera.position.y = 0;
    }
  });

  useEffect(() => {
    if (!svgRef.current) return;

    svgRef.current.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set('#3f3f78');
      }
    });
  }, [svgRef.current]);

  return (
    <group ref={meshRef}>
      {category && (
        <Svg
          ref={svgRef}
          position={
            cardData ? [-0.14, 1.05, 0.02] : [-0.14, 0.2, 0.02]
          }
          src={category.svgPath}
          scale={0.012}
          color="#3f3f78"
        />
      )}
      <Text
        textAlign={!cardData ? 'center' : 'left'}
        position={[0, -0.1, 0.02]}
        color="#3f3f78"
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
        <meshPhysicalMaterial
          transmission={0.15}
          thickness={1.5}
          roughness={0.8}
          clearcoat={0.5}
          clearcoatRoughness={0.4}
          ior={1.45}
          color={'#fbf7ff'}
          attenuationColor={'#ee71ff'}
          attenuationDistance={1}
          opacity={0.7}
          transparent={true}
          metalness={0.3}
          envMapIntensity={0.8}
        />
      </RoundedBox>
    </group>
  );
};

export default function CardScene() {
  const isMobile = useIsMobile();
  const { category } = useInformationStore();
  const { rotating, cardData, setCardReady } = useCardStore();

  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 50,
      }}
      style={{ width: '100%', height: '100%' }}
      onCreated={() => {
        if (setCardReady) setCardReady(true);
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
}
