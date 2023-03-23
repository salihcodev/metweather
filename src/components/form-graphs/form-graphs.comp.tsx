// pkgs:
import { FC } from 'react';

// utils:
import './style.sass';
import ICitiesForm from '../../common/interfaces/cities-form.interface';
import { InitialFormRowType } from '../../common/@types/initial-form-row.type';

// comps:
import { RowChart } from '../row-chart/row-chart.comp';

// component>>>
export const FormGraphs: FC<ICitiesForm> = ({ formData }) => {
  return (
    <section className="form-graphs">
      {formData?.length > 0 ? (
        <section className="graphs-wrapper">
          {formData?.map((row: InitialFormRowType) => (
            <RowChart key={row.id} row={row} />
          ))}
        </section>
      ) : (
        <div className="blank">
          <p>
            No data to view <em>graphs</em>
          </p>
        </div>
      )}
    </section>
  );
};
