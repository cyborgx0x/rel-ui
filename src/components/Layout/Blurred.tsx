import * as React from 'react';


interface BlurredComponentProps {
  children: React.ReactNode;
}

const BlurItem: React.FC<BlurredComponentProps> = ({ children }) => {
  const blurredComponentStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
  };
  return (
    <div style={blurredComponentStyle}>
      {children}
    </div>
  );
};

export default BlurItem;
