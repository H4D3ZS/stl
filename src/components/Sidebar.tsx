import React, { useMemo } from 'react';
import type { ViewerState, ModelDimensions } from '../types';

interface SidebarProps {
    state: ViewerState;
    setState: React.Dispatch<React.SetStateAction<ViewerState>>;
    onClear: () => void;
    onSave: () => void;
    dimensions: ModelDimensions | null;
}

const Sidebar: React.FC<SidebarProps> = ({ state, setState, onClear, onSave, dimensions }) => {
    const updateState = <K extends keyof ViewerState>(key: K, value: ViewerState[K]) => {
        setState(prev => ({ ...prev, [key]: value }));
    };

    const formattedDimensions = useMemo(() => {
        if (!dimensions) return null;
        const factor = state.unit === 'mm' ? 1 : state.unit === 'cm' ? 0.1 : 0.0393701;
        const unitLabel = state.unit;
        return {
            x: (dimensions.width * factor).toFixed(2),
            y: (dimensions.height * factor).toFixed(2),
            z: (dimensions.depth * factor).toFixed(2),
            label: unitLabel
        };
    }, [dimensions, state.unit]);

    return (
        <aside className="sidebar glass-panel">
            {formattedDimensions && (
                <div className="section dimensions-hud">
                    <h3>Dimensions ({formattedDimensions.label})</h3>
                    <div className="dim-row">
                        <span>X: {formattedDimensions.x}</span>
                        <span>Y: {formattedDimensions.y}</span>
                        <span>Z: {formattedDimensions.z}</span>
                    </div>
                </div>
            )}

            <div className="section">
                <h3>View & Material</h3>
                <div className="control-group">
                    <label>Units</label>
                    <select
                        value={state.unit}
                        onChange={(e) => updateState('unit', e.target.value as 'mm' | 'cm' | 'in')}
                    >
                        <option value="mm">Millimeters (mm)</option>
                        <option value="cm">Centimeters (cm)</option>
                        <option value="in">Inches (in)</option>
                    </select>
                </div>
                <div className="control-group-inline">
                    <label>Show Grid</label>
                    <input
                        type="checkbox"
                        checked={state.showGrid}
                        onChange={(e) => updateState('showGrid', e.target.checked)}
                    />
                </div>
                <div className="control-group">
                    <label>Color</label>
                    <input
                        type="color"
                        value={state.color}
                        onChange={(e) => updateState('color', e.target.value)}
                    />
                </div>
                <div className="control-group">
                    <label>Shading</label>
                    <select
                        value={state.shading}
                        onChange={(e) => updateState('shading', e.target.value as 'smooth' | 'flat')}
                    >
                        <option value="smooth">Smooth</option>
                        <option value="flat">Flat</option>
                    </select>
                </div>
                <div className="control-group-inline">
                    <label>Wireframe</label>
                    <input
                        type="checkbox"
                        checked={state.wireframe}
                        onChange={(e) => updateState('wireframe', e.target.checked)}
                    />
                </div>
                <div className="control-group">
                    <label>Metalness ({state.metalness})</label>
                    <input
                        type="range" min="0" max="1" step="0.01"
                        value={state.metalness}
                        onChange={(e) => updateState('metalness', parseFloat(e.target.value))}
                    />
                </div>
                <div className="control-group">
                    <label>Roughness ({state.roughness})</label>
                    <input
                        type="range" min="0" max="1" step="0.01"
                        value={state.roughness}
                        onChange={(e) => updateState('roughness', parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <div className="section">
                <h3>Orientation</h3>
                <div className="control-group-inline">
                    <label>Z-Axis Up</label>
                    <input
                        type="checkbox"
                        checked={state.zUp}
                        onChange={(e) => updateState('zUp', e.target.checked)}
                    />
                </div>
                <div className="control-group-inline">
                    <label>Auto Rotate</label>
                    <input
                        type="checkbox"
                        checked={state.autoRotate}
                        onChange={(e) => updateState('autoRotate', e.target.checked)}
                    />
                </div>
                <button className="btn btn-danger" onClick={onClear}>Clear Model</button>
            </div>

            <div className="section">
                <h3>Lighting</h3>
                <div className="control-group">
                    <label>Intensity ({state.lightIntensity})</label>
                    <input
                        type="range" min="0" max="5" step="0.1"
                        value={state.lightIntensity}
                        onChange={(e) => updateState('lightIntensity', parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <button className="btn btn-secondary" onClick={onSave}>Save Render</button>
        </aside>
    );
};

export default Sidebar;
