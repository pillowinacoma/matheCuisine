import React, { useState } from "react";
import { Vector3 } from "three";
import { useGesture } from "react-use-gesture";
import { FixedLengthArray } from "./helper/fixedArray";
import { Model } from "./models";
import { useThree } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";


const Draggable = ({ ...props }) => {
    const scale = 1;
    const scaleArray: FixedLengthArray<[number, number, number]> = [
        scale,
        scale,
        scale,
    ];

    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    const [spring, set] = useSpring(() => ({
        scale: [1, 1, 1],
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        config: { friction: 10 },
    }));
    const bind = useGesture({
        onDrag: ({ offset: [x, y] }) =>
            set({
                position: [x / aspect, -y / aspect, 0],
                rotation: [0, (x + y) / aspect, 0],
            }),
        onHover: ({ hovering }) =>
            set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] }),
    });

    return (
        //@ts-ignore
        <a.group {...spring} {...bind()} >
            <Model
                key={`model-${props.file}-${0}-${0}-${0}`}
                file={props.file}
                position={[0, 0, 0]}
                scale={[scaleArray[0], scaleArray[1], scaleArray[2]]}
            />
        </a.group>
    );
};
export default Draggable;
