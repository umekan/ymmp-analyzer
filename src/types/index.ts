// YMMPファイル関連の型定義
export interface YMMPData {
    Timelines?: Timeline[];
    [key: string]: any;
  }
  
  export interface Timeline {
    Items?: TimelineItem[];
    VideoInfo?: {
      FPS?: number;
      [key: string]: any;
    };
    [key: string]: any;
  }
  
  export interface TimelineItem {
    $type?: string;
    CharacterName?: string;
    Serif?: string;
    Frame?: number;
    [key: string]: any;
  }
  
  // スクリプト関連の型定義
  export interface ScriptItem {
    character: string;
    dialogue: string;
    timestamp: string;
    frame: number;
    frameText: string;
    originalCharacter?: string;
  }
  
  // キャラクター置換マッピングの型定義
  export interface CharacterMappings {
    [key: string]: string;
  }
  
  // 出力形式の型定義
  export type OutputFormat = 'character-dialogue' | 'dialogue-only' | 'full';
  
  // 時間表示オプションの型定義
  export type TimingOption = 'none' | 'frame' | 'timestamp' | 'both';
  
  // アプリケーション全体の状態型定義
  export interface AppState {
    ymmFile: File | null;
    ymmData: YMMPData | null;
    scriptData: ScriptItem[] | null;
    characterMappings: CharacterMappings;
    detectedCharacters: string[];
    isLoading: boolean;
    error: string | null;
    outputFormat: OutputFormat;
    timingOption: TimingOption;
  }
  
  // コンテキスト型定義
  export interface AppContextType extends AppState {
    setYmmFile: (file: File | null) => void;
    setYmmData: (data: YMMPData | null) => void;
    setScriptData: (data: ScriptItem[] | null) => void;
    setCharacterMappings: (mappings: CharacterMappings) => void;
    setDetectedCharacters: (characters: string[]) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setOutputFormat: (format: OutputFormat) => void;
    setTimingOption: (option: TimingOption) => void;
    
    // アクション
    handleFileSelection: (file: File) => void;
    extractScript: () => void;
    saveCharacterMappings: () => void;
    collectMappingsFromUI: () => CharacterMappings;
  }