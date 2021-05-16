import React, { useState } from "react";
import { useGesture } from "react-use-gesture";
import { useSpring, a } from "@react-spring/three";

const Source = ({ ...props }) => {
    const [active, setActive] = useState(0);
    const { spring } = useSpring({
        spring: active,
        config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
    });

    // interpolate values from commong spring
    const scale = spring.to([0, 1], [10, 20]);
    const positionY = spring.to([0, 1], [0, 0.5]);
    const color = spring.to([0, 1], ["#6246ea", "#e45858"]);
    const opacity = spring.to([0, 1], [1, 0.5]);

    const bind = useGesture({
        onHover: ({ hovering }) => setActive(hovering ? 1 : 0),
    });
    return (
        //@ts-ignore
        <a.group position={props.position} {...bind()}>
            <a.mesh
                position-y={positionY}
                scale-x={scale}
                scale-z={scale}
                scale-y={scale}
            >
                <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                <a.meshStandardMaterial
                    transparent={true}
                    opacity={opacity}
                    roughness={0.5}
                    attach="material"
                    color={color}
                />
            </a.mesh>
        </a.group>
    );
};

export default Source;
