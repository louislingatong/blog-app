import React from 'react';

function PublicLayout({fixedHeader, children}) {
  return (
    <div className={fixedHeader ? 'layout-wrapper fixed' : 'layout-wrapper'}>
      {children}
    </div>
  );
}

export default PublicLayout;
