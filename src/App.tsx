import React, { useState, useRef, useEffect } from 'react';
import ThreeViewer from './components/ThreeViewer';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dropzone from './components/Dropzone';
import type { ViewerState } from './types';
import './App.css';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [state, setState] = useState<ViewerState>({
    color: '#ffffff',
    roughness: 0.2,
    metalness: 0.2,
    wireframe: false,
    shading: 'smooth',
    autoRotate: false,
    zUp: true,
    lightIntensity: 1.5,
    bgStart: '#1a1a2e',
    bgEnd: '#16213e'
  });

  const handleFileChange = (newFile: File) => {
    if (newFile.name.toLowerCase().endsWith('.stl')) {
      setFile(newFile);
    }
  };

  const handleClear = () => setFile(null);

  const handleSaveRender = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'stl-render.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };
    const handleDropGlobal = () => setIsDragging(false);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDropGlobal);
    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDropGlobal);
    };
  }, []);

  return (
    <div
      className="app-container"
      style={{ background: `radial-gradient(circle at center, ${state.bgStart} 0%, ${state.bgEnd} 100%)` }}
    >
      <Header onUpload={handleFileChange} />

      <Sidebar
        state={state}
        setState={setState}
        onClear={handleClear}
        onSave={handleSaveRender}
      />

      <div className="canvas-container">
        <ThreeViewer
          file={file}
          state={state}
          onLoadChange={setIsLoading}
          canvasRef={canvasRef}
        />
      </div>

      {isLoading && <div className="loader"><div className="spinner" /></div>}

      {isDragging && (
        <Dropzone
          onDrop={(f) => { handleFileChange(f); setIsDragging(false); }}
          onClose={() => setIsDragging(false)}
        />
      )}
    </div>
  );
};

export default App;
