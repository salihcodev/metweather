// pkgs:
import { FC, useContext, useEffect } from 'react';

// utils:
import './style.sass';
import ICitiesForm from '../../common/interfaces/cities-form.interface';

// comps:
import { CityFormRow } from '../city-form-row/city-form-row.comp';
import { FormSettings } from '../form-settings/form-settings.comp';
import { InitialFormRowType } from '../../common/@types/initial-form-row.type';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../../common/context/app-context';

// component>>>
export const CitiesForm: FC<ICitiesForm> = ({ formData }) => {
  const { setFormData, setSearchOptions, initialFormRow } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Which item user seeks for:
  const src = searchParams.get('src');

  const lastHistory = localStorage.getItem(`searchHistory`);
  const _lastHistory = lastHistory ? JSON.parse(lastHistory) : [];

  // Catch up with the user action to view certain history:
  const localFormData = _lastHistory?.find((row: any) => (row.id === src ? row.dataToFillWith : null));

  // Check and fill:
  useEffect(() => {
    if (localFormData?.dataToFillWith.length > 0) {
      setFormData(localFormData?.dataToFillWith);
      setSearchOptions(localFormData?.settings);
    } else {
      setFormData([]);
    }

    return () => {
      // Clear it up, To be ready for the next mount:
      setFormData([]);
    };
  }, []);

  return (
    <section className="cities-form">
      <h2>Select Coordinates Or City</h2>
      <FormSettings />
      {formData?.length > 0 ? (
        <form>
          {formData?.map((row: InitialFormRowType) => (
            <CityFormRow key={row.id} row={row} />
          ))}
        </form>
      ) : (
        <div className="blank">
          <p>Catch up the world, Enter a city name or some coordinates</p>
        </div>
      )}
    </section>
  );
};
