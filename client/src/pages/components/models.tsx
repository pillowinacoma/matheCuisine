import * as React from "react";
import { useFrame } from "react-three-fiber";
import { Object3D } from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export const Model = (props: {
    file: string;
    position?: [number, number, number];
    scale?: [number, number, number];
    ref?:React.MutableRefObject<Object3D | undefined>;
    onPointerDown?: ((event: any) => void) | undefined;
    onPointerCancel?: ((event: any) => void) | undefined;
    onPointerMove?: ((event: any) => void) | undefined;
    onPointerOut?: ((event: any) => void) | undefined;
    onPointerLeave?: ((event: any) => void) | undefined;
    onPointerMissed?: ((event: any) => void) | undefined;
    onPointerOver?: ((event: any) => void) | undefined;
    onPointerUp?: ((event: any) => void) | undefined;
    onClick?: ((event: any) => void) | undefined;
    onDoubleClick?: ((event: any) => void) | undefined;
    onWheel?: ((event: any) => void) | undefined;
    frame?: (gltf: GLTF) => void | undefined;
}) => {
    const [pos] = React.useState(
        props.position != null ? props.position : [0, 0, 0]
    );
    const [gltf, setGltf] = React.useState<GLTF>();
    const glb = "/models/" + props.file + ".glb";
    var group = React.useRef();
    //const gltf = useLoader(GLTFLoader, glb);
    const loader = new GLTFLoader();
    loader.load(glb, (result) => {
        if (gltf === undefined) setGltf(result);
    });

    useFrame(() => {
        if (props.frame !== undefined && gltf !== undefined) props.frame(gltf);
    });
    return (
        <group
            ref={group}
            {...props}
            onPointerDown={props.onPointerDown}
            onPointerCancel={props.onPointerCancel}
            onPointerMove={props.onPointerMove}
            onPointerOut={props.onPointerOut}
            onPointerEnter={props.onPointerOut}
            onPointerLeave={props.onPointerLeave}
            onPointerMissed={props.onPointerMissed}
            onPointerOver={props.onPointerOver}
            onPointerUp={props.onPointerUp}
            onClick={props.onClick}
            onDoubleClick={props.onDoubleClick}
            onWheel={props.onWheel}
        >
            {gltf ? (
                <primitive
                    object={gltf.scene}
                    position={pos}
                    scale={props.scale ? props.scale : [1, 1, 1]}
                    ref={props.ref ? props.ref : undefined}
                />
            ) : (
                ""
            )}
        </group>
    );
};
