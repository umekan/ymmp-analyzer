import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { useAppContext } from '../context/AppContext';

const FileUploader: React.FC = () => {
  const { ymmFile, handleFileSelection } = useAppContext();
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ドラッグイベントハンドラ
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    if (e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  // クリックでファイル選択
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  return (
    <div className="container">
      <h2>ファイル選択</h2>
      <div
        className={`upload-area ${isDragActive ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {ymmFile ? (
          <p>選択されたファイル: {ymmFile.name}</p>
        ) : (
          <p>ここにYMMPファイルをドラッグ＆ドロップするか、クリックして選択してください</p>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          accept=".ymmp"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUploader;