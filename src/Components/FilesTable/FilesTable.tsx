import React, { useState } from 'react';
import { FileType } from '../Main/Main';
import FolderSVG from '../../icons/FolderSVG';
import ImageSVG from '../../icons/ImageSVG';
import FileSVG from '../../icons/FileSVG';
import OperateFile from '../OperateFile/OperateFile';

interface Props {
  handleFolderClick: (file: FileType) => void;
  files: FileType[];
  deleteFile: (path: string) => void;
}

export const FilesTable: React.FC<Props> = ({
  handleFolderClick,
  files,
  deleteFile,
}) => {
  const [hoveredRowID, setHoveredRowIndex] = useState<string | null>(null);

  const handleRowMouseEnter = (id: string) => {
    setHoveredRowIndex(id);
  };

  const handleRowMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  return (
    <table className="files-table__table">
      <thead>
        <tr>
          <th className="files-table__cell">Name</th>
          <th className="files-table__cell">Who can access</th>
          <th className="files-table__cell">Modified</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr
            className="files-table__row"
            key={file.id}
            onClick={() => handleFolderClick(file)}
            onMouseEnter={() => handleRowMouseEnter(file.id)}
            onMouseLeave={handleRowMouseLeave}
          >
            <td className="files-table__cell files-table__folder-name">
              <div className="files-table__cell-flex">
                {getIconByFileType(file)}
                <span className="files-table__cell-title">{file.name}</span>
              </div>
            </td>
            <td className="files-table__cell files-table__cell--access">Only you</td>
            <td className="files-table__cell files-table__cell--modified ">
              <OperateFile
                file={file}
                deleteFile={deleteFile}
                isHovered={hoveredRowID === file.id}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export function isFileImage(name: string): boolean {
  const fileType = name.slice(-3).toLowerCase();
  return (
    fileType === 'png' ||
    fileType === 'jpg' ||
    name.slice(-4).toLowerCase() === 'jpeg'
  );
}

export function getIconByFileType(file: FileType): JSX.Element {
  if (file['.tag'] === 'folder') {
    return <FolderSVG />;
  }

  if (isFileImage(file.name)) {
    return <ImageSVG />;
  }

  return <FileSVG />;
}
