import React from 'react';

const WithNavbar = (Component: React.FC) => {
  const Hoc = () => { 
      return <Component />;
  };
  return Hoc;
};

export { WithNavbar };

