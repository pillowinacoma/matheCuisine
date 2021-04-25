import * as React from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


import { Suspense } from 'react';
import { Vector3 } from 'three';

export const Model = (props:{file: string, position: [number, number, number]}) => {

    const [pos, setPos] = React.useState(props.position);
    const glb = '/models/'+props.file+'.glb';
    
    const gltf = useLoader(GLTFLoader, glb);

    const group = React.useRef();

    //console.log(gltf.nodes.Cube);

    return (
      <group ref={group} {...props}
        onPointerDown = {(e) => {
        console.log(e);
      }}
      >
        <primitive object={gltf.scene} position={pos}/>
      </group>
    )
}