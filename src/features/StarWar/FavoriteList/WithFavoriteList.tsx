import React from 'react';
import { FavoriteFilmsProps } from './interface';


const WithFavoriteList = (Component: React.FC<FavoriteFilmsProps>) => {
  const Hoc = (props: FavoriteFilmsProps) => { 
    const newProps = {
        ...props,
      };
  
      return <Component {...newProps} />;
  };

  return Hoc;
};

export { WithFavoriteList };