import React, { useMemo, useState } from "react";
import * as THREE from "three";
import { FixedLengthArray } from "./helper/fixedArray";
import { Model } from "./models";
import {
    Physics,
    useBox,
    usePlane,
} from "@react-three/cannon";
import { a } from "@react-spring/three";

function Box() {
    const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
    return (
        <a.group
            onClick={() => {
                api.velocity.set(0, 50, 0);
            }}
            ref={ref}
            position={[0, 10, 0]}
        >
            <Model
                key="bananananan"
                file="banana"
                position={[0, 0, 0]}
                scale={[1,1,1]}
            />
        </a.group>
    );
}

function Plane() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
    }));
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshLambertMaterial attach="material" color="lightblue" />
        </mesh>
    );
}

const Droppable = ({ ...props }) => {
    const scale = 1;
    const scaleArray: FixedLengthArray<[number, number, number]> = [
        scale,
        scale,
        scale,
    ];

    return (
        <Physics>
            <Box />
            <Plane />
        </Physics>
    );
};
export default Droppable;
