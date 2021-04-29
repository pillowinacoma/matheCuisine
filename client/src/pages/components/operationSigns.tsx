import { FixedLengthArray } from "./helper/fixedArray";
import { Euler, Vector3 } from "three";

const pi = Math.PI;

export const Plus = (props: {
    position: FixedLengthArray<[number, number, number]>;
    size: number;
}): JSX.Element => {
    const renderBox = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation = [0, 0, 0],
        size = [10, 10, 10]
    ) => {
        const pos = new Vector3(position[0], position[1], position[2]);
        const rot = new Euler(rotation[0], rotation[1], rotation[2]);
        return (
            <mesh
                position={pos}
                rotation={rot}
                key={`plusBar${position[0] * size[0]}-${
                    position[1] * size[1]
                }-${position[2] * size[2]}`}
            >
                <boxGeometry
                    attach="geometry"
                    args={[size[0], size[1], size[2]]}
                />
                <meshStandardMaterial attach="material" color="black" />
            </mesh>
        );
    };

    const renderPlus = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        size = 10
    ) => {
        return [
            renderBox(position, undefined, [size, 3 * size, size]),
            renderBox(position, undefined, [3 * size, size, size]),
        ];
    };

    return <group>{renderPlus(props.position, undefined, props.size)}</group>;
};

export const DividedBy = (props: {
    position: FixedLengthArray<[number, number, number]>;
    size: number;
}): JSX.Element => {
    const renderCyl = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation = [0, 0, 0],
        size = 10
    ) => {
        const pos = new Vector3(position[0], position[1], position[2]);
        const rot = new Euler(rotation[0], rotation[1], rotation[2]);
        return (
            <mesh
                position={pos}
                rotation={rot}
                key={`plusBar${position[0] * size}-${position[1] * size}-${
                    position[2] * size
                }`}
            >
                <cylinderGeometry
                    attach="geometry"
                    args={[size, size, size, 100]}
                />
                <meshStandardMaterial attach="material" color="black" />
            </mesh>
        );
    };

    const renderBox = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation = [0, 0, 0],
        size = [10, 10, 10]
    ) => {
        const pos = new Vector3(position[0], position[1], position[2]);
        const rot = new Euler(rotation[0], rotation[1], rotation[2]);
        return (
            <mesh
                position={pos}
                rotation={rot}
                key={`plusBar${position[0] * size[0]}-${
                    position[1] * size[1]
                }-${position[2] * size[2]}`}
            >
                <boxGeometry
                    attach="geometry"
                    args={[size[0], size[1], size[2]]}
                />
                <meshStandardMaterial attach="material" color="black" />
            </mesh>
        );
    };

    const renderDividedBy = (
        position: FixedLengthArray<[number, number, number]> = [0, 10, 0],
        rotation: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        size = 10
    ) => {
        const diff = 20;
        const positionDotUp: FixedLengthArray<[number, number, number]> = [
            position[0],
            position[1] + diff,
            position[2],
        ];
        const positionDotDown: FixedLengthArray<[number, number, number]> = [
            position[0],
            position[1] - diff,
            position[2],
        ];
        return [
            renderBox(position, undefined, [3 * size, size, size]),
            renderCyl(positionDotUp, [pi / 2, 0, 0], 10),
            renderCyl(positionDotDown, [pi / 2, 0, 0], 10),
        ];
    };

    return (
        <group>{renderDividedBy(props.position, undefined, props.size)}</group>
    );
};

export const Minus = (props: {
    position: FixedLengthArray<[number, number, number]>;
    size: number;
}): JSX.Element => {
    const renderBox = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation = [0, 0, 0],
        size = [10, 10, 10]
    ) => {
        const pos = new Vector3(position[0], position[1], position[2]);
        const rot = new Euler(rotation[0], rotation[1], rotation[2]);
        return (
            <mesh
                position={pos}
                rotation={rot}
                key={`plusBar${position[0] * size[0]}-${
                    position[1] * size[1]
                }-${position[2] * size[2]}`}
            >
                <boxGeometry
                    attach="geometry"
                    args={[size[0], size[1], size[2]]}
                />
                <meshStandardMaterial attach="material" color="black" />
            </mesh>
        );
    };

    const renderMinus = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        size = 10
    ) => {
        return [renderBox(position, undefined, [3 * size, size, size])];
    };

    return <group>{renderMinus(props.position, undefined, props.size)}</group>;
};

export const Times = (props: {
    position: FixedLengthArray<[number, number, number]>;
    size: number;
}): JSX.Element => {
    const renderBox = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        size = [10, 10, 10]
    ) => {
        const pos = new Vector3(position[0], position[1], position[2]);
        const rot = new Euler(rotation[0], rotation[1], rotation[2]);
        return (
            <mesh
                position={pos}
                rotation={rot}
                key={`plusBar${position[0] * size[0]}-${
                    position[1] * size[1]
                }-${position[2] * size[2]}`}
            >
                <boxGeometry
                    attach="geometry"
                    args={[size[0], size[1], size[2]]}
                />
                <meshStandardMaterial attach="material" color="black" />
            </mesh>
        );
    };

    const renderTimes = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        size = 10
    ) => {
        return [
            renderBox(position, rotation, [size, 3 * size, size]),
            renderBox(position, rotation, [3 * size, size, size]),
        ];
    };

    return (
        <group>{renderTimes(props.position, [0, 0, pi / 4], props.size)}</group>
    );
};

export const Equals = (props: {
    position: FixedLengthArray<[number, number, number]>;
    size: number;
}): JSX.Element => {
    const renderBox = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation = [0, 0, 0],
        size = [10, 10, 10]
    ) => {
        const pos = new Vector3(position[0], position[1], position[2]);
        const rot = new Euler(rotation[0], rotation[1], rotation[2]);
        return (
            <mesh
                position={pos}
                rotation={rot}
                key={`plusBar${position[0] * size[0]}-${
                    position[1] * size[1]
                }-${position[2] * size[2]}`}
            >
                <boxGeometry
                    attach="geometry"
                    args={[size[0], size[1], size[2]]}
                />
                <meshStandardMaterial attach="material" color="black" />
            </mesh>
        );
    };

    const renderEquals = (
        position: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        rotation: FixedLengthArray<[number, number, number]> = [0, 0, 0],
        size = 10
    ) => {
        const diff = 20;
        const posDown = position;
        const posUp: FixedLengthArray<[number, number, number]> = [
            position[0],
            position[1] + diff,
            position[2],
        ];
        return [
            renderBox(posUp, undefined, [3 * size, size, size]),
            renderBox(posDown, undefined, [3 * size, size, size]),
        ];
    };

    return <group>{renderEquals(props.position, undefined, props.size)}</group>;
};
