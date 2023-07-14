import React, { useEffect, useState } from 'react';
import { Dropbox } from 'dropbox';
import { FilesTable } from '../FilesTable/FilesTable';
import { ModalUpload } from '../ModalUpload/ModalUpload';
import DownArrowSVG from '../../icons/DownArrowSVG';
import UploadSvg from '../../icons/UploadSvg';

export interface FileType {
  '.tag': string;
  id: string;
  name: string;
  path_display: string;
  path_lower: string;
  server_modified?: string;
}

export const Main = (): JSX.Element => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [folderLinks, setFolderLinks] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [uploaded, setUploaded] = useState<(string | undefined)[][]>([]);
  const [sortByName, setSortByName] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchAndSEtFiles = async (path = '') => {
    const fetchedFiles = await getFiles(path);
    setFiles(fetchedFiles || []);
  };

  useEffect(() => {
    fetchAndSEtFiles();
  }, []);

  const handleFolderClick = (file: FileType) => {
    if (file['.tag'] === 'folder') {
      fetchAndSEtFiles(file.path_lower);
      const newNameLink = file.path_lower.split('/').slice(-1)[0];
      setFolderLinks((curLinks) => [...curLinks, newNameLink]);
    }
  };

  const handleTableLink = (ind: number) => {
    const currentPathArr = folderLinks.slice(0, ind + 1);
    setFolderLinks(currentPathArr);
    fetchAndSEtFiles(`/${currentPathArr.join('/')}`);
  };

  const handleDropboxLink = () => {
    fetchAndSEtFiles('');
    setFolderLinks([]);
  };

  const reloadFiles = () => {
    const currentPath = folderLinks.length ? `/${folderLinks.join('/')}` : '';
    fetchAndSEtFiles(currentPath);
  };

  const deleteFile = async (path: string) => {
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN_DROPBOX;
    const dbx = new Dropbox({ accessToken });

    try {
      await dbx.filesDeleteV2({
        path,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    reloadFiles();
  };

  const handleMainInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN_DROPBOX;
    const dbx = new Dropbox({ accessToken });
    const file = event.target.files?.[0];
    const pathNewFile = folderLinks.length
      ? `/${folderLinks.join('/')}/${file?.name}`
      : `/${file?.name}`;
    dbx
      .filesUpload({ path: pathNewFile, contents: file })
      .then(() => {
        setShowModal(true);
        setUploaded((currentUploaded) => [
          ...currentUploaded,
          [file?.name, folderLinks.slice(-1)[0]],
        ]);
        reloadFiles();
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.error(error));
  };

  const handleSortByName = () => {
    setSortByName((currentSort) => !currentSort);
  };

  files.sort((fileA, fileB) => {
    if (sortByName) {
      return fileB.name.localeCompare(fileA.name);
    }

    return fileA.name.localeCompare(fileB.name);
  });

  return (
    <div className="main">
      <input
        type="file"
        className="visually-hidden"
        id="main__input-hidden"
        onChange={handleMainInput}
      />
      <button
        onClick={handleFileButtonClick}
        type="button"
        className="main__input"
      >
        <UploadSvg cssClass="main__upload-arrow" />
        Upload
        <DownArrowSVG cssClass="main__upload-arrow" />
      </button>

      <div className="main__links">
        <button
          className="main__link"
          type="button"
          onClick={() => handleDropboxLink()}
          key={Math.random()}
        >
          dropbox
        </button>
        {folderLinks.map((linkName, ind) => (
          <button
            className="main__link"
            type="button"
            onClick={() => handleTableLink(ind)}
            key={Math.random()}
          >
            {` / ${linkName}`}
          </button>
        ))}
      </div>
      <FilesTable
        files={files}
        handleFolderClick={handleFolderClick}
        deleteFile={deleteFile}
        handleSortByName={handleSortByName}
        sortByName={sortByName}
      />
      {showModal && <ModalUpload closeModal={closeModal} uploaded={uploaded} />}
    </div>
  );
};

async function getFiles(path = ''): Promise<FileType[]> {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN_DROPBOX;
  const dbx = new Dropbox({ accessToken });

  try {
    const response = await dbx.filesListFolder({
      path,
      include_media_info: true,
    });
    return response.result.entries as FileType[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return [];
  }
}

function handleFileButtonClick() {
  const fileInput = document.getElementById('main__input-hidden');
  if (fileInput) {
    fileInput.click();
  }
}
