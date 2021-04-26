import React, {
    useRef,
    useState,
    Fragment,
    MutableRefObject,
    Dispatch,
    SetStateAction,
} from "react";
import { GroupProps, useFrame } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import Board from "./board";

const scale = 1;
const pi = Math.PI;
const cameraDistance = 5;

const Face: React.FC = (props) => {
    const radius = 2;

    return (
        <Fragment>
            <mesh position={[0, -0.1, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry
                    attach="geometry"
                    args={[radius, radius, 0.15, 100]}
                />
                <meshStandardMaterial attach="material" color="#737373" />
            </mesh>
            <ClockTicks
                tickNumber={12}
                diam={radius}
                color="hotpink"
                id="big"
                size={[0.3, 0.1]}
            />
            <ClockTicks
                tickNumber={60}
                diam={radius}
                color="orange"
                id="small"
                size={[0.3, 0.01]}
            />
        </Fragment>
    );
};

const ClockTicks = (props: {
    tickNumber: number;
    diam: number;
    color: string;
    id: string;
    size: any;
}): JSX.Element => {
    let result = [];
    const far = props.diam;
    const num = props.tickNumber;

    for (let index = 0; index < props.tickNumber; index++) {
        let pos1 = far * Math.cos(((2 * pi) / num) * index);
        let pos2 = far * Math.sin(((2 * pi) / num) * index);
        let nPos1 = far * Math.cos(((2 * pi) / num) * index);
        let nPos2 = far * Math.sin(((2 * pi) / num) * index);
        result.push(
            <mesh
                key={`${props.id}-${index}`}
                position={[0, (pos1 + nPos1) / 2, (pos2 + nPos2) / 2]}
                rotation={[(index * pi * 2) / num, 0, 0]}
            >
                <boxGeometry
                    attach="geometry"
                    args={[0.1, props.size[0], props.size[1]]}
                />
                <meshStandardMaterial attach="material" color={props.color} />
            </mesh>
        );
    }

    return <group rotation={[0, 0, pi / 2]}>{result}</group>;
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
            rotation={[0, 0, 0]}
            position={[0, props.type * 0.05, 0]}
        >
            <mesh position={[size / 2 - 0.1 * size, 0, 0]}>
                <boxGeometry args={[size, 0.01, -0.03 + 0.15 / size]} />
                <meshBasicMaterial attach="material" color={props.color} />
            </mesh>
        </group>
    );
};

const ClockGroup = (props: {
    time: Date;
    setTime: Dispatch<SetStateAction<Date>>;
}): JSX.Element => {
    const group = useRef<any | null>(null);
    let mouse: { x: number; y: number };

    useFrame(() => {
        const m = group.current;
        if (m && mouse) {
            const coords = { x: window.innerWidth, y: window.innerHeight };
            m.rotation.x = (mouse.y - coords.y / 2) / 300 / pi + pi / 2;
            m.rotation.z = (mouse.x - coords.x / 2) * 0.001;
        }
    });

    return (
        <group
            ref={group}
            rotation={[pi / 2, 0, 0]}
            scale={[scale, scale, scale]}
            onPointerMove={(event) => {
                mouse = { x: event.clientX, y: event.clientY };
            }}
            onWheel={(event) => {
                const tmpTime = props.time;
                tmpTime.setSeconds(props.time.getSeconds() + (event.deltaY < 0 ? -1 : 1));
                props.setTime(tmpTime);
            }}
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
            <Board camera={{ position: [0, 0, cameraDistance] }}>
                <ClockGroup time={time} setTime={setTime} />
            </Board>
        </Fragment>
    );
};

export default Clock;
