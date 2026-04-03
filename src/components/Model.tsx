import React, { useEffect, useState, useMemo } from 'react';
import { STLLoader } from 'three-stdlib';
import * as THREE from 'three';
import type { ViewerState } from '../types';

interface ModelProps {
    file: File | null;
    state: ViewerState;
    onLoadChange: (loading: boolean) => void;
}

const Model: React.FC<ModelProps> = ({ file, state, onLoadChange }) => {
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

    useEffect(() => {
        if (!file) {
            setGeometry(null);
            return;
        }

        onLoadChange(true);
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const loader = new STLLoader();
                const loadedGeom = loader.parse(e.target?.result as ArrayBuffer);

                // Ensure geometry is centered if not using Stage's center
                loadedGeom.computeBoundingBox();

                setGeometry(loadedGeom);
            } catch (err) {
                console.error("Error parsing STL:", err);
            } finally {
                onLoadChange(false);
            }
        };
        reader.onerror = () => {
            console.error("Error reading file");
            onLoadChange(false);
        };
        reader.readAsArrayBuffer(file);
    }, [file, onLoadChange]);

    // Use memo for material to avoid ad-hoc objects in render loop
    const materialProps = useMemo(() => ({
        color: state.color,
        metalness: state.metalness,
        roughness: state.roughness,
        wireframe: state.wireframe,
        flatShading: state.shading === 'flat',
    }), [state.color, state.metalness, state.roughness, state.wireframe, state.shading]);

    if (!geometry) {
        return (
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#444444" metalness={0.5} roughness={0.5} />
            </mesh>
        );
    }

    return (
        <mesh
            geometry={geometry}
            castShadow
            receiveShadow
            rotation={state.zUp ? [-Math.PI / 2, 0, 0] : [0, 0, 0]}
        >
            <meshStandardMaterial {...materialProps} />
        </mesh>
    );
};

export default Model;
