import * as React from 'react';
import * as THREE from 'three'
import {Canvas, useFrame} from "react-three-fiber";


const Board = (props: {children: any}) => {

   



    return (
        <Canvas >
                {props.children}
        </Canvas>
    );

}

export default Board;