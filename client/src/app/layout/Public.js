import React from 'react';

function PublicLayout({children}) {
  return (
    <div style={{minHeight: '100vh'}}>
      {children}
    </div>
  );
}

export default PublicLayout;
