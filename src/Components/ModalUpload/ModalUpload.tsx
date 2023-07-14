import React from 'react';
import DownArrowSVG from '../../icons/DownArrowSVG';
import UploadedSVG from '../../icons/UploadedSVG';
import { isFileImage } from '../FilesTable/FilesTable';
import ImageSVG from '../../icons/ImageSVG';
import FileSVG from '../../icons/FileSVG';
import { CopyLinkButton } from '../CopyLinkButton/CopyLinkButton';

interface Props {
  closeModal: () => void;
  uploaded: (string | undefined)[][];
}

export const ModalUpload: React.FC<Props> = ({ closeModal, uploaded }) => {
  return (
    <div className="modal__main is-active" id="modal">
      <div className="modal_wrapper">
        <div className="modal__top">
          <h1 className="modal_title">upload complete</h1>
          <div className="modal__buttons">
            <DownArrowSVG cssClass="modal__down-arrow" />
            <button type="button" className="modal_close" onClick={closeModal}>
              X
            </button>
          </div>
        </div>

        <hr className="is-marginless" />

        <ul>
          {uploaded.map((upload) => (
            <li
              className="modal__uploaded-file"
              key={upload[0] || Math.random().toString()}
            >
              <div className="modal__uploaded-file-left">
                <UploadedSVG cssClass="modal__uploadedSVG" />
                {getIconByFileType(upload[0] || '')}
                <div className="modal__uploaded-to-name">
                  <span>{upload[0]}</span>
                  <span className="modal__uploaded-to">
                    Uploaded to{' '}
                    <span className="modal__uploaded-to-link">
                      {upload[1] || 'Files'}
                    </span>
                  </span>
                </div>
              </div>
              <CopyLinkButton />
            </li>
          ))}
        </ul>

        <hr className="is-marginless" />
      </div>
    </div>
  );
};

export function getIconByFileType(fileName: string): JSX.Element {
  if (isFileImage(fileName)) {
    return <ImageSVG />;
  }

  return <FileSVG />;
}
