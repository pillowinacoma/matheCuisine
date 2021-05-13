import React, { useState } from "react";
import { Vector3 } from "three";
import { FixedLengthArray } from "./helper/fixedArray";
import { Model } from "./models";
 

const Draggable = ({ ...props }) => {
    const scale = 1;
    const scaleArray : FixedLengthArray<[number, number, number]> = [scale, scale, scale];

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
    const [objPos, setObjPos] = useState(new Vector3(0, 0, 0));
    const [ptDown, setPtDown] = useState(false);

    return (
        <group
            onPointerMove={(e) => {
                if (ptDown) setObjPos(new Vector3(e.point.x, e.point.y, 0));
            }}
            onPointerDown={(e) => setPtDown(true)}
            onPointerUp={(e) => setPtDown(false)}
            castShadow
            position={objPos}
        >
            {baseModel([0,0,0])}
        </group>
    );
};
export default Draggable;
