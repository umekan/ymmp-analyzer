import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AppContextType, AppState, CharacterMappings, OutputFormat, TimingOption, YMMPData, ScriptItem } from '../types';
import { storage } from '../utils/storage';
import { extractCharactersFromYMMP, extractScriptFromYMMP } from '../utils/ymmpParser';

// デフォルト値を設定
const defaultState: AppState = {
  ymmFile: null,
  ymmData: null,
  scriptData: null,
  characterMappings: {},
  detectedCharacters: [],
  isLoading: false,
  error: null,
  outputFormat: 'character-dialogue',
  timingOption: 'none',
};

// コンテキストを作成
export const AppContext = createContext<AppContextType | undefined>(undefined);

// コンテキストプロバイダーコンポーネント
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // 状態管理
  const [ymmFile, setYmmFile] = useState<File | null>(defaultState.ymmFile);
  const [ymmData, setYmmData] = useState<YMMPData | null>(defaultState.ymmData);
  const [scriptData, setScriptData] = useState<ScriptItem[] | null>(defaultState.scriptData);
  const [characterMappings, setCharacterMappings] = useState<CharacterMappings>(defaultState.characterMappings);
  const [detectedCharacters, setDetectedCharacters] = useState<string[]>(defaultState.detectedCharacters);
  const [isLoading, setIsLoading] = useState<boolean>(defaultState.isLoading);
  const [error, setError] = useState<string | null>(defaultState.error);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(defaultState.outputFormat);
  const [timingOption, setTimingOption] = useState<TimingOption>(defaultState.timingOption);

  // マッピングを保存
  const saveCharacterMappings = useCallback(() => {
    // ストレージに保存
    storage.setItem('characterMappings', JSON.stringify(characterMappings));
  }, [characterMappings]);

  // UIからマッピングを取得
  const collectMappingsFromUI = useCallback((): CharacterMappings => {
    // このメソッドは実際にはUIコンポーネントから呼び出されるため、
    // 実装はUIコンポーネント側で行う
    return characterMappings;
  }, [characterMappings]);

  // ファイル選択処理
  const handleFileSelection = useCallback((file: File) => {
    if (!file.name.endsWith('.ymmp')) {
      setError('YMMPファイル（.ymmp）を選択してください。');
      return;
    }

    setYmmFile(file);
    setError(null);
    setIsLoading(true);

    // 保存されたマッピングを読み込む
    try {
      const savedMappings = storage.getItem('characterMappings');
      if (savedMappings) {
        setCharacterMappings(JSON.parse(savedMappings));
      }
    } catch (e) {
      console.error('保存された置換マッピングの読み込みに失敗しました:', e);
    }

    // ファイルを読み込む
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        if (e.target?.result) {
          const parsedData = JSON.parse(e.target.result as string) as YMMPData;
          setYmmData(parsedData);

          // キャラクター名を抽出
          const characters = extractCharactersFromYMMP(parsedData);
          setDetectedCharacters(characters);
        }
      } catch (error) {
        setError('ファイルの解析に失敗しました。正しいYMMPファイルか確認してください。');
        console.error('ファイル解析エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('ファイルの読み込みに失敗しました。');
      setIsLoading(false);
    };

    reader.readAsText(file);
  }, []);

  // スクリプト抽出処理
  const extractScript = useCallback(() => {
    if (!ymmData) {
      setError('ファイルが選択されていないか、解析に失敗しています。');
      return;
    }

    try {
      // スクリプトを抽出
      const extractedScript = extractScriptFromYMMP(ymmData);

      if (extractedScript.length === 0) {
        setError('セリフが見つかりませんでした。ファイル形式が正しいか確認してください。');
        return;
      }

      setScriptData(extractedScript);
      setError(null);
    } catch (error) {
      setError('スクリプトの抽出に失敗しました。');
      console.error('Script extraction error:', error);
    }
  }, [ymmData]);

  // コンテキスト値
  const value: AppContextType = {
    ymmFile,
    ymmData,
    scriptData,
    characterMappings,
    detectedCharacters,
    isLoading,
    error,
    outputFormat,
    timingOption,
    setYmmFile,
    setYmmData,
    setScriptData,
    setCharacterMappings,
    setDetectedCharacters,
    setIsLoading,
    setError,
    setOutputFormat,
    setTimingOption,
    handleFileSelection,
    extractScript,
    saveCharacterMappings,
    collectMappingsFromUI,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// カスタムフック
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};