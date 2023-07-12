import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropbox } from 'dropbox';
import FolderSVG from '../../icons/FolderSVG';
import ImageSVG from '../../icons/ImageSVG';
import FileSVG from '../../icons/FileSVG';

interface File {
  '.tag': string;
  id: string;
  name: string;
  path_display: string;
  path_lower: string;
  server_modified?: string;
}
export const Main = (): JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);
  const [folderLinks, setFolderLinks] = useState<string[]>([]);

  const fetchAndSEtFiles = async (path = '') => {
    const fetchedFiles = await getFiles(path);
    setFiles(fetchedFiles || []);
  };

  useEffect(() => {
    fetchAndSEtFiles();
  }, []);

  const handleFolderClick = (file: File) => {
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

  console.log(this);

  return (
    <div className="main">
      <h1>FileFolderTable</h1>
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

      <table className="main__table">
        <thead>
          <tr>
            <th className="main__cell">Name</th>
            <th className="main__cell">Who can access</th>
            <th className="main__cell">Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              className="main__row"
              key={file.id}
              onClick={() => handleFolderClick(file)}
            >
              <td className="main__cell">
                <div className="main__cell-flex">
                  {getIconByFileType(file)}
                  <span className="main__cell-title">{file.name}</span>
                </div>
              </td>
              <td className="main__cell">Only you</td>
              <td className="main__cell">
                {file.server_modified
                  ? transformDateTime(file.server_modified)
                  : '--'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

async function getFiles(path = ''): Promise<File[]> {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN_DROPBOX;
  const dbx = new Dropbox({ accessToken });

  try {
    const response = await dbx.filesListFolder({
      path,
      include_media_info: true,
    });
    return response.result.entries as File[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return [];
  }
}

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

function isFileImage(name: string) {
  const fileType = name.slice(-3).toLowerCase();
  return (
    fileType === 'png' ||
    fileType === 'jpg' ||
    name.slice(-4).toLowerCase() === 'jpeg'
  );
}

function getIconByFileType(file: File) {
  if (file['.tag'] === 'folder') {
    return <FolderSVG />;
  }

  if (isFileImage(file.name)) {
    return <ImageSVG />;
  }

  return <FileSVG />;
}
