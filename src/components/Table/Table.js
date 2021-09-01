/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-cycle */
import React from 'react';
import staticBuilder from '../../helpers/staticBuilder';

const Table = ({
  scrollable = false,
  fullwidth = true,
  classNames = '',
  title,
  columns = [],
  data = [],
  sortable = false,
  onSort,
  onRenderCell,
}) => {
  const [sortOption, setSortOption] = React.useState();
  const defineSortOption = React.useCallback(
    (key) => () => {
      let newSortOpt;
      if (!sortOption || sortOption.key !== key) {
        newSortOpt = { key, sort: 'ascending' };
      } else if (sortOption.sort === 'ascending')
        newSortOpt = { key, sort: 'descending' };

      setSortOption(newSortOpt);
      if (onSort) onSort(newSortOpt);
    },
    [sortOption]
  );

  const defaultRender = (cell, key) => {
    if (typeof cell === 'string' || typeof cell === 'number') return cell;
    return Array.isArray(cell) ? staticBuilder(cell) : null;
  };
  let TableObject = (
    <table
      className={`table ${sortable ? 'sortable' : ''} ${classNames} ${
        fullwidth ? 'is-fullwidth' : ''
      }`}
    >
      <thead>
        <tr>
          {columns.map((item, key) => {
            if (typeof item === 'object')
              return (
                <th key={item.key} onClick={defineSortOption(item.key)}>
                  {item.abbr && <abbr title={item.abbr} />}
                  {item.text}
                  {sortOption &&
                    sortOption.key === item.key &&
                    sortOption.sort === 'descending' && (
                      <span className="icon is-small">
                        <ion-icon name="caret-down-outline" />
                      </span>
                    )}
                  {sortOption &&
                    sortOption.key === item.key &&
                    sortOption.sort === 'ascending' && (
                      <span className="icon is-small">
                        <ion-icon name="caret-up-outline" />
                      </span>
                    )}
                </th>
              );
            return <th key={key}>{item}</th>;
          })}
        </tr>
      </thead>
      <tfoot>
        <tr>
          {columns.map((item, key) => (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <th key={key}> </th>
          ))}
        </tr>
      </tfoot>
      <tbody>
        {data.map((row, key) => (
          <tr key={key}>
            {row.map((cell, cellKey) => (
              <td key={`${key}-${cellKey}`}>
                {onRenderCell
                  ? onRenderCell({ cell, key: cellKey }, defaultRender)
                  : defaultRender(cell, cellKey)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (scrollable)
    TableObject = <div className="table-container">{TableObject}</div>;

  return (
    <div>
      {title && (
        <p className="has-text-centered has-text-weight-semibold mb-1">
          {title}
        </p>
      )}
      {TableObject}
    </div>
  );
};

export default Table;
