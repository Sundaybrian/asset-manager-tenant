import { useState, useEffect } from 'react';
import { fbStorage } from '../utils/fb.config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  console.log(file, 'useStorage');

  useEffect(() => {
    // references
    const storageRef = fbStorage.ref(file.name);
    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      },
    );
  }, [file]);

  return {
    progress,
    setProgress,
    url,
    error,
  };
};

export default useStorage;
