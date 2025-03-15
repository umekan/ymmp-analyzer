import React from 'react';
import { useAppContext } from '../context/AppContext';
import FileUploader from './FileUploader';
import CharacterMapping from './CharacterMapping';
import OutputOptions from './OutputOptions';
import Controls from './Controls';
import ScriptOutput from './ScriptOutput';
import ErrorMessage from './ErrorMessage';

const App: React.FC = () => {
  const { ymmData } = useAppContext();
  
  return (
    <div className="app">
      <h1>YMMP台本抽出ツール</h1>
      <p className="text-center">ゆっくりムービーメーカーのプロジェクトファイルからキャラクターのセリフを抽出</p>
      
      <FileUploader />
      <ErrorMessage />
      
      {ymmData && (
        <>
          <CharacterMapping />
          
          <div className="container">
            <h2>出力オプション</h2>
            <OutputOptions />
            <Controls />
          </div>
          
          <div className="container">
            <h2>抽出結果</h2>
            <ScriptOutput />
          </div>
        </>
      )}
    </div>
  );
};

export default App;