import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import CharacterItem from './Characteritem';
import { CharacterMappings } from '../../types';

const CharacterMapping: React.FC = () => {
  const {
    detectedCharacters,
    characterMappings,
    setCharacterMappings,
    isLoading,
    saveCharacterMappings
  } = useAppContext();
  
  const [saveMessage, setSaveMessage] = useState('');
  
  // 置換設定を保存
  const handleSaveMappings = () => {
    // UIから現在の設定を収集
    const newMappings: CharacterMappings = {};
    
    // 各入力欄の値を取得
    detectedCharacters.forEach(character => {
      const inputElement = document.getElementById(`map-${character}`) as HTMLInputElement;
      if (inputElement) {
        const mappedName = inputElement.value.trim();
        if (mappedName && mappedName !== character) {
          newMappings[character] = mappedName;
        }
      }
    });
    
    // 状態を更新
    setCharacterMappings(newMappings);
    
    // ストレージに保存
    saveCharacterMappings();
    
    // 確認メッセージを表示
    setSaveMessage('保存しました！');
    setTimeout(() => {
      setSaveMessage('');
    }, 2000);
  };
  
  if (detectedCharacters.length === 0 && !isLoading) {
    return null;
  }
  
  return (
    <div className="container" id="character-mapping-container">
      <h2>
        キャラクター名の置換設定
        {isLoading && (
          <span className="loading-characters">
            <span className="loader"></span> 解析中...
          </span>
        )}
      </h2>
      
      <p>
        YMMPファイル内のボイス名を実際のキャラクター名に置き換えます
        {detectedCharacters.length > 0 && (
          <span className="character-count">
            ({detectedCharacters.length}人のキャラクターが見つかりました)
          </span>
        )}
      </p>
      
      <div className="character-mapping-list">
        {detectedCharacters.length === 0 ? (
          <p>キャラクターが見つかりませんでした。</p>
        ) : (
          detectedCharacters.map((character) => (
            <CharacterItem
              key={character}
              originalName={character}
              mappedName={characterMappings[character] || character}
            />
          ))
        )}
      </div>
      
      {detectedCharacters.length > 0 && (
        <button
          className="button button-success save-mappings-button"
          onClick={handleSaveMappings}
        >
          置換設定を保存 {saveMessage && <span>✓ {saveMessage}</span>}
        </button>
      )}
    </div>
  );
};

export default CharacterMapping;