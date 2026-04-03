import React from 'react';

interface DropzoneProps {
    onDrop: (file: File) => void;
    onClose: () => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onDrop, onClose }) => {
    return (
        <div
            className="dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files[0];
                if (f) onDrop(f);
            }}
            onClick={onClose}
        >
            <div className="dropzone-inner" onClick={(e) => e.stopPropagation()}>
                <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>Drop STL file to view</p>
                <button className="btn btn-secondary" style={{ marginTop: '20px' }} onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default Dropzone;
