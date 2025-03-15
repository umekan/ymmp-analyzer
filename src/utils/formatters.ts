import { ScriptItem, CharacterMappings, OutputFormat, TimingOption } from '../types';

/**
 * スクリプトデータを処理してキャラクター名を置換
 */
export const processScriptData = (
  scriptData: ScriptItem[],
  characterMappings: CharacterMappings
): ScriptItem[] => {
  return scriptData.map(line => {
    // ディープコピーを作成
    const newLine = { ...line };
    
    // キャラクター名の置換
    if (characterMappings[newLine.character]) {
      newLine.originalCharacter = newLine.character; // 元の名前を保存
      newLine.character = characterMappings[newLine.character]; // 置換後の名前に変更
    }
    
    return newLine;
  });
};

/**
 * スクリプトデータをプレーンテキストに変換
 */
export const convertScriptToText = (
  scriptData: ScriptItem[],
  characterMappings: CharacterMappings,
  outputFormat: OutputFormat,
  timingOption: TimingOption
): string => {
  // 処理したスクリプトデータを取得
  const processedScriptData = processScriptData(scriptData, characterMappings);
  
  let textContent = '';
  
  processedScriptData.forEach((line) => {
    let lineText = '';
    
    switch (outputFormat) {
      case 'character-dialogue':
        lineText = `${line.character}: ${line.dialogue}`;
        break;
      case 'dialogue-only':
        lineText = line.dialogue;
        break;
      case 'full':
        lineText = `${line.character}: ${line.dialogue}`;
        break;
    }
    
    // 時間表示の追加
    if (timingOption === 'frame' || timingOption === 'both') {
      lineText += ` [${line.frameText}]`;
    }
    
    if (timingOption === 'timestamp' || timingOption === 'both') {
      lineText += ` [${line.timestamp}]`;
    }
    
    textContent += lineText + '\n\n';
  });
  
  return textContent;
};