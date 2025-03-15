import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { convertScriptToText } from '../utils/formatters';

const Controls: React.FC = () => {
  const { 
    scriptData, 
    characterMappings, 
    outputFormat,
    timingOption,
    ymmFile,
    extractScript 
  } = useAppContext();
  
  const [copyMessage, setCopyMessage] = useState('');
  
  // スクリプト抽出ボタンのハンドラ
  const handleExtractScript = () => {
    extractScript();
  };
  
  // ダウンロードボタンのハンドラ
  const handleDownload = () => {
    if (!scriptData || scriptData.length === 0 || !ymmFile) return;
    
    // テキストを取得
    const textContent = convertScriptToText(
      scriptData,
      characterMappings,
      outputFormat,
      timingOption
    );
    
    // ダウンロード用のリンクを作成
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = ymmFile.name.replace('.ymmp', '') + '_script.txt';
    document.body.appendChild(a);
    a.click();
    
    // クリーンアップ
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };
  
  // コピーボタンのハンドラ
  const handleCopy = () => {
    if (!scriptData || scriptData.length === 0) return;
    
    // テキストを取得
    const textContent = convertScriptToText(
      scriptData,
      characterMappings,
      outputFormat,
      timingOption
    );
    
    // クリップボードにコピー
    navigator.clipboard.writeText(textContent)
      .then(() => {
        setCopyMessage('コピーしました！');
        setTimeout(() => {
          setCopyMessage('');
        }, 2000);
      })
      .catch(err => {
        console.error('クリップボードへのコピーに失敗しました:', err);
      });
  };
  
  return (
    <div className="controls">
      <button 
        id="extract-button" 
        className="button"
        onClick={handleExtractScript}
      >
        スクリプトを抽出
      </button>
      
      <div className="controls-right">
        <button 
          id="download-button" 
          className="button"
          disabled={!scriptData || scriptData.length === 0}
          onClick={handleDownload}
        >
          テキストファイルとしてダウンロード
        </button>
        
        <button 
          id="copy-button" 
          className="button button-success"
          disabled={!scriptData || scriptData.length === 0}
          onClick={handleCopy}
        >
          {copyMessage || 'クリップボードにコピー'}
        </button>
      </div>
    </div>
  );
};

export default Controls;