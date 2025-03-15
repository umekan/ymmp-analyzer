import React from 'react';

interface CharacterItemProps {
  originalName: string;
  mappedName: string;
}

const CharacterItem: React.FC<CharacterItemProps> = ({ originalName, mappedName }) => {
  return (
    <div className="character-mapping-item">
      <label htmlFor={`map-${originalName}`}>{originalName}:</label>
      <input
        type="text"
        id={`map-${originalName}`}
        className="character-map-input"
        data-original={originalName}
        defaultValue={mappedName}
      />
    </div>
  );
};

export default CharacterItem;