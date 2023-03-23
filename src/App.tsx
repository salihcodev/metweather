// pkgs:
import { Route, Routes } from 'react-router-dom';

// utils:
import './common/style/app.sass';

// comps:

// views:
import { HomePage } from './views/home/home.page';
import { ReportsPage } from './views/reports/reports.page';

// THE APP *_* >>>
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/reports' element={<ReportsPage />} />
      </Routes>
    </>
  );
}

export default App;
