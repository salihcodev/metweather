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
  const [citiesSearchLoading, setCitiesSearchLoading] = useState<`idle` | `busy`>(`idle`);
  const [getCitiesInfoLoading, setGetCitiesInfoLoading] = useState<`idle` | `busy`>(`idle`);
  const [searchOptions, setSearchOptions] = useState<any>({
    temperature: true,
    humidity: true,
  });

  const addNewRow = () => {
    if (formData?.length === 0) {
      setFormData([initialFormRow]);
    } else {
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
    }
  };

  // SEARCH IN CITIES VIA SEARCH_CRITERIA:
  const handleSearchInCities = async (value: any, setCitiesMatchesSearch: any) => {
    setCitiesSearchLoading(`busy`);

    const {
      status,
      data: { results },
    } = await axios.get(`${SEARCH_ENDPOINT}?name=${value}`);

    setCitiesMatchesSearch(results);
    setCitiesSearchLoading(`idle`);
  };

  // GET CITY INFO:
  const getCityInfoOnPick = async (formRow: any) => {
    setGetCitiesInfoLoading(`busy`);
    const humidity = searchOptions.humidity ? `relativehumidity_2m` : ``;
    const lati = formRow.coordinates.latitude;
    const long = formRow.coordinates.longitude;
    try {
      const URI = `${RETRIEVE_INFO_ENDPOINT}?latitude=${lati}&longitude=${long}&hourly=temperature_2m,${humidity}&start_date=${formRow.dateRange.startDate}&end_date=${formRow.dateRange.endDate}`;

      let data;
      if (lati && long) {
        const { status, data: _data } = await axios.get(URI);
        data = _data;
      }

      let store: any = [];
      for (let i in data?.hourly.time) {
        const time = data?.hourly.time[i];

        let temperature;
        if (data?.hourly.temperature_2m !== undefined) temperature = data?.hourly.temperature_2m[i];

        let humidity;
        if (data?.hourly.relativehumidity_2m !== undefined)
          humidity = data?.hourly.relativehumidity_2m[i];

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
      const updatedVersionFromRow = formData.map((row: any) =>
        row.id === formRow.id ? (row = currentRowInfo) : row,
      );

      setFormData(updatedVersionFromRow);
      setGetCitiesInfoLoading(`idle`);
    } catch ({
      message,
      response: {
        data: { reason },
      },
    }) {
      alert(`${message} ${reason}`);
    }
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
        citiesSearchLoading,
        getCitiesInfoLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
