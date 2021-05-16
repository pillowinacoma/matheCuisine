import { RoundedBox } from "@react-three/drei";
import { a } from "@react-spring/three";
import Flippable from "../components/flippable";
import Paquet from "../components/paquet";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useFrame, useThree } from "react-three-fiber";
const pi = Math.PI;

const Pan = ({ ...props }) => {
    return (
        <a.group position={props?.position ?? [0, -1, 0]}>
            <RoundedBox args={[10, 1, 10]} radius={0.4}>
                <a.meshStandardMaterial color="black" />
            </RoundedBox>
        </a.group>
    );
};

const PancakePan = ({ ...props }) => {
    const {
        viewport: { width, height },
    } = useThree();
    const dims = props?.dimensions ?? [5, 5];
    const scale = Math.min(width / 10 / dims[0], height / 10 / dims[1]) * 0.7;
    const [pos, setPos] = useState([(-scale * 3) * dims[0], scale * 3 * dims[1]]);
    const bigPan = useRef<any | null>(null);
    const [flipped, setFlipped] = useState(0);
    const [total, setTotal] = useState(dims[1] * dims[0]);
    let mouse: { x: number; y: number };

    useFrame(() => {
        const m = bigPan.current;

        if (m && mouse) {
            const coords = { x: window.innerWidth, y: window.innerHeight };
            m.rotation.x =
                -pi / 6 + (mouse.y - coords.y / 2) / 300 / pi + pi / 2;
            m.rotation.z = (mouse.x - coords.x / 2) * 0.0005;
        }
    });

    useEffect(() => {
        console.log(`flipped : ${flipped} / ${total}`);
    }, [flipped]);

    const increment = (entry: number) => setFlipped(entry + 1);
    const decrement = (entry: number) => setFlipped(entry - 1);

    return (
        <group
            scale={scale}
            ref={bigPan}
            rotation={props?.rotation ?? [pi / 3, 0, 0]}
            position={[pos[0], pos[1], 0]}
            onPointerMove={(event) => {
                mouse = { x: event.clientX, y: event.clientY };
            }}
        >
            <Paquet
                center={[0, 0, 0]}
                dimensions={[dims[0], 1, dims[1]]}
                distance={[7, 7, 7]}
                scale={[1, 1, 1]}
            >
                <Flippable
                    onFlip={() => increment(flipped)}
                    onFlop={() => decrement(flipped)}
                />
                <Pan />
            </Paquet>
        </group>
    );
};

export default PancakePan;
