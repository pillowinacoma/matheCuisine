import { a, useSpring } from "@react-spring/three";
import { useState } from "react";
import { Cylinder } from "@react-three/drei";
const Flippable = ({ ...props }) => {
    const [active, setActive] = useState(0);

    const { spring } = useSpring({
        spring: active,
        config: { mass: 1, tension: 1000, friction: 100, pricision: 0.0001 },
    });

    const scale = spring.to([0, 1], [0.3, 0.305]);
    const digitScale = spring.to([0, 1], [0, 1]);
    const position_y = spring.to([0, 1], [1, 1.1]);
    const rotation = spring.to([0, 1], [0, Math.PI]);
    const color = spring.to([0, 1], ["#f7d788", "#c86500"]);
    const opacity = spring.to([0, 1], [1, 1]);

    return (
        <a.group position={props?.position ?? [0, 0, 0]} rotation-z={rotation}>
            <a.mesh
                rotation-z={0}
                scale-x={scale}
                scale-y={scale}
                scale-z={0.3}
                onClick={() => {
                    setActive(Number(!active));
                    if (!active) props?.onFlip?.();
                    if (active) props?.onFlop?.();
                }}
            >
                <Cylinder args={[10, 10, 0.5, 30]}>
                    <a.meshStandardMaterial
                        transparent={true}
                        opacity={opacity}
                        roughness={1}
                        attach="material"
                        color={color}
                    />
                </Cylinder>
            </a.mesh>
        </a.group>
    );
};

export default Flippable;
