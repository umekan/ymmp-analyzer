import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ScriptItem } from '../types';
import { processScriptData } from '../utils/formatters';

const ScriptOutput: React.FC = () => {
  const { 
    scriptData, 
    characterMappings, 
    outputFormat, 
    timingOption 
  } = useAppContext();
  
  if (!scriptData || scriptData.length === 0) {
    return (
      <div id="script-output" className="hidden"></div>
    );
  }
  
  // キャラクター名を置換したデータを取得
  const processedScriptData = processScriptData(scriptData, characterMappings);
  
  // 各行のレンダリング
  const renderScriptLine = (line: ScriptItem, index: number) => {
    let lineContent = null;
    
    switch (outputFormat) {
      case 'character-dialogue':
        lineContent = (
          <>
            <span className="character-name">{line.character}:</span>
            <span className="dialogue">{line.dialogue}</span>
          </>
        );
        break;
      case 'dialogue-only':
        lineContent = <span className="dialogue">{line.dialogue}</span>;
        break;
      case 'full':
        lineContent = (
          <>
            <span className="character-name">{line.character}:</span>
            <span className="dialogue">{line.dialogue}</span>
          </>
        );
        break;
    }
    
    return (
      <div key={index} className="script-line">
        {lineContent}
        
        {(timingOption === 'frame' || timingOption === 'both') && (
          <span className="frame">[{line.frameText}]</span>
        )}
        
        {(timingOption === 'timestamp' || timingOption === 'both') && (
          <span className="timestamp">[{line.timestamp}]</span>
        )}
      </div>
    );
  };
  
  return (
    <div id="script-output" className="script-output">
      {processedScriptData.map((line, index) => renderScriptLine(line, index))}
    </div>
  );
};

export default ScriptOutput;