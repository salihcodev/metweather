// pkgs:
import { FC, useContext, useState } from 'react';
import Flag from 'react-world-flags';
import { CitiesSearchListItemType } from '../../common/@types/cities-search-list-item.type';
import IFormSearchDropdown from '../../common/interfaces/form-search-dropdown.interface';

// utils:
import './style.sass';

// comps:

// component>>>
export const FormSearchDropdown: FC<IFormSearchDropdown> = ({ citiesMatchesSearch, setFormRow, formRow, pickCity }) => {
  const [showResList, setShowResList] = useState<boolean>(true);

  return (
    <div className="searching-in-cities">
      <div className="input">
        <label htmlFor="">City</label>
        <input
          type="text"
          name="city"
          id="city"
          autoComplete="off"
          value={formRow?.cityName}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setFormRow({
              ...formRow,
              cityName: e.currentTarget.value,
            })
          }
        />
      </div>
      {citiesMatchesSearch?.length > 0 && showResList ? (
        <div className="list-wrapper">
          <ul className="results-list">
            {citiesMatchesSearch?.map((city: CitiesSearchListItemType) => {
              return (
                <li key={city?.id} onClick={() => pickCity(city)}>
                  <div className="icon">
                    <Flag code={city?.country_code} />
                  </div>
                  <div className="info">
                    <p>{city?.name}</p>
                    <small>
                      {city?.timezone} — {city?.latitude} : {city?.longitude}
                    </small>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
