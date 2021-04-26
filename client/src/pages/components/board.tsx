import * as React from 'react';
import * as THREE from 'three'
import {Canvas, useFrame} from "react-three-fiber";
import { PartyModeSharp } from '@material-ui/icons';


const Board = (props: {children: any, camera? : any|undefined}) => {

   



    return (
        <Canvas camera={props.camera ? props.camera : { position: [0, 0, 10] }}>
            <ambientLight intensity={.75} />
            <spotLight intensity={0.8} position={[300, 300, 400]} />
            {props.children}
        </Canvas>
    );

}

export default Board;