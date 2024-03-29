import { useState } from "react";

import { FileItem } from "@/api/dto/files.dto";
import { FileList, FileSelectType } from "@/components/FileList";
import FileActions from "@/components/FileActions";

import * as Api from "@/api";
import { Empty } from "antd";

interface IProps {
  items: FileItem[];
  withAction?: boolean;
}

export const Files: React.FC<IProps> = ({ items, withAction }) => {
  const [files, setFiles] = useState(items || []);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === "select") {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id));
    }
  };
  const onClickRemove = () => {
    setSelectedIds([]);
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
    Api.files.remove(selectedIds);
  };

  const onClickShare = () => {
    alert("share");
  };

  return (
    <>
      {files.length ? (
        <>
          {withAction && (
            <FileActions
            onClickRemove={onClickRemove}
            onClickShare={onClickShare}
            isActive={selectedIds.length > 0}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />;
        </>
      ) : (
        <Empty className="empty-block" description="Список файлов пуст" />
      )}
    </>
  );
};

export default Files;
