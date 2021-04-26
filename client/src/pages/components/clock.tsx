import React, { useRef, useState, Fragment, MutableRefObject } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

const scale = 1;

const Box: React.FC = (props) => {
    const [active, setActive] = useState(false);
    return (
        <mesh onClick={() => setActive(!active)}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial
                attach="material"
                color={active ? "hotpink" : "orange"}
            />
        </mesh>
    );
};

const Face: React.FC = (props) => {
    const radius = 3;

    return (
        <mesh position={[0, 0, 0]} rotation={[90, 0, 0]}>
            <cylinderGeometry
                attach="geometry"
                args={[radius, radius, 1, 20]}
            />
            <meshBasicMaterial attach="material" color="#737373" />
        </mesh>
    );
};

const Hand: React.FC<{ type: number; color: string }> = (props) => {
    const group = useRef<any | null>(null);
    /*useFrame(() => {
        const m = group.current;
        if (m) {
            const now = new Date();
            let totalSeconds =
                now.getHours() * 3600 +
                now.getMinutes() * 60 +
                now.getSeconds();

            let value = 0; // as 0-1 value
            if (props.type === 1) {
                value = totalSeconds / 60 / 60 / 12;
            } else if (props.type === 2) {
                value = totalSeconds / 60 / 60;
            } else if (props.type === 3) {
                value = totalSeconds / 60;
            }
            m.rotation.y = -value * 2 * Math.PI + Math.PI / 2;
        }
    });*/

    const size = 0.5 + 0.5 * props.type;

    return (
        <group
            ref={group}
            rotation={[90, props.type, 0]}
            position={[0, -props.type, 0]}
        >
            <mesh position={[size - 0.1, 0, 0]}>
                <boxGeometry args={[size * 2, 1, 0.5]} />
                <meshBasicMaterial attach="material" color={props.color} />
            </mesh>
        </group>
    );
};

const ClockGroup: React.FC = (props) => {
    const group = useRef<any | null>(null);

    return (
        <group
            ref={group}
            rotation={[0, 0, 0]}
            scale={[scale, scale, scale]}
            /*onPointerDown={(e) => {
                console.log(group.current.children);
                console.log("clientX", e.clientX);
                console.log("clientY", e.clientY);
            }}*/
        >
            <Face />
            <Hand type={1} color="#eeeef0" />
            <Hand type={2} color="#d6d6db" />
            <Hand type={3} color="#d11c00" />
        </group>
    );
};

export function getMousePos(e: { clientX: number; clientY: number }) {
    return { x: e.clientX, y: e.clientY };
}

const Clock = () => {
    const w = { x: window.innerWidth, y: window.innerHeight };
    const mouse = useRef({ x: w.x / 2, y: w.y / 2 });
    const [smooth, setSmooth] = useState(false);
    return (
        <Fragment>
            <h1>Hello BIATCH</h1>
            <Canvas>
                <ClockGroup />
                <OrbitControls />
            </Canvas>
        </Fragment>
    );
};

export default Clock;
