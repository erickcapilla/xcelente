import {ChangeEvent, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import '@css/dropzone.css'

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FilesUpload = (props: Props) => {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
      'video/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    },
    maxFiles: 3,
    multiple: true,
  });
  
  const thumbs = files.map(file => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps({ onChange: props.onChange })} />
        <p>Arrastra archivos aquí o click para abrir el explorador (Max. 3 archivos)</p>
      </div>
      <aside className="thumbsContainer">
        {thumbs}
      </aside>
    </section>
  );
}