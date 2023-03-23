import { RowChartTypes } from './row-chart.type';

export type InitialFormRowType = {
  id: string;
  checked: boolean;
  coordinates: { latitude: number | null; longitude: number | null };
  cityName: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  data: RowChartTypes[] | null;
  hourly_units: null | string;
};
