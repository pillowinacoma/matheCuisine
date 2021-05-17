import React, { useMemo, useState, Suspense } from "react";
import * as THREE from "three";
import { FixedLengthArray } from "./helper/fixedArray";
import { Model } from "./models";
import { Physics, useBox, usePlane } from "@react-three/cannon";
import { a } from "@react-spring/three";
import { useLoader } from "react-three-fiber";
import imgBasket from "../../img/basket.jpg";
import { useEffect } from "react";

function Box({ ...props }) {
    const [ref, api] = useBox(() => ({
        mass: 1,
        position: [0, props?.posY, 0],
    }));
    const texture = useLoader(THREE.TextureLoader, imgBasket);
    return (
        <Suspense fallback="loading">
            <a.group
                onClick={() => {
                    api.velocity.set(3, 3, 0);
                }}
                ref={ref}
                position={[props?.posY, props?.posY, props?.posY]}
            >
                <a.mesh>
                    <a.boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                    <a.meshBasicMaterial
                        map={texture}
                        transparent={true}
                        attach="material"
                    />
                </a.mesh>
            </a.group>
        </Suspense>
    );
}

function Plane() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
    }));
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[400, 400]} />
            <meshLambertMaterial attach="material" color="black" />
        </mesh>
    );
}

const Droppable = ({ ...props }) => {
    const scale = 1;
    const scaleArray: FixedLengthArray<[number, number, number]> = [
        scale,
        scale,
        scale,
    ];
    const [boxArray, setBoxArray] = useState<JSX.Element[]>([]);

    useEffect(() => {
        for (var i = 0; i < props?.val; i++) {
            setBoxArray([
                ...boxArray,
                <Box posY={i} key={`${props?.val ?? "hey"}-${i}`} />,
            ]);
        }
    }, [props?.val]);

    return (
        <Physics>
            {boxArray.map((e) => e)}
            <Plane />
        </Physics>
    );
};
export default Droppable;
