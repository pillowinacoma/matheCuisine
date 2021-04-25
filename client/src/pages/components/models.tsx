import * as React from 'react';
import { useLoader, useFrame, applyProps, RenderCallback } from 'react-three-fiber';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';


import { Suspense } from 'react';
import { Vector3 } from 'three';

export const Model = (props:{file: string, position?: [number, number, number],
  scale?: [number, number, number],
  onPointerDown?: ((event: any) => void) | undefined,
  onPointerCancel?: ((event: any) => void) | undefined,
  onPointerMove?: ((event: any) => void) | undefined,
  onPointerOut?: ((event: any) => void) | undefined,
  onPointerLeave?: ((event: any) => void) | undefined,
  onPointerMissed?: ((event: any) => void) | undefined,
  onPointerOver?: ((event: any) => void) | undefined,
  onPointerUp?: ((event: any) => void) | undefined,
  onClick?: ((event: any) => void) | undefined,
  onDoubleClick?: ((event: any) => void) | undefined,
  onWheel?: ((event: any) => void) | undefined,
  frame?: (gltf: GLTF) => void | undefined 
}) => {

    const [pos, setPos] = React.useState(props.position);
    const glb = '/models/'+props.file+'.glb';
    var group = React.useRef();
    const gltf = useLoader(GLTFLoader, glb);


    useFrame(() => {
      if(props.frame != undefined) 
        props.frame(gltf);
    });
    return (
      <group ref={group} {...props}
        onPointerDown = {props.onPointerDown}
        onPointerCancel = {props.onPointerCancel}
        onPointerMove = {props.onPointerMove}
        onPointerOut = {props.onPointerOut}
        onPointerEnter = {props.onPointerOut}
        onPointerLeave = {props.onPointerLeave}
        onPointerMissed = {props.onPointerMissed}
        onPointerOver = {props.onPointerOver}
        onPointerUp = {props.onPointerUp}
        onClick = {props.onClick}
        onDoubleClick = {props.onDoubleClick}
        onWheel = {props.onWheel}
      >
        <primitive object={gltf.scene} position={pos ? pos : [0,0,0]} scale={props.scale ? props.scale : [1,1,1]}/>
      </group>
    )
}