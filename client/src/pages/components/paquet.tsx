import React, { useState } from "react";
import { Model } from "./models";

const Paquet = ({ ...props }): JSX.Element => {
    const scale = props.scale;
    const scaleArray = [scale, scale, scale];

    const baseModel = ([x = 0, y = 0, z = 0]) => {
        return (
            <Model
                key={`model-${props.file}-${x}-${y}-${z}`}
                file={props.file}
                position={[x, y, z]}
                scale={[scaleArray[0], scaleArray[1], scaleArray[2]]}
            />
        );
    };

    const arrayModel = () => {
        const dims = props.dimensions;
        const dist = props.distance;
        const center = props.center;
        const result: JSX.Element[] = [];

        for (let i = 0; i < dims[0]; i++) {
            for (let j = 0; j < dims[1]; j++) {
                for (let k = 0; k < dims[2]; k++) {
                    result.push(
                        baseModel([
                            center[0] + i * dist[0],
                            center[1] + j * dist[1],
                            center[2] + k * dist[2],
                        ])
                    );
                }
            }
        }

        return result;
    };

    return <group>{arrayModel()}</group>;
};

export default Paquet;
