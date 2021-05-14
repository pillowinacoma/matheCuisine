import * as React from "react";
import { Canvas } from "react-three-fiber";

const Board = (props: { children: any; camera?: any | undefined }) => {
    return (
        <Canvas camera={props.camera ? props.camera : { position: [0, 0, 10] }}>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.8} position={[300, 300, 400]} />
            {props.children}
        </Canvas>
    );
};

export default Board;
