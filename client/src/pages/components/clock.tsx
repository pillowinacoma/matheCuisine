import React, {
    useRef,
    useState,
    Fragment,
    MutableRefObject,
    useEffect,
} from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

const scale = 1;
const cameraDistance = 2;

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
    const radius = 2;

    return (
        <mesh position={[0, -0.5, 0]} rotation={[0, Math.PI / 12, 0]}>
            <cylinderGeometry
                attach="geometry"
                args={[radius, radius, 1, 12]}
            />
            <meshBasicMaterial attach="material" color="#737373" />
        </mesh>
    );
};

const Hand: React.FC<{ type: number; color: string; time: Date }> = (props) => {
    const group = useRef<any | null>(null);
    useFrame(() => {
        const m = group.current;
        if (m) {
            const now = props.time;
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
    });

    const size = 0.5 + 0.5 * props.type;

    return (
        <group
            ref={group}
            rotation={[0, props.type, 0]}
            position={[0, props.type * 0.05, 0]}
        >
            <mesh position={[size / 2 - 0.1 * size, 0, 0]}>
                <boxGeometry args={[size, 0.01, -0.03 + 0.15 / size]} />
                <meshBasicMaterial attach="material" color={props.color} />
            </mesh>
        </group>
    );
};

const ClockGroup: React.FC<{
    time: Date;
}> = (props) => {
    const group = useRef<any | null>(null);
    return (
        <group
            ref={group}
            rotation={[90, 0, 0]}
            scale={[scale, scale, scale]}
            /*onPointerDown={(e) => {
                console.log(group.current.children);
                console.log("clientX", e.clientX);
                console.log("clientY", e.clientY);
            }}*/
        >
            <Face />
            <Hand type={1} color="#eeeef0" time={props.time} />
            <Hand type={2} color="#d6d6db" time={props.time} />
            <Hand type={3} color="hotpink" time={props.time} />
        </group>
    );
};

export function getMousePos(e: { clientX: number; clientY: number }) {
    return { x: e.clientX, y: e.clientY };
}

const Clock = () => {
    const w = { x: window.innerWidth, y: window.innerHeight };
    const mouse = useRef({ x: w.x / 2, y: w.y / 2 });

    let [time, setTime] = useState(new Date());
    return (
        <Fragment>
            <h1>Clock</h1>
            <Canvas
            camera={{ position: [0, 0, cameraDistance] }}
            >
                <ClockGroup time={time} />
                <OrbitControls />
            </Canvas>
            <button
                onClick={() => {
                    console.log(time);                    
                    const tmpTime = time;
                    tmpTime.setSeconds(time.getSeconds() + 1);
                    setTime(tmpTime);
                }}
            >
                increment
            </button>
        </Fragment>
    );
};

export default Clock;
