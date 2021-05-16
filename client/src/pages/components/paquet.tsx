import { Modal } from "@material-ui/core";
import React from "react";
import { Model } from "./models";

const Paquet = ({ ...props }): JSX.Element => {
    const scale = props.scale;
    const scaleArray = [scale, scale, scale];

    const baseModel = () => {
        return (
            props?.children ?? (
                <Model
                    key={`model-${props.file}-${Math.floor(
                        Math.random() * 99999
                    )}`}
                    file={props.file}
                    position={[0, 0, 0]}
                />
            )
        );
    };

    const arrayModel = () => {
        const dims = props?.dimensions ?? [2, 2, 2];
        const dist = props?.distance ?? [1, 1, 1];
        const center = props?.center ?? [0, 0, 0];
        const result: JSX.Element[] = [];

        for (let i = 0; i < dims[0]; i++) {
            for (let j = 0; j < dims[1]; j++) {
                for (let k = 0; k < dims[2]; k++) {
                    result.push(
                        <group
                            position={[
                                center[0] + i * dist[0],
                                center[1] + j * dist[1],
                                center[2] + k * dist[2],
                            ]}
                        >
                            {baseModel()}
                        </group>
                    );
                }
            }
        }

        return result;
    };

    return <group scale={props?.scale ?? [1,1,1]} >{arrayModel()}</group>;
};

export default Paquet;
