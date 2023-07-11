import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropbox } from 'dropbox';

interface File {
  '.tag': string;
  id: string;
  name: string;
  path_display: string;
  path_lower: string;
  server_modified?: string;
}
export const FilesTable = (): JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const fetchedFiles = await getFiles('');
      setFiles(fetchedFiles || []);
    };

    fetchFiles();
  }, []);

  const handleFolder = (tag: string) => {
    console.log('aass', tag);
  };

  return (
    <div className="file-table">
      <h1>FileFolderTable</h1>
      {console.log(files)};
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

