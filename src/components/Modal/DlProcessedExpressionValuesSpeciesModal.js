import React from 'react';

import { useHistory } from 'react-router-dom';
import Bulma from '../Bulma';
import readableFileSize from '../../helpers/readableFileSize';
import { ModalContext } from '../../contexts/ModalContext';
import PATHS from '../../routes/paths';

const DlProcessedExpressionValuesSpeciesModal = ({ species, files }) => {
  const { hideModal, customOnClose } = React.useContext(ModalContext);
  const history = useHistory();

  return (
    <Bulma.Modal.Content as="div" className="box">
      <Bulma.Media>
        <Bulma.Media.Item className="my-auto">
          <Bulma.Title className="is-size-4">
            {species
              ? `${species.genus} ${species.speciesName} (${species.name})`
              : null}
          </Bulma.Title>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <a
            className="internal-link"
            onClick={() => {
              // hideModal();
              history.push(
                `${PATHS.DOWNLOAD.GENE_EXPRESSION_CALLS}?id=${species.id}`
              );
            }}
          >
            See gene expression calls <ion-icon name="arrow-redo-outline" />
          </a>
        </Bulma.Media.Item>
        <Bulma.Media.Item align="right">
          <div>
            <figure className="image is-128x128 rounded-border">
              {species && (
                <Bulma.Image
                  src={`https://bgee.org/img/species/${species.id}_light.jpg`}
                  alt={`${species.genus} ${species.speciesName} (${species.name})`}
                  fallback="https://via.placeholder.com/128"
                />
              )}
            </figure>
          </div>
        </Bulma.Media.Item>
      </Bulma.Media>
      <div className="mt-2">
        <div>
          <p className="mb-2">
            <b>RNA-Seq data</b>
          </p>
          <div className="field has-addons">
            <p className="control">
              <a className="button" href={files.rnaSeqAnnot.path}>
                <span className="is-size-7">
                  Download experiments/libraries info
                  {` (${readableFileSize(files.rnaSeqAnnot.size)})`}
                </span>
              </a>
            </p>
            <p className="control">
              <a className="button" href={files.rnaSeqData.path}>
                <span className="is-size-7">
                  Download read count, TPMs and FPKMs
                  {` (${readableFileSize(files.rnaSeqData.size)})`}
                </span>
              </a>
            </p>
          </div>
          <p className="is-size-7 has-text-grey">
            Files can also be retrieved per experiment, see{' '}
            <a
              className="internal-link"
              href={`https://bgee.org/ftp/bgee_v15_0/download/processed_expr_values/rna_seq/${species.genus}_${species.speciesName}/`}
            >
              RNA-Seq data directory
            </a>
          </p>
        </div>
        <div className="mt-4">
          <p className="mb-2">
            <b>Affymetrix data</b>
          </p>
          <div className="field has-addons">
            <p className="control">
              <a className="button " href={files.affymetrixAnnot.path}>
                <span className="is-size-7">
                  Download experiments/chips info
                  {` (${readableFileSize(files.rnaSeqData.size)})`}
                </span>
              </a>
            </p>
            <p className="control">
              <a className="button t" href={files.affymetrixData.path}>
                <span className="is-size-7">
                  Download signal intensities
                  {` (${readableFileSize(files.affymetrixData.size)})`}
                </span>
              </a>
            </p>
          </div>
          <p className="is-size-7 has-text-grey">
            Files can also be retrieved per experiment, see{' '}
            <a
              className="internal-link"
              href={`https://bgee.org/ftp/current/download/processed_expr_values/affymetrix/${species.genus}_${species.speciesName}/`}
            >
              Affymetrix data directory
            </a>
          </p>
        </div>
        <div className="mt-4">
          <p className="mb-2">
            <b>Single cell full length RNA-Seq data</b>
          </p>
          <p className="is-size-7 has-text-grey">No data</p>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        type="button"
        onClick={() => {
          if (customOnClose) {
            customOnClose();
          }
          hideModal();
        }}
      />
    </Bulma.Modal.Content>
  );
};

export default DlProcessedExpressionValuesSpeciesModal;
