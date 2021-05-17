import React, {
    useRef,
    useState,
    Fragment,
    Dispatch,
    SetStateAction,
    useMemo,
} from "react";
import { useFrame } from "react-three-fiber";
import Board from "./board";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";
import { Suspense } from "react";
import { a, useSpring } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { useEffect } from "react";

const scale = 1;
const pi = Math.PI;
const cameraDistance = 3.5;

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
            <ClockNumbers
                tickNumber={12}
                diam={radius + 0.5}
                color="hotpink"
                id="numbers"
                size={[0.3, 0.1]}
            />
            <ClockTicks
                tickNumber={60}
                diam={radius}
                color="orange"
                id="small"
                size={[0.3, 0.01]}
            />
            <ClockTicks
                tickNumber={12}
                diam={radius}
                color="orange"
                id="big"
                size={[0.7, 0.1]}
            />
        </Fragment>
    );
};

const ClockNumbers = (props: {
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
            <Textee
                key={`num${index}`}
                color={props.color}
                position={[
                    0,
                    (pos1 + nPos1) / 2 + 0.17,
                    (pos2 + nPos2) / 2 + 0.1,
                ]}
            >{`${12 - ((index + 3) % 12)}`}</Textee>
        );
    }

    return <group rotation={[0, 0, pi / 2]}>{result}</group>;
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

const Button = ({ ...props }) => {
    const [active, setActive] = useState(0);

    const { spring } = useSpring({
        spring: active,
        config: { mass: 1, tension: 1000, friction: 100, pricision: 0.0001 },
    });

    const scale = spring.to([0, 1], [0.3, 0.5]);
    const digitScale = spring.to([0, 1], [0, 1]);
    const position_y = spring.to([0, 1], [1, 1.1]);
    const rotation = spring.to([0, 1], [0, Math.PI]);
    const color = spring.to([0, 1], ["#84a02b", "#d6482f"]);
    const opacity = spring.to([0, 1], [1, 1]);

    return (
        <a.group position={[0, 0, -3]} rotation-z={rotation}>
            <a.mesh
                rotation-z={0}
                scale-x={scale}
                scale-y={scale}
                scale-z={0.3}
                onClick={() => {
                    if (!active)
                        console.log(
                            "time is : ",
                            props?.time.getHours() +
                                "H" +
                                props?.time.getMinutes()
                        );
                    setActive(Number(!active));
                    props.startClock?.();
                }}
            >
                <cylinderBufferGeometry
                    attach="geometry"
                    args={[0.5, 1, 1, 30]}
                />
                <a.meshStandardMaterial
                    transparent={true}
                    opacity={opacity}
                    roughness={0.5}
                    attach="material"
                    color={color}
                />
            </a.mesh>
            <a.group
                rotation={[0, 0, -pi / 2]}
                position={[0.65, -0.2, 0]}
                scale={digitScale}
            >
                <Textee>{`${("0" + props?.time.getHours()).slice(-2)}H${(
                    "0" + props?.time.getMinutes()
                ).slice(-2)}`}</Textee>
            </a.group>
        </a.group>
    );
};

const ClockGroup = (props: {
    speed: number;
    time: Date;
    setTime: Dispatch<SetStateAction<Date>>;
    setResponse: any;
    setClicked: any;
}): JSX.Element => {
    const group = useRef<any | null>(null);
    const [active, setActive] = useState(true);
    let mouse: { x: number; y: number };

    useFrame(() => {
        const m = group.current;
        if (m && mouse) {
            const coords = { x: window.innerWidth, y: window.innerHeight };
            m.rotation.x = (mouse.y - coords.y / 2) / 300 / pi + pi / 2;
            m.rotation.z = (mouse.x - coords.x / 2) * 0.001;
        }

        if (active) {
            props.setTime(
                new Date(
                    props.time.setSeconds(
                        props.time.getSeconds() +
                            (props?.speed ? props.speed : 1)
                    )
                )
            );
        }
    });

    useEffect(() => {
        if (!active) {
            props.setResponse(dateToTime(props.time));
        }
        props.setClicked(active);
    }, [active]);

    return (
        <group
            ref={group}
            rotation={[pi / 2, 0, 0]}
            scale={[scale, scale, scale]}
            onPointerMove={(event) => {
                mouse = { x: event.clientX, y: event.clientY };
            }}
        >
            <Face />
            <Hand type={1} color="#eeeef0" time={props.time} />
            <Hand type={2} color="#d6d6db" time={props.time} />
            {/*<Hand type={3} color="hotpink" time={props.time} />*/}
            <Button startClock={() => setActive(!active)} time={props.time} />
        </group>
    );
};

export const Textee = ({
    children = "",
    size = 1.5,
    color = "#00ff00",
    ...props
}): JSX.Element => {
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
        <group {...props} scale={[0.005 * size, 0.005 * size, 0.005]}>
            <mesh rotation={[0, pi / 2, -pi / 2]} position={props.position}>
                <textGeometry args={[children, config]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    );
};

export function getMousePos(e: { clientX: number; clientY: number }) {
    return { x: e.clientX, y: e.clientY };
}
const timeToDate = (entry: { hour: number; min: number }) => {
    const res = new Date();
    res.setHours(entry.hour);
    res.setMinutes(entry.min);
    return res;
};

const dateToTime = (entry: Date) => {
    return {
        hour: entry.getHours(),
        min: entry.getMinutes(),
    };
};

const Clock = (props: {
    time: { hour: number; min: number };
    setResponse: any;
    setClicked: any;
}) => {
    let [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        setTime(timeToDate(props.time));
        console.log(time);
    }, [props.time.hour, props.time.min]);

    return (
        <Fragment>
            <Board camera={{ position: [0, 0, cameraDistance] }}>
                <Suspense fallback={"loading"}>
                    <ClockGroup
                        time={time}
                        setTime={setTime}
                        setResponse={props.setResponse}
                        setClicked={props.setClicked}
                        speed={5}
                    />
                </Suspense>
            </Board>
        </Fragment>
    );
};

export default Clock;
