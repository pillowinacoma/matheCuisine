import React, { useState } from "react";
import { useGesture } from "react-use-gesture";
import { useSpring, a } from "@react-spring/three";
import { Text } from "../components/source";
import { Minus } from "../components/operationSigns";

const Cible = ({ ...props }) => {
    const size = props?.size ?? 1;
    const [active, setActive] = useState(0);
    const { spring } = useSpring({
        spring: active,
        config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
    });

    // interpolate values from commong spring
    const scale = spring.to([0, 1], [size * 1, size * 1.2]);
    const positionY = spring.to([0, 1], [0, 0.5]);
    const color = spring.to([0, 1], ["#6246ea", "#e45858"]);
    const opacity = spring.to([0, 1], [1, 0.5]);

    const bind = useGesture({
        onHover: ({ hovering }) => setActive(hovering ? 1 : 0),
        onDragStart: ({ hovering }) => props?.execute(),
    });
    if (props.valEntry !== undefined)
        return (
            //@ts-ignore
            <a.group rotation={props?.rotation ?? [0,0,0]} scale={scale} position={props.position} {...bind()}>
                <Text position={[0, 0, 0]} color={color.get()}>
                    {props?.valEntry + ""}
                </Text>
                {props?.negative ? (
                    <Minus position={[-2, 2, 0]} size={1} />
                ) : null}
            </a.group>
        );
    return null;
};

export default Cible;
