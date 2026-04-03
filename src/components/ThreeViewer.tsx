import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import type { ViewerState } from '../types';
import Model from './Model';

interface ThreeViewerProps {
    file: File | null;
    state: ViewerState;
    onLoadChange: (loading: boolean) => void;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const ThreeViewer: React.FC<ThreeViewerProps> = ({ file, state, onLoadChange, canvasRef }) => {
    return (
        <Canvas
            ref={canvasRef as any}
            shadows
            camera={{ position: [10, 10, 10], fov: 45 }}
            gl={{
                antialias: true,
                preserveDrawingBuffer: true,
                alpha: true,
                powerPreference: "high-performance"
            }}
        >
            <Suspense fallback={null}>
                <Stage
                    intensity={state.lightIntensity}
                    environment="city"
                    adjustCamera={true}
                    shadows={{ type: 'contact', opacity: 0.4, blur: 2, scale: 10, resolution: 256 }}
                    center={{ top: true }}
                >
                    <Model
                        file={file}
                        state={state}
                        onLoadChange={onLoadChange}
                    />
                </Stage>

                <OrbitControls
                    enableDamping
                    dampingFactor={0.1}
                    autoRotate={state.autoRotate}
                    makeDefault
                />
            </Suspense>
        </Canvas>
    );
};

export default ThreeViewer;
