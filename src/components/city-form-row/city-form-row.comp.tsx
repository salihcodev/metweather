// pkgs:
import { FC, useContext, useEffect, useState } from 'react';

// utils:
import './style.sass';
import { AppContext } from '../../common/context/app-context';
import ICityFormRow from '../../common/interfaces/city-form-row.interface';
import { InitialFormRowType } from '../../common/@types/initial-form-row.type';
import { CitiesSearchListItemType } from '../../common/@types/cities-search-list-item.type';

// comps:
import { FormSearchDropdown } from '../form-search-dropdown/form-search-dropdown.comp';

// component>>>
export const CityFormRow: FC<ICityFormRow> = ({ row }) => {
  const [formRow, setFormRow] = useState<InitialFormRowType>(row);
  const [citiesMatchesSearch, setCitiesMatchesSearch] = useState<CitiesSearchListItemType[]>([]);

  const { formData, setFormData, handleSearchInCities, getCityInfoOnPick, searchOptions } = useContext(AppContext);

  // Update the form content:
  useEffect(() => {
    const updatedVersionFromRow = formData.map((row: InitialFormRowType) =>
      row.id === formRow.id ? (row = formRow) : row,
    );

    setFormData(updatedVersionFromRow);
  }, [formRow]);

  // Search within criteria:
  useEffect(() => {
    formRow.cityName && handleSearchInCities(formRow.cityName, setCitiesMatchesSearch);
  }, [formRow.cityName]);

  // Pick an item ^^
  const pickCity = async (city: CitiesSearchListItemType) => {
    setFormRow({
      ...formRow,
      cityName: city?.name,
      coordinates: { latitude: city?.latitude, longitude: city?.longitude },
    });

    await getCityInfoOnPick(formRow);
  };

  // Sync within user settings
  useEffect(() => {
    if (formRow.coordinates.longitude && formRow.coordinates.latitude && formRow.cityName) {
      if (searchOptions.humidity || searchOptions.temperature) getCityInfoOnPick(formRow);
    }
  }, [searchOptions]);

  useEffect(() => {
    if (formRow.coordinates.longitude && formRow.coordinates.latitude && formRow.cityName) {
      getCityInfoOnPick(formRow);
    }
  }, [formRow.dateRange]);

  useEffect(() => {
    if (formRow.coordinates.longitude && formRow.coordinates.latitude) getCityInfoOnPick(formRow);
  }, [formRow.coordinates]);

  return (
    <div className="city-form-row">
      <div className="input">
        <label htmlFor="">Latitude</label>
        <input
          type="number"
          step="0.0001"
          min="-90"
          max="90"
          value={formRow?.coordinates.latitude || ``}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setFormRow({
              ...formRow,
              coordinates: {
                ...formRow.coordinates,
                latitude: +e.currentTarget.value,
              },
            })
          }
        />
      </div>
      <div className="input">
        <label htmlFor="">Longitude</label>
        <input
          type="number"
          step="0.0001"
          min="-180"
          max="180"
          value={formRow?.coordinates.longitude || ``}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setFormRow({
              ...formRow,
              coordinates: {
                ...formRow.coordinates,
                longitude: +e.currentTarget.value,
              },
            })
          }
        />
      </div>
      <FormSearchDropdown
        citiesMatchesSearch={citiesMatchesSearch}
        setFormRow={setFormRow}
        formRow={formRow}
        pickCity={pickCity}
      />
      <div className="form-group date-range">
        <div className="input">
          <label htmlFor="">Start Date</label>
          <input
            type="date"
            name="start"
            id="start"
            value={formRow?.dateRange?.startDate}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFormRow({
                ...formRow,
                dateRange: {
                  ...formRow.dateRange,
                  startDate: e.currentTarget.value,
                },
              })
            }
          />
        </div>
        <div className="input">
          <label htmlFor="">End Date</label>
          <input
            type="date"
            name="end"
            id="end"
            value={formRow?.dateRange?.endDate}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFormRow({
                ...formRow,
                dateRange: {
                  ...formRow.dateRange,
                  endDate: e.currentTarget.value,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
