import * as React from 'react';

const Sphere = () => {
    return (
      <mesh visible userData={{ test: "hello" }} position={[0, 0, 0]} castShadow>
        <sphereGeometry attach="geometry" args={[2, 20, 20]} />
        <meshStandardMaterial
          attach="material"
          color={[150,90,0]}
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    );
}

export default Sphere;