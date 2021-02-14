import React from 'react';

function PrivateLayout({children}) {
  return (
    <div style={{minHeight: '100vh'}}>
      {children}
    </div>
  );
}

export default PrivateLayout;
