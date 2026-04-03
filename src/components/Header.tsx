import React, { useRef, memo } from 'react';

interface HeaderProps {
    onUpload: (file: File) => void;
}

const Header: React.FC<HeaderProps> = memo(({ onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <header className="header glass-panel">
            <div className="logo">
                <span className="logo-text">STL</span><span className="logo-tag">VIEWER</span>
            </div>
            <div className="header-actions">
                <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
                    Load Model
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".stl"
                    hidden
                    onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
                />
            </div>
        </header>
    );
});

export default Header;
