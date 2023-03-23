// pkgs:
import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { RiCheckboxMultipleFill } from 'react-icons/ri';

// utils:
import './style.sass';
import { ReportsRowTypes } from '../../common/@types/reports-row.type';

// comps:

// component>>>
export const ReportsTable: FC<{}> = ({}) => {
  const history = useNavigate();
  const [reports, setReports] = useState<ReportsRowTypes[]>([]);
  const [isMultiple, setIsMultiple] = useState<boolean>(false);

  const masterSelect = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const localReports = localStorage.getItem(`searchHistory`)!;
    const parsed = JSON.parse(localReports);

    const processed = parsed?.map((row: ReportsRowTypes) => {
      return { ...row, checked: false };
    });

    setReports(processed);

    return () => {};
  }, []);

  // Report selection:
  const toggleAllRowsSelection = (checked: boolean) => {
    const processed = reports?.map((row: ReportsRowTypes) => {
      return { ...row, checked: checked };
    });

    setReports(processed);
  };

  // Report invert selection:
  const invertSelection = () => {
    const processed = reports?.map((row: ReportsRowTypes) => {
      return { ...row, checked: !row.checked };
    });

    if (masterSelect.current) masterSelect.current.checked = false;
    setReports(processed);
  };

  // Report toggle selection:
  const toggleReportSelection = (id: string, value: boolean) => {
    const processed = reports?.map((row: ReportsRowTypes) => (row.id === id ? { ...row, checked: value } : row));

    setReports(processed);
  };

  // Control the appear of deleting multiple button:
  useEffect(() => {
    let decision: boolean = false;
    for (let i in reports) {
      if (reports[i][`checked`]) {
        decision = reports[i][`checked`];
      }
    }

    setIsMultiple(decision);
  }, [reports]);

  // Delete selected:
  const handleDeleteSelected = () => {
    const ans = prompt(`You're about to delete all history... Are you sure? If you are type "yes"`);

    if (ans === `yes`) {
      const processed = reports?.filter((row: ReportsRowTypes) => row.checked !== true);
      setReports(processed);

      // Re-Store in the local:
      localStorage.setItem(`searchHistory`, JSON.stringify(processed));

      alert(`DONE`);
    }
  };

  // Delete row:
  const handleDeleteReport = (id: string) => {
    const ans = prompt(`You're about to delete all history... Are you sure? If you are type "yes"`);

    if (ans === `yes`) {
      const processed = reports?.filter((row: ReportsRowTypes) => row.id !== id);
      setReports(processed);

      // Re-Store in the local:
      localStorage.setItem(`searchHistory`, JSON.stringify(processed));

      alert(`DONE`);
    }
  };

  // View report
  const handleViewReport = (id: string) => {
    history(`/?src=${id}`);
  };

  return (
    <section className="reports-table">
      <h2>Saved Reports</h2>
      {reports.length > 0 ? (
        <table>
          <thead>
            <tr className="table-header">
              <th>
                <div className="select">
                  <input
                    ref={masterSelect}
                    type="checkbox"
                    id="temperature"
                    name="temperature"
                    onClick={(e: React.FormEvent<HTMLInputElement>) => toggleAllRowsSelection(e.currentTarget.checked)}
                  />
                  <button className="alt-check">
                    <span></span>
                  </button>
                  <label htmlFor="temperature"></label>
                </div>
              </th>
              <th>Cities</th>
              <th>Latitude&Longitude</th>
              <th>Included Data</th>
              <th>Date Range</th>
              <th>Issued Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {reports?.map(({ id, checked, cities, dates, issuedDate, coords, settings }: ReportsRowTypes) => {
            // check if the element is the last element in the arr to decide whether to add separator or not.
            const processedCoords = coords?.map((_coords: any) => `${Object.values(_coords).join(', ')}`);

            const processedDates = dates?.map((_dates: any) => `${Object.values(_dates).join(', ')}`);

            return (
              <tbody key={id}>
                <tr>
                  <td>
                    <div className="select">
                      <input
                        type="checkbox"
                        id="temperature"
                        name="temperature"
                        checked={checked}
                        onClick={(e: React.FormEvent<HTMLInputElement>) =>
                          toggleReportSelection(id, e.currentTarget.checked)
                        }
                      />
                      <button className="alt-check">
                        <span></span>
                      </button>
                      <label htmlFor="temperature"></label>
                    </div>
                  </td>
                  {/* Cities */}
                  <td>{cities.join(', ')}</td>

                  {/* Coords */}
                  <td title={processedCoords?.toString()}>{processedCoords?.toString().substring(0, 22)}...</td>

                  {/* Settings */}
                  {!settings.humidity ? <td>Temperature Only</td> : <td>Temperature, Humidity </td>}

                  {/* Date range */}
                  <td title={processedDates?.toString()}>{processedDates?.toString().substring(0, 22)}...</td>

                  <td>{issuedDate}</td>
                  <td className="controllers">
                    <button className="view" onClick={() => handleViewReport(id)}>
                      <FiEye />
                    </button>
                    <button className="delete" onClick={() => handleDeleteReport(id)}>
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      ) : (
        <div className="blank">
          <p>There're no previous activities!</p>
        </div>
      )}

      <footer className="selection-controllers">
        {isMultiple ? (
          <button className="delete-multiple" onClick={handleDeleteSelected}>
            <span className="icon">
              <AiOutlineDelete />
            </span>
            <span className="txt">Delete</span>
          </button>
        ) : null}
        {isMultiple ? (
          <button className="invert-selection" onClick={invertSelection}>
            <span className="icon">
              <RiCheckboxMultipleFill />
            </span>
            <span className="txt">Invert selection</span>
          </button>
        ) : null}
      </footer>
    </section>
  );
};
