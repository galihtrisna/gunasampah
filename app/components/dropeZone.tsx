

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneUploaderProps {
  setImage: React.Dispatch<React.SetStateAction<any | null>>;
}

const DropzoneUploader: React.FC<DropzoneUploaderProps> = ({ setImage }) => {
  const [files, setFiles] = useState<any[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Set the state with the accepted files
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      // You can also update your image state here if needed
      setImage(acceptedFiles[0]);
    },
    [setImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'text/html': ['.html', '.htm'],
    },
    maxFiles: 1,
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          alt={file.name}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""} cursor-pointer`}
    >
      <input {...getInputProps()} />
      {files.length > 0 && <div>{thumbs}</div>}
    </div>
  );
};

export default DropzoneUploader;

// // components/DropzoneUploader.tsx

// import React, { useCallback, useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import Image from 'next/image';

// interface DropzoneUploaderProps {
//   setImage: React.Dispatch<React.SetStateAction<any | null>>;
// }

// const DropzoneUploader: React.FC<DropzoneUploaderProps> = ({ setImage }) => {
//   const [files, setFiles] = useState<any[]>([]);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     // Set the state with the accepted files
//     setFiles(acceptedFiles);
//     // You can also update your image state here if needed
//     setImage(acceptedFiles[0]);
//   }, [setImage]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: acceptedFiles => {
//         setFiles(acceptedFiles.map(file => Object.assign(file, {
//           preview: URL.createObjectURL(file)
//         })));

//       },
//     accept: {
//         "image/*": [".png", ".gif", ".jpeg", ".jpg"],
//       }, // Set the accepted file types to images
//     maxFiles: 1,

//   });

//   const thumbs = files.map(file => (
//     <div  key={file.name} >
//       <div >
//         <img
//           src={file.preview}
//           // Revoke data uri after image is loaded
//           onLoad={() => { URL.revokeObjectURL(file.preview) }}
//         />
//       </div>
//     </div>
//   ));

//   useEffect(() => {
//     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
//     return () => files.forEach(file => URL.revokeObjectURL(file.preview));
//   }, []);
//   return (
//     <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} cursor-pointer`}>
//       <input {...getInputProps()} />

//       {files.length > 0 && (
//         <div>
//             {/* <p className=' z-20'>{isDragActive ? 'Drop the image here ...' : 'Drag & drop an image here, or click to select one'}</p> */}
//           {thumbs}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropzoneUploader;

// components/DropzoneUploader.tsx