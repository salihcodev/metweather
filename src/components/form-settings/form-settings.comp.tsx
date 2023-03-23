// pkgs:
import { FC, useContext } from 'react';
import { v4 as uuid } from 'uuid';

// utils:
import './style.sass';
import { AppContext } from '../../common/context/app-context';
import { InitialFormRowType } from '../../common/@types/initial-form-row.type';
import { AiOutlinePlus } from 'react-icons/ai';

// comps:

// component>>>
export const FormSettings: FC<{}> = () => {
  const { searchOptions, setSearchOptions, addNewRow, formData } = useContext(AppContext);

  const saveToLocal = () => {
    const lastHistory = localStorage.getItem(`searchHistory`);
    const _lastHistory = lastHistory ? JSON.parse(lastHistory) : [];

    const cities = formData.map(({ cityName }: { cityName: string }) => {
      return cityName;
    });

    const coords = formData.map(({ coordinates }: any) => {
      return coordinates;
    });

    const dates = formData.map(({ dateRange }: any) => {
      return dateRange;
    });

    const submission = {
      id: uuid(),
      cities,
      coords,
      dates,
      settings: searchOptions,
      issuedDate: new Date().toJSON().slice(0, 10),
      dataToFillWith: formData,
    };

    localStorage.setItem(`searchHistory`, JSON.stringify([..._lastHistory, submission]));
  };

  return (
    <header className="settings-header">
      <div className="wing settings">
        <div>
          <input
            type="checkbox"
            id="temperature"
            name="temperature"
            onClick={(e: React.FormEvent<HTMLInputElement>) =>
              setSearchOptions({ ...searchOptions, temperature: e.currentTarget.checked })
            }
            checked={true}
          />
          <button className="alt-check">
            <span></span>
          </button>
          <label htmlFor="temperature">Temperature</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="humidity"
            name="humidity"
            onClick={(e) => setSearchOptions({ ...searchOptions, humidity: e.currentTarget.checked })}
            checked={searchOptions?.humidity}
          />
          <button className="alt-check">
            <span></span>
          </button>
          <label htmlFor="humidity">Relative Humidity</label>
        </div>
      </div>

      <div className="wing controllers">
        <button className="add-new-row" onClick={addNewRow}>
          <AiOutlinePlus />
        </button>
        <button className="save-current" onClick={saveToLocal}>
          Save
        </button>
      </div>
    </header>
  );
};
