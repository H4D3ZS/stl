import React from 'react';
import type { ViewerState } from '../types';

interface SidebarProps {
    state: ViewerState;
    setState: React.Dispatch<React.SetStateAction<ViewerState>>;
    onClear: () => void;
    onSave: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ state, setState, onClear, onSave }) => {
    const updateState = <K extends keyof ViewerState>(key: K, value: ViewerState[K]) => {
        setState(prev => ({ ...prev, [key]: value }));
    };

    return (
        <aside className="sidebar glass-panel">
            <div className="section">
                <h3>View & Material</h3>
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
                <h3>Lighting & Environment</h3>
                <div className="control-group">
                    <label>Intensity ({state.lightIntensity})</label>
                    <input
                        type="range" min="0" max="5" step="0.1"
                        value={state.lightIntensity}
                        onChange={(e) => updateState('lightIntensity', parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <div className="section">
                <h3>Background</h3>
                <div className="control-group">
                    <label>Start Color</label>
                    <input
                        type="color"
                        value={state.bgStart}
                        onChange={(e) => updateState('bgStart', e.target.value)}
                    />
                </div>
                <div className="control-group">
                    <label>End Color</label>
                    <input
                        type="color"
                        value={state.bgEnd}
                        onChange={(e) => updateState('bgEnd', e.target.value)}
                    />
                </div>
            </div>

            <button className="btn btn-secondary" onClick={onSave}>Save Render</button>
        </aside>
    );
};

export default Sidebar;
