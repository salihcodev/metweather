// pkgs:
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// utils:
import './style.sass';
import { AppContext } from '../../common/context/app-context';

// comps:
import { AppLayout } from '../../components/app-layout/app-layout.comp';
import { FormGraphs } from '../../components/form-graphs/form-graphs.comp';
import { CitiesForm } from '../../components/cities-form/cities-form.comp';
import { AppContainer } from '../../components/app-container/app-container.comp';

// component>>>
export const HomePage = () => {
  const { formData } = useContext(AppContext);

  return (
    <div className="page-wrapper">
      <AppLayout container="xl">
        <main className="page home">
          <AppContainer container="lg">
            <CitiesForm formData={formData} />
            <FormGraphs formData={formData} />
            <footer>
              <Link to="/reports">Browse History</Link>
            </footer>
          </AppContainer>
        </main>
      </AppLayout>
    </div>
  );
};
