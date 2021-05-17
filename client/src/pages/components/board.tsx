import * as React from "react";
import { Canvas } from "react-three-fiber";
import { makeStyles } from "@material-ui/core";


const useStyle = makeStyles((theme) => ({
    canvas:{
        position: "absolute",
        top: 64,
        height: "calc(100vh - 64px)",
        width: "100%"
    }

}));

const Board = (props: { children: any; camera?: any | undefined }) => {

    const classes = useStyle();

    return (
        <div className={classes.canvas}>
            <Canvas camera={props.camera ? props.camera : { position: [0, 0, 10] }} >
                <ambientLight intensity={0.5} />
                <spotLight intensity={0.8} position={[300, 300, 400]} />
                {props.children}
            </Canvas>
        </div>

    );
};

export default Board;
