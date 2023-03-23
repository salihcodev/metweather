// pkgs:
import { FC } from 'react';

// utils:
import './style.sass';

// comps:
import { AppFooter } from '../app-footer/app-footer.comp';
import { AppHeader } from '../app-header/app-header.comp';
import IAppLayout from '../../common/interfaces/app-layout.interface';
import { AppContainer } from '../app-container/app-container.comp';

// component>>>
export const AppLayout: FC<IAppLayout> = ({
  children,
  showHeader = true,
  showFooter = true,
  container,
}) => {
  return (
    <div className='layout-wrapper'>
      <AppContainer container={container}>
        <>
          {showHeader ? <AppHeader /> : null}
          {children}
          {showFooter ? <AppFooter /> : null}
        </>
      </AppContainer>
    </div>
  );
};
