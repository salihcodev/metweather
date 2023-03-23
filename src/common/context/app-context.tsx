// pkgs:
import { createContext, FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const AppContext = createContext<any>({});

// utils:
import { RETRIEVE_INFO_ENDPOINT, SEARCH_ENDPOINT } from '../constants/weather-api.const';
import { InitialFormRowType } from '../@types/initial-form-row.type';

// component>>>

const AppProvider: FC<any> = ({ children }) => {
  const initialFormRow: InitialFormRowType = {
    checked: false,
    id: uuidv4(),
    coordinates: { latitude: null, longitude: null },
    cityName: ``,
    dateRange: {
      startDate: new Date().toJSON().slice(0, 10),
      endDate: new Date().toJSON().slice(0, 10),
    },
    data: null,
    hourly_units: null,
  };

  const [formData, setFormData] = useState<any>([]);
  const [searchOptions, setSearchOptions] = useState<any>({
    temperature: true,
    humidity: true,
  });

  // TODO: There's a problem with this logic
  const addNewRow = () => {
    let okToAdd: boolean = false;
    for (let i in formData) {
      if (formData[i].cityName === ``) {
        okToAdd = false;
      } else {
        okToAdd = true;
      }
    }
    !okToAdd && alert(`Please, Fill the current row first`);
    okToAdd && setFormData([...formData, initialFormRow]);
  };

  // SEARCH IN CITIES VIA SEARCH_CRITERIA:
  const handleSearchInCities = async (value: any, setCitiesMatchesSearch: any) => {
    const {
      status,
      data: { results },
    } = await axios.get(`${SEARCH_ENDPOINT}?name=${value}`);

    setCitiesMatchesSearch(results);
  };

  // GET CITY INFO:
  const getCityInfoOnPick = async (formRow: any) => {
    const h = searchOptions.humidity ? `relativehumidity_2m` : ``;

    const URI = `${RETRIEVE_INFO_ENDPOINT}?latitude=${formRow?.coordinates.latitude}&longitude=${formRow?.coordinates.longitude}&hourly=temperature_2m,${h}&start_date=${formRow.dateRange.startDate}&end_date=${formRow.dateRange.endDate}`;

    const { status, data } = await axios.get(URI);

    let store: any = [];
    for (let i in data?.hourly.time) {
      const time = data?.hourly.time[i];

      let temperature;
      if (data?.hourly.temperature_2m !== undefined) temperature = data?.hourly.temperature_2m[i];

      let humidity;
      if (data?.hourly.relativehumidity_2m !== undefined) humidity = data?.hourly.relativehumidity_2m[i];

      const toInject: any = {
        time: new Date(time).toDateString(),
        temperature: temperature || null,
        humidity: humidity || null,
      };
      store.push(toInject);
    }

    // Build final row
    const currentRowInfo = {
      ...formRow,
      cityName: formRow?.cityName,
      coordinates: {
        latitude: data?.latitude,
        longitude: data?.longitude,
      },
      hourly_units: data?.hourly_units || null,
      data: store,
    };

    // Update that row even if it's not the current row, No matter where is it
    const updatedVersionFromRow = formData.map((row: any) => (row.id === formRow.id ? (row = currentRowInfo) : row));

    setFormData(updatedVersionFromRow);
  };

  return (
    <AppContext.Provider
      value={{
        formData,
        setFormData,
        addNewRow,
        handleSearchInCities,
        setSearchOptions,
        searchOptions,
        getCityInfoOnPick,
        initialFormRow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
