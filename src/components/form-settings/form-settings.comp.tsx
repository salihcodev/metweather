// pkgs:
import { FC, useContext } from 'react';
import { v4 as uuid } from 'uuid';

// utils:
import './style.sass';
import { AppContext } from '../../common/context/app-context';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';

// comps:

// component>>>
export const FormSettings: FC<{}> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchOptions, setSearchOptions, addNewRow, formData } = useContext(AppContext);

  const saveToLocal = () => {
    const lastHistory = localStorage.getItem(`searchHistory`);
    const _lastHistory = lastHistory ? JSON.parse(lastHistory) : [];

    // Concatenate all cities
    const cities = formData.map(({ cityName }: { cityName: string }) => {
      return cityName;
    });

    // Concatenate all coordinates
    const coords = formData.map(({ coordinates }: any) => {
      return coordinates;
    });

    // Concatenate all dates
    const dates = formData.map(({ dateRange }: any) => {
      return dateRange;
    });

    // Build:
    const submission = {
      id: uuid(),
      cities,
      coords,
      dates,
      settings: searchOptions,
      issuedDate: new Date().toJSON().slice(0, 10),
      dataToFillWith: formData,
    };

    // Get user intention
    const isEdit = searchParams.get('edit');
    const src = searchParams.get('src');

    if (!isEdit) {
      // Save directly no matter what.
      localStorage.setItem(`searchHistory`, JSON.stringify([..._lastHistory, submission]));
      alert(`Form data has been saved to local storage.`);
    } else {
      const processed = _lastHistory?.map((row: any) =>
        row.id === src ? { ...submission, id: row.id } : row,
      );

      // Update first then save.
      localStorage.setItem(`searchHistory`, JSON.stringify(processed));
      alert(`Successfully updated this report.`);
    }
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
            onClick={(e) =>
              setSearchOptions({ ...searchOptions, humidity: e.currentTarget.checked })
            }
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
