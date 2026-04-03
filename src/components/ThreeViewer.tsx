import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Grid } from '@react-three/drei';
import type { ViewerState, ModelDimensions } from '../types';
import Model from './Model';

interface ThreeViewerProps {
    file: File | null;
    state: ViewerState;
    onLoadChange: (loading: boolean) => void;
    onDimensionsChange: (dims: ModelDimensions | null) => void;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const ThreeViewer: React.FC<ThreeViewerProps> = ({ file, state, onLoadChange, onDimensionsChange, canvasRef }) => {
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
                        onDimensionsChange={onDimensionsChange}
                    />
                </Stage>

                {state.showGrid && (
                    <Grid
                        infiniteGrid
                        fadeDistance={50}
                        fadeStrength={5}
                        cellSize={1}
                        sectionSize={5}
                        sectionColor="#3b82f6"
                        sectionThickness={1.5}
                        cellColor="#64748b"
                        cellThickness={0.5}
                        position={[0, -0.01, 0]}
                    />
                )}

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
