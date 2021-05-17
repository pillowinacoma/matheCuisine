import React, { useState, useMemo } from "react";
import { Suspense } from "react";
import { useGesture } from "react-use-gesture";
import { useSpring, a } from "@react-spring/three";
import imgBasket from "../../img/basket.jpg";
import BackgroundImage from "./bgImage";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

const pi = Math.PI;

const Text = ({ children = "", size = 1.5, color = "#00ff00", ...props }) => {
    const font = useLoader(THREE.FontLoader, "/fonts/bold.blob");
    const config = useMemo(
        () => ({
            font,
            size: 40,
            height: 10,
            curveSegments: 32,
            bevelEnabled: true,
            bevelThickness: 6,
            bevelSize: 2.5,
            bevelOffset: 0,
            bevelSegments: 8,
        }),
        [font]
    );
    return (
        <a.group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
            <a.mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
                <textGeometry args={[children, config]} />
                <meshStandardMaterial color={color} />
            </a.mesh>
        </a.group>
    );
};

const Source = ({ ...props }) => {
    const [active, setActive] = useState(0);
    const { spring } = useSpring({
        spring: active,
        config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
    });
    const [imgX, imgY, imgZ] = props.position;
    // interpolate values from commong spring
    const scale = spring.to([0, 1], [10, 11]);
    const positionY = spring.to([0, 1], [0, 0.5]);
    const opacity = spring.to([0, 1], [1, 0.7]);

    const bind = useGesture({
        onHover: ({ hovering }) => setActive(hovering ? 1 : 0),
        onDragStart: ({ hovering }) => props?.createElem(),
    });

    const texture = useLoader(THREE.TextureLoader, imgBasket);
    return (
        //@ts-ignore
        <a.group position={props.position} {...bind()}>
            <a.mesh
                position-y={positionY}
                scale-x={scale}
                scale-z={scale}
                scale-y={scale}
            >
                <a.boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <a.meshBasicMaterial
                    map={texture}
                    transparent={true}
                    opacity={opacity}
                    attach="material"
                />
            </a.mesh>
            <Suspense fallback="loading">
                <Text position={[-3, 7, 0]} color="brown">{(props?.val ?? 0) + ""}</Text>
            </Suspense>
        </a.group>
    );
};

export default Source;
