import React from 'react';
import { useAppContext } from '../context/AppContext';

const ErrorMessage: React.FC = () => {
  const { error } = useAppContext();
  
  if (!error) {
    return null;
  }
  
  return (
    <div className="error-message">
      {error}
    </div>
  );
};

export default ErrorMessage;