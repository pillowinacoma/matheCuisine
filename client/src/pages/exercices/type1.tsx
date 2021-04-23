import * as React from 'react';
import Board from '../components/board';
import { Group, BoxBufferGeometry, MeshStandardMaterial, Mesh, CircleBufferGeometry, MeshBasicMaterial } from 'three';
import {useFrame} from 'react-three-fiber'
import Sphere from '../components/sphere';

const Type1 = (props: {params: any}) : JSX.Element => {



    
    return (
      <Board>
            <color attach="background" args={['whitesmoke']} />
            <Sphere/>
      </Board>
    );

}

export default Type1;