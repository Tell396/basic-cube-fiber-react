import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Box, OrbitControls, Stars } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Object = (props) => {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame(() => {
    // scene.current.rotation.y += 0.001;
    ref.current.rotation.x += 0.001;
    ref.current.rotation.z += 0.001;
  });
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 2 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <sphereGeometry args={[1, 60, 10]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'white'} wireframe />
    </mesh>
  );
};

export default function App() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Object />
        <Stars />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={true} />
      </Suspense>
    </Canvas>
  );
}
