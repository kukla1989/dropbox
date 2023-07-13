/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Dropbox } from 'dropbox';
import { FileType } from '../Main/Main';
import { CopyLinkButton } from '../CopyLinkButton/CopyLinkButton';
import ShareSVG from '../../icons/ShareSVG';
import ThreeDodsSVG from '../../icons/ThreeDodsSVG';
import DeleteSVG from '../../icons/DeleteSVG';
import DownloadSVG from '../../icons/DownloadSVG';

interface Props {
  file: FileType;
  deleteFile: (path: string) => void;
  isHovered: boolean;
}

const OperateFile: React.FC<Props> = ({ file, deleteFile, isHovered }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <div>
      {isHovered ? (
        <div className="operate-file" onMouseLeave={closeModal}>
          <CopyLinkButton />
          <ShareSVG cssClass="operate-file__share operate-file__svg" />
          <ThreeDodsSVG
            cssClass="operate-file__three-dots operate-file__svg"
            openModal={openModal}
          />
          {isModalOpen && (
            <div className="operate-file__modal">
              <button
                className="operate-file__modal-btn"
                type="button"
                onClick={() => deleteFile(file.path_lower)}
              >
                <DeleteSVG cssClass="operate-file__delete-svg" />
                delete
              </button>
              <button
                className="operate-file__modal-btn"
                type="button"
                onClick={() => download(file.path_lower)}
              >
                <DownloadSVG cssClass="operate-file__download-svg" />
                download
              </button>
            </div>
          )}
        </div>
      ) : file.server_modified ? (
        transformDateTime(file.server_modified || '')
      ) : (
        '--'
      )}
    </div>
  );
};

function transformDateTime(dateString: string) {
  const dateObj = new Date(dateString);

  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${formattedDate} ${formattedTime}`.toLowerCase();
}

const download = async (path: string) => {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN_DROPBOX;
  const dbx = new Dropbox({ accessToken });

  // filesDownloadZip
  try {
    const respons = await dbx.filesDownload({
      path,
    });
    // eslint-disable-next-line no-console
    console.log(respons, 'respons');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export default OperateFile;
