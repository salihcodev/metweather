// pkgs:

// utils:
import { FC } from 'react';

import './style.sass';

// comps:
import { AppContainer } from '../../components/app-container/app-container.comp';
import { AppLayout } from '../../components/app-layout/app-layout.comp';
import { ReportsTable } from '../../components/reports-table/reports-table.comp';

// component>>>
export const ReportsPage: FC<{}> = ({}) => {
  return (
    <div className="page-wrapper">
      <AppLayout container="xl">
        <AppContainer container="lg">
          <main className="page reports">
            <ReportsTable />
          </main>
        </AppContainer>
      </AppLayout>
    </div>
  );
};
