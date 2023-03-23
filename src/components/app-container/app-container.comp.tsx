// pkgs:
import { FC } from 'react';

// utils:
import './style.sass';
import IAppContainer from '../../common/interfaces/app-container.interface';

// comps:

// component>>>
export const AppContainer: FC<IAppContainer> = ({ children, container }) => {
  return <div className={`container ${container}`}>{children}</div>;
};
