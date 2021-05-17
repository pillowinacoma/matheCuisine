import * as React from "react";
import { Canvas } from "react-three-fiber";
import { makeStyles } from "@material-ui/core";


const useStyle = makeStyles((theme) => ({

    "makeStyles-canvas-26": {
        position: "absolute",
        height: "calc(100vh - 64px)"
    },
    canvas:{
        
    }

}));

const Board = (props: { children: any; camera?: any | undefined }) => {

    const classes = useStyle();

    return (
        <Canvas camera={props.camera ? props.camera : { position: [0, 0, 10] }} className={classes.canvas}>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.8} position={[300, 300, 400]} />
            {props.children}
        </Canvas>
    );
};

export default Board;
