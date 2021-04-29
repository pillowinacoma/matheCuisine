import React, { useState } from "react";
import { Model } from "./models";
import { FixedLengthArray } from "./helper/fixedArray";
import { Euler, Vector3 } from "three";

export const Plus = ({ ...props }): JSX.Element => {
    const renderBox = (
        position = [0, 0, 0],
        rotation = [0, 0, 0],
        size = [10, 10, 10]
    ) => {
        const pos = new Vector3(position[0], position[1], position[2]);
        const rot = new Euler(rotation[0], rotation[1], rotation[2]);
        return (
            <mesh position={pos} rotation={rot}>
                <boxGeometry
                    attach="geometry"
                    args={[size[0], size[1], size[2]]}
                />
                <meshStandardMaterial attach="material" color="black" />
            </mesh>
        );
    };

    const renderPlus = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        size = 10
    ) => {
        return [
            renderBox([50, 15, 0], undefined, [size, 3 * size, size]),
            renderBox([50, 15, 0], undefined, [3 * size, size, size]),
        ];
    };

    return <group>{renderPlus()}</group>;
};
