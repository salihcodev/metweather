import { InitialFormRowType } from '../@types/initial-form-row.type';
import { CitiesSearchListItemType } from './../@types/cities-search-list-item.type';

export default interface IFormSearchDropdown {
  citiesMatchesSearch: CitiesSearchListItemType[];
  setFormRow: (formRow: InitialFormRowType) => void;
  formRow: InitialFormRowType;
  pickCity: (city: CitiesSearchListItemType) => Promise<void>;
}
