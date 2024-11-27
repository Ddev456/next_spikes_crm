import { useState } from 'react';

export const useClientFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  const handleFile = (newFile: File | null) => {
    setFile(newFile);
    if (newFile) {
      setBlob(new Blob([newFile], { type: newFile.type }));
    } else {
      setBlob(null);
    }
  };

  return {
    file,
    blob,
    handleFile
  };
};