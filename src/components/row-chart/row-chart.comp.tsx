// pkgs:
import { FC, useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// utils:
import './style.sass';
import { AppContext } from '../../common/context/app-context';
import ICityFormRow from '../../common/interfaces/city-form-row.interface';

// comps:

// component>>>

export const RowChart: FC<ICityFormRow> = ({ row }) => {
  console.log(row);

  const { searchOptions } = useContext(AppContext);

  return (
    <div className="row-chart">
      {row?.data !== null ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={row.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip cursor={{ strokeWidth: 2 }} />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" strokeWidth={1} />
            {searchOptions?.humidity ? (
              <Line type="monotone" dataKey="humidity" stroke="#82ca9d" strokeWidth={1} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="blank">No data, Try to give it a name or coordinates ^^</div>
      )}
    </div>
  );
};
