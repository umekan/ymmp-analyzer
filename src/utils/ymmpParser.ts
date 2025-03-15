import { YMMPData, ScriptItem } from '../types';

/**
 * YMMPファイルからキャラクター名を抽出
 */
export const extractCharactersFromYMMP = (ymmData: YMMPData): string[] => {
  const characters = new Set<string>();
  
  try {
    // ゆっくりムービーメーカーの標準構造に基づく抽出
    if (ymmData.Timelines && Array.isArray(ymmData.Timelines)) {
      for (const timeline of ymmData.Timelines) {
        if (timeline.Items && Array.isArray(timeline.Items)) {
          for (const item of timeline.Items) {
            if (item.$type && item.$type.includes("VoiceItem") && item.CharacterName) {
              characters.add(item.CharacterName);
            }
          }
        }
      }
    }
    
    // バックアップとして再帰的に検索（必要な場合）
    if (characters.size === 0) {
      recursivelyFindCharacters(ymmData, characters);
    }
    
  } catch (error) {
    console.error('Character extraction error:', error);
  }
  
  return Array.from(characters).sort();
};

/**
 * 再帰的にキャラクター名を検索
 */
const recursivelyFindCharacters = (obj: any, characters: Set<string>): void => {
  if (typeof obj !== 'object' || obj === null) return;
  
  if (obj.$type && obj.$type.includes("VoiceItem") && obj.CharacterName) {
    characters.add(obj.CharacterName);
    return;
  }
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      recursivelyFindCharacters(obj[key], characters);
    }
  }
};

/**
 * YMMPファイルからスクリプトを抽出
 */
export const extractScriptFromYMMP = (ymmData: YMMPData): ScriptItem[] => {
  const script: ScriptItem[] = [];
  
  try {
    // ゆっくりムービーメーカーの標準構造に基づく抽出
    if (ymmData.Timelines && Array.isArray(ymmData.Timelines)) {
      // すべてのタイムラインを処理
      for (const timeline of ymmData.Timelines) {
        if (timeline.Items && Array.isArray(timeline.Items)) {
          // タイムライン内のアイテムを処理
          for (const item of timeline.Items) {
            // VoiceItemを探す（セリフが含まれる主要なアイテムタイプ）
            if (item.$type && item.$type.includes("VoiceItem")) {
              // CharacterNameとSerifを抽出
              if (item.CharacterName && item.Serif) {
                const frameNumber = item.Frame || 0;
                const fps = timeline.VideoInfo?.FPS || 60;
                const timeInSeconds = frameNumber / fps;
                
                // フレーム番号と時間の情報を記録
                script.push({
                  character: item.CharacterName,
                  dialogue: item.Serif.replace(/\r\n/g, ' '),
                  timestamp: convertTimeToString(timeInSeconds),
                  frame: frameNumber,
                  frameText: `${frameNumber}フレーム目`
                });
              }
            }
          }
        }
      }
    }
    
    // バックアップとして再帰的に検索（必要な場合に使用）
    if (script.length === 0) {
      recursivelyFindDialogue(ymmData, script);
    }
    
    // フレーム順に並べ替え（Frame番号で厳密にソート）
    script.sort((a, b) => {
      // Frame値が存在する場合はそれでソート
      if (a.frame !== undefined && b.frame !== undefined) {
        return a.frame - b.frame;
      }
      // Frameがない場合はタイムスタンプでソート（バックアップ）
      return convertTimeStringToSeconds(a.timestamp) - convertTimeStringToSeconds(b.timestamp);
    });
    
  } catch (error) {
    console.error('Script extraction error:', error);
  }
  
  return script;
};

/**
 * 再帰的にダイアログを検索する関数
 */
const recursivelyFindDialogue = (obj: any, script: ScriptItem[]): void => {
  if (typeof obj !== 'object' || obj === null) return;
  
  // VoiceItemタイプとCharacterName/Serifプロパティを持つオブジェクトを探す
  if (obj.$type && obj.$type.includes("VoiceItem") && obj.CharacterName && obj.Serif) {
    const frameNumber = obj.Frame || 0;
    
    script.push({
      character: obj.CharacterName,
      dialogue: obj.Serif.replace(/\r\n/g, ' '),
      timestamp: convertTimeToString(0), // フレームからの変換は上位で行う
      frame: frameNumber,
      frameText: `${frameNumber}フレーム目`
    });
    return;
  }
  
  // 再帰的に検索
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      recursivelyFindDialogue(obj[key], script);
    }
  }
};

/**
 * 秒数を時間文字列に変換（例: 65 -> "00:01:05"）
 */
export const convertTimeToString = (seconds: number): string => {
  if (typeof seconds !== 'number') {
    seconds = parseFloat(String(seconds)) || 0;
  }
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * 時間文字列を秒数に変換（例: "00:01:05" -> 65）
 */
export const convertTimeStringToSeconds = (timeString: string): number => {
  const parts = timeString.split(':').map(Number);
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
};