import React from 'react';
import { FavoritePeopleProps } from './interface';


const WithPeopleFavoriteList = (Component: React.FC<FavoritePeopleProps>) => {
  const Hoc = (props: FavoritePeopleProps) => { 
    const newProps = {
        ...props,
      };
  
      return <Component {...newProps} />;
  };

  return Hoc;
};

export { WithPeopleFavoriteList };