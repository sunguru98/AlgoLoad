import React, { Fragment, useState } from 'react'
import {
  CustomTextField,
  CustomAutoComplete,
  CustomButton
} from '../styles/componentStyles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Portal from '../components/Portal'
import tileData from '../tileData'

const ImageSearch = ({ photos, options }) => {
  const [isImageClicked, setIsImageClicked] = useState(false)
  const [image, setImage] = useState(null)
  const defaultProps = {
    options,
    getOptionLabel: option => option.title
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log('Submitting')
  }

  return (
    <Fragment>
      <form
        style={{ display: 'flex', alignItems: 'center' }}
        onSubmit={handleSubmit}>
        <CustomAutoComplete
          onSubmit={() => console.log('a')}
          {...defaultProps}
          id='auto-complete'
          autoComplete
          renderInput={params => (
            <CustomTextField
              {...params}
              label='Search for text'
              margin='normal'
              variant='outlined'
            />
          )}
        />
        <CustomButton type='submit' primary='true'>
          Search
        </CustomButton>
      </form>
      <GridList
        cellHeight={200}
        cols={5}
        style={{ width: '80vw', minHeight: '60vh', margin: '2rem 0' }}>
        {tileData.map((tile, index) => (
          <GridListTile
            onClick={() => {
              setIsImageClicked(true)
              setImage(tileData[index].img)
            }}
            style={{ cursor: 'pointer' }}
            key={tile.img}
            cols={index > 0 && tileData[index - 1].cols === 2 ? 1 : 2}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
      {image && isImageClicked ? (
        <Portal
          onClick={() => {
            setIsImageClicked(false)
            setImage(null)
          }}>
          <img src={image} alt='Search Result' />
        </Portal>
      ) : null}
    </Fragment>
  )
}

export default ImageSearch
