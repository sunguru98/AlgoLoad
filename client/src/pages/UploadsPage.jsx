import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { MainContainer } from '../styles/commonStyles'
import {
  DropZoneContainer,
  ThumbnailList,
  ThumbnailListItem,
  CustomButton
} from '../styles/componentStyles'

const UploadsPage = () => {
  const [files, setFiles] = useState([])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file => ({
          ...file,
          preview: URL.createObjectURL(file)
        }))
      )
    }
  })

  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <MainContainer>
      <DropZoneContainer
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em style={{ marginTop: '2rem' }}>
          (Only *.jpeg and *.png images will be accepted)
        </em>
      </DropZoneContainer>
      <ThumbnailList>
        {files.map((file, index) => (
          <ThumbnailListItem key={index}>
            <img alt='Uploaded' src={file.preview} />
          </ThumbnailListItem>
        ))}
      </ThumbnailList>
      {files.length ? <CustomButton>Upload All</CustomButton> : null}
    </MainContainer>
  )
}

export default UploadsPage
