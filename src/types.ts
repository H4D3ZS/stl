export interface ViewerState {
    color: string;
    roughness: number;
    metalness: number;
    wireframe: boolean;
    shading: 'smooth' | 'flat';
    autoRotate: boolean;
    zUp: boolean;
    lightIntensity: number;
    bgStart: string;
    bgEnd: string;
    showGrid: boolean;
    unit: 'mm' | 'cm' | 'in';
}

export interface ModelDimensions {
    width: number;
    height: number;
    depth: number;
}
