/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from '../../helpers/classnames';
import { hasColumnsTableHidden } from '../../helpers/constants/mediaQueries';
import useWindowSize from '../../hooks/useWindowSize';
import TableHead from './TableHead';
import TableTitle from './TableTitle';
import TableBody from './TableBody';
import { TableProvider } from '../../contexts/TableContext';
import TableHeader from './TableHeader';
import Input from '../Form/Input';
import Select from '../Select';
import { monoSort, multiSort } from '../../helpers/sortTable';
import TablePagination from './TablePagination';

const Table = ({
  fullwidth = true,
  classNames = '',
  title,
  columns = [],
  data = [],
  onFilter,
  sortable = false,
  multiSortable = false,
  onSortCustom,
  onRenderCell,
  onRenderRow, // function that generate custom css classes depending of
  striped = true,
  pagination = false,
  defaultPaginationSize,
  customHeader,
  mappingObj = (obj) => obj,
}) => {
  const mappedData = React.useMemo(
    () => data.map(mappingObj),
    [data, mappingObj()]
  );
  const table = React.useRef();
  const { width } = useWindowSize();
  const usedWidth = React.useMemo(
    () => table?.current?.offsetWidth || width,
    [table, width]
  );

  const [sortOption, setSortOption] = React.useState();
  const defineSortOption = React.useCallback(
    (key) => (event) => {
      if (sortable) {
        if (multiSortable && event.shiftKey) {
          let newSort;
          if (!Array.isArray(sortOption))
            newSort = [{ key, sort: 'ascending' }];
          else {
            newSort = [...sortOption];
            const pos = newSort.findIndex((f) => f.key === key);
            if (pos >= 0) {
              if (newSort[pos].sort === 'ascending')
                newSort[pos].sort = 'descending';
              else newSort.splice(pos, 1);
            } else {
              newSort.push({ key, sort: 'ascending' });
            }
          }
          setSortOption(newSort);
        } else {
          let newSortOpt;
          if (!sortOption || sortOption.key !== key) {
            newSortOpt = { key, sort: 'ascending' };
          } else if (sortOption.sort === 'ascending') {
            newSortOpt = { key, sort: 'descending' };
          }
          setSortOption(newSortOpt);
        }
      }
    },
    [multiSortable, sortOption, sortable]
  );

  const [isExpanded, setIsExpanded] = React.useState({});
  const expandAction = React.useCallback(
    (key) => () =>
      setIsExpanded((prev) => ({
        ...prev,
        [key]: !prev[key],
      })),
    []
  );

  const showTableModalButton = React.useMemo(
    () => hasColumnsTableHidden(usedWidth, columns),
    [usedWidth, columns]
  );

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(
    pagination ? defaultPaginationSize || 10 : mappedData.length
  );

  const [search, setSearch] = React.useState('');
  const searchInput = React.useMemo(
    () => (
      <div className="control table-search is-flex is-flex-direction-row is-align-items-center">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <p className="mr-1">Filter:</p>
        <Input
          value={search}
          onChange={(e) => {
            if (currentPage !== 1) setCurrentPage(1);
            setSearch(e.target.value);
          }}
        />
      </div>
    ),
    [search, currentPage]
  );

  const pageSizeSelector = React.useMemo(
    () =>
      pagination && mappedData?.length > 10 ? (
        <div className="is-flex is-flex-direction-row is-align-items-center is-justify-content-flex-end">
          <p className="mr-2">Show</p>
          <Select
            defaultValue={pageSize}
            options={[10, 20, 50, { value: 100, text: 100 }]}
            onChange={(p) => {
              setCurrentPage(1);
              setPageSize(parseInt(p, 10));
            }}
          />
          <p className="ml-2">entries</p>
        </div>
      ) : null,
    [pageSize, currentPage, mappedData, pagination]
  );
  const processedData = React.useMemo(() => {
    const clone = JSON.parse(JSON.stringify(mappedData));
    const filtered =
      search === '' || !onFilter ? clone : clone.filter(onFilter(search));
    if (sortOption) {
      console.log(
        'SORT',
        Array.isArray(sortOption) ? 'multi' : 'single',
        onSortCustom ? 'custom' : 'default'
      );
      filtered.sort(
        (Array.isArray(sortOption)
          ? onSortCustom || multiSort
          : onSortCustom || monoSort)(sortOption)
      );
    }
    return filtered;
  }, [mappedData, search, sortOption, onSortCustom]);

  return (
    <TableProvider
      data={{
        table,
        title,
        columns,
        data: processedData,
        expandAction,
        isExpanded,
        onRenderRow,
        onRenderCell,
        showTableModalButton,
        usedWidth,
        sortable,
        sortOption,
        defineSortOption,
        pagination,
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        customHeader,
        searchInput,
        pageSizeSelector,
        mappingObj,
      }}
    >
      <TableHeader />
      <TableTitle />
      <div className="table-container">
        <table
          ref={table}
          className={classnames(
            'table',
            { sortable, 'is-fullwidth': fullwidth, 'is-striped': striped },
            classNames
          )}
        >
          <TableHead />
          <TableBody />
        </table>
      </div>
      <TablePagination />
    </TableProvider>
  );
};

export default Table;
