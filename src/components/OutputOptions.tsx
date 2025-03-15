import React from 'react';
import { useAppContext } from '../context/AppContext';
import { OutputFormat, TimingOption } from '../types';

const OutputOptions: React.FC = () => {
  const { 
    outputFormat, 
    setOutputFormat, 
    timingOption, 
    setTimingOption 
  } = useAppContext();
  
  // フォーマット変更ハンドラ
  const handleFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutputFormat(e.target.value as OutputFormat);
  };
  
  // タイミングオプション変更ハンドラ
  const handleTimingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimingOption(e.target.value as TimingOption);
  };
  
  return (
    <div id="format-options" className="format-options">
      <h3>出力形式：</h3>
      
      <div className="radio-group">
        <input
          type="radio"
          id="format-character-dialogue"
          name="format"
          value="character-dialogue"
          checked={outputFormat === 'character-dialogue'}
          onChange={handleFormatChange}
        />
        <label htmlFor="format-character-dialogue">キャラクター名：セリフ</label>
      </div>
      
      <div className="radio-group">
        <input
          type="radio"
          id="format-dialogue-only"
          name="format"
          value="dialogue-only"
          checked={outputFormat === 'dialogue-only'}
          onChange={handleFormatChange}
        />
        <label htmlFor="format-dialogue-only">セリフのみ</label>
      </div>
      
      <div className="radio-group">
        <input
          type="radio"
          id="format-full"
          name="format"
          value="full"
          checked={outputFormat === 'full'}
          onChange={handleFormatChange}
        />
        <label htmlFor="format-full">詳細（フレーム情報付き）</label>
      </div>
      
      <div className="select-group">
        <label htmlFor="timing-option">時間表示：</label>
        <select
          id="timing-option"
          name="timing-option"
          value={timingOption}
          onChange={handleTimingChange}
        >
          <option value="none">なし</option>
          <option value="frame">フレーム番号</option>
          <option value="timestamp">タイムスタンプ</option>
          <option value="both">両方</option>
        </select>
      </div>
    </div>
  );
};

export default OutputOptions;