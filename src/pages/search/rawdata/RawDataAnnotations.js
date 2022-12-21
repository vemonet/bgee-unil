/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import Button from '../../../components/Bulma/Button/Button';
import './rawDataAnnotations.scss';
import RawDataAnnotationResults from './RawDataAnnotationResults';
import DevelopmentalAndLifeStages from './components/filters/DevelopmentalAndLifeStages/DevelopmentalAndLifeStages';
import Species from './components/filters/Species/Species';
import useLogic, { DATA_TYPES, EXPR_CALLS, TAB_PAGE } from './useLogic';
import CellTypes from './components/filters/CellTypes';
import Tissues from './components/filters/Tissues/Tissues';
import Sex from './components/filters/Sex/Sex';
import Strain from './components/filters/Strain/Strain';
import Gene from './components/filters/Gene/Gene';
import ExperimentOrAssay from './components/filters/ExperimentOrAssay/ExperimentOrAssay';
import RawDataAnnotationsFilters from './RawDataAnnotationsFilters';
import DataType from './components/filters/DataType/DataType';
import ConditionParameter from './components/filters/ConditionParameter';
import ResultTabs from './components/ResultTabs';

const RawDataAnnotations = ({ pageType }) => {
  const {
    searchResult,
    allCounts,
    localCount,
    dataType,
    show,
    devStages,
    hasDevStageSubStructure,
    selectedDevStages,
    selectedSpecies,
    selectedCellTypes,
    hasTissueSubStructure,
    hasCellTypeSubStructure,
    selectedStrain,
    selectedGene,
    selectedExpOrAssay,
    selectedTissue,
    speciesSexes,
    selectedSexes,
    isLoading,
    filters,
    limit,
    isCountLoading,
    pageNumber,
    onChangeSpecies,
    getSpeciesLabel,
    setSelectedCellTypes,
    setSelectedTissue,
    toggleSex,
    setSelectedStrain,
    setSelectedGene,
    setSelectedExpOrAssay,
    setHasTissueSubStructure,
    setSelectedDevStages,
    setDevStageSubStructure,
    setHasCellTypeSubStructure,
    setDataType,
    setShow,
    autoCompleteByType,
    onSubmit,
    resetForm,
    setFilters,
    triggerSearch,
    triggerCounts,
  } = useLogic(pageType);

  const results = searchResult?.results?.[dataType] || [];
  const columnsDesc = searchResult?.columnDescriptions?.[dataType] || [];
  const detailedDataType = DATA_TYPES.find((d) => d.id === dataType) || {};
  const detailedData = TAB_PAGE.find((d) => d.id === pageType);

  return (
    <>
      <div className="rawDataAnnotation">
        <div className="columns is-8 ongletPageWrapper">
          {TAB_PAGE.map((type) => {
            const isActive = type.id === pageType;
            return (
              <a
                href={type.href}
                key={type.id}
                className={`ongletPages is-centered py-2 px-5 ${
                  isActive ? 'pageActive' : ''
                }`}
              >
                {type.label}
              </a>
            );
          })}
        </div>
        {pageType && (
          <div>
            {show && (
              <>
                <h2 className="gradient-underline title is-size-5 has-text-primary">
                  {detailedData.searchLabel}
                </h2>
                <div className="columns is-8">
                  <div className="column mr-6">
                    <div className="mb-2">
                      <Species
                        selectedSpecies={selectedSpecies}
                        onChangeSpecies={onChangeSpecies}
                        getSpeciesLabel={getSpeciesLabel}
                      />
                    </div>
                    {selectedSpecies.value && (
                      <div>
                        <div className="my-2">
                          <Tissues
                            selectedTissue={selectedTissue}
                            setSelectedTissue={setSelectedTissue}
                            autoCompleteByType={autoCompleteByType}
                            hasTissueSubStructure={hasTissueSubStructure}
                            setHasTissueSubStructure={setHasTissueSubStructure}
                          />
                        </div>
                        <div className="my-2">
                          <CellTypes
                            selectedCellTypes={selectedCellTypes}
                            setSelectedCellTypes={setSelectedCellTypes}
                            autoCompleteByType={autoCompleteByType}
                            hasCellTypeSubStructure={hasCellTypeSubStructure}
                            setHasCellTypeSubStructure={
                              setHasCellTypeSubStructure
                            }
                          />
                        </div>
                        <div className="my-2">
                          <DevelopmentalAndLifeStages
                            devStages={devStages}
                            hasDevStageSubStructure={hasDevStageSubStructure}
                            setDevStageSubStructure={setDevStageSubStructure}
                            selectedOptions={selectedDevStages}
                            setSelectedOptions={setSelectedDevStages}
                          />
                        </div>
                        <div className="my-2">
                          <Sex
                            speciesSexes={speciesSexes}
                            selectedSexes={selectedSexes}
                            toggleSex={toggleSex}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="column">
                    <div>
                      {selectedSpecies.value && (
                        <>
                          <div className="mb-2">
                            <Strain
                              selectedStrain={selectedStrain}
                              setSelectedStrain={setSelectedStrain}
                              autoCompleteByType={autoCompleteByType}
                            />
                          </div>
                          <div className="mb-2">
                            <Gene
                              selectedGene={selectedGene}
                              setSelectedGene={setSelectedGene}
                              autoCompleteByType={autoCompleteByType}
                            />
                          </div>
                        </>
                      )}
                      <div className="mb-2">
                        <ExperimentOrAssay
                          selectedExpOrAssay={selectedExpOrAssay}
                          setSelectedExpOrAssay={setSelectedExpOrAssay}
                          autoCompleteByType={autoCompleteByType}
                        />
                      </div>
                      {detailedData.id === EXPR_CALLS && (
                        <>
                          <DataType />
                          <ConditionParameter />
                        </>
                      )}
                      <div className="submit-reinit">
                        <Button
                          className="button is-success is-light is-outlined"
                          type="submit"
                          onClick={onSubmit}
                          disabled={isLoading}
                        >
                          Submit
                        </Button>
                        <Button
                          className="reinit is-warning is-light is-outlined"
                          onClick={() => resetForm(false)}
                        >
                          Reinitialize
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="control is-flex is-align-items-center">
              <button
                className="button mr-2 mb-5"
                type="button"
                onClick={() => setShow(!show)}
              >
                {show ? 'Hide Form' : 'Show Form'}
              </button>
            </div>
            <h2 className="gradient-underline title is-size-5 has-text-primary">
              {detailedData.resultLabel}
            </h2>
            {detailedData.id !== 'expr_calls' && (
              <ResultTabs
                dataTypes={DATA_TYPES}
                dataType={dataType}
                setDataType={setDataType}
                allCounts={allCounts}
                pageType={pageType}
                isCountLoading={isCountLoading}
              />
            )}
            <div className="resultPart">
              <div className="resultCounts">
                {detailedDataType.experimentCountLabel &&
                  `${localCount?.experimentCount || 0} ${
                    detailedDataType.experimentCountLabel
                  } / `}
                {detailedDataType.assayCountLabel &&
                  `${localCount?.assayCount || 0} ${
                    detailedDataType.assayCountLabel
                  }`}
                {detailedDataType.libraryCountLabel &&
                  ` / ${localCount?.libraryCount || 0} ${
                    detailedDataType.libraryCountLabel
                  }`}
              </div>
              {!!searchResult && dataType && (
                <RawDataAnnotationsFilters
                  dataFilters={searchResult?.filters?.[dataType]}
                  dataType={dataType}
                  filters={filters}
                  setFilters={setFilters}
                  triggerSearch={triggerSearch}
                  triggerCounts={triggerCounts}
                />
              )}
              {isLoading && (
                <div className="progressWrapper">
                  <progress
                    className="progress is-small is-primary m-5"
                    style={{
                      animationDuration: '2s',
                      width: '80%',
                    }}
                  />
                </div>
              )}
              <RawDataAnnotationResults
                results={results}
                resultCount={allCounts[dataType]}
                dataType={dataType}
                columnDescriptions={columnsDesc}
                limit={limit}
                count={localCount}
                pageType={pageType}
                pageNumber={pageNumber}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RawDataAnnotations;
