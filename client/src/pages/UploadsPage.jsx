import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { MainContainer } from '../styles/commonStyles'
import {
  DropZoneContainer,
  ThumbnailList,
  ThumbnailListItem,
  CustomButton,
  Spinner
} from '../styles/componentStyles'

import { connect } from 'react-redux'
import { uploadImage } from '../redux/actions/imageActions'
import { createStructuredSelector } from 'reselect'
import { selectImageLoading } from '../redux/selectors/imageSelectors'

const UploadsPage = ({ uploadImage, imageLoading }) => {
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    multiple: true,
    accept: 'image/jpeg, image/png',
    maxSize: 1024 * 1024 * 2,
    minSize: 0,
    onDrop: acceptedFiles => {
      setFiles([
        ...acceptedFiles.slice(
          0,
          acceptedFiles.length > 2 ? 2 : acceptedFiles.length
        )
      ])
      setPreviews(
        acceptedFiles
          .map(file => URL.createObjectURL(file))
          .slice(0, acceptedFiles.length > 2 ? 2 : acceptedFiles.length)
      )
    }
  })

  const handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData()
    files.forEach(file => {
      formData.append('images', file)
    })
    uploadImage(formData)
  }

  return (
    <MainContainer>
      <h2 style={{ color: 'white' }}>Upload your images.</h2>
      <small style={{ color: 'white', fontSize: '1.4rem', margin: '1.5rem' }}>
        (Please note that the conversion process might take between 10 - 15
        seconds. Hence do not refresh or go back)
      </small>

      {!imageLoading ? (
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmit}>
          <DropZoneContainer
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
            <em style={{ marginTop: '2rem' }}>
              (Only *.jpeg and *.png images will be accepted)
            </em>

            <em style={{ color: 'red', margin: '1rem 0' }}>
              Maximum 2 files are allowed for shorter waiting times
            </em>
          </DropZoneContainer>

          <ThumbnailList>
            {previews.map((preview, index) => (
              <ThumbnailListItem key={index}>
                <img alt='Uploaded' src={preview} />
              </ThumbnailListItem>
            ))}
          </ThumbnailList>

          {files.length > 0 && files.length <= 2 ? (
            <CustomButton type='submit'>Upload All</CustomButton>
          ) : null}
        </form>
      ) : (
        <Spinner thickness={10} size={50} />
      )}
    </MainContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  imageLoading: selectImageLoading
})

const mapDispatchToProps = dispatch => ({
  uploadImage: formData => dispatch(uploadImage(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadsPage)
