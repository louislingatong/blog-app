import React from 'react';

function PrivateLayout({fixedHeader, children}) {
  return (
    <div className={fixedHeader ? 'layout-wrapper fixed' : 'layout-wrapper'}>
      {children}
    </div>
  );
}

export default PrivateLayout;
