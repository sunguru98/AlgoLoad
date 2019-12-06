import React, { useState } from 'react'
import algoliasearch from 'algoliasearch'

import { InstantSearch, Hits, SearchBox } from 'react-instantsearch-dom'
import Portal from '../components/Portal'

import '../styles/algolia.css'
import { Title } from '../styles/componentStyles'
import placeholderImage from '../placeholder.png'

const ImageSearch = ({ user }) => {
  const searchClient = algoliasearch('HVN8I0GXUS', user.publicSearchKey)

  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isImageClicked, setIsImageClicked] = useState(false)
  const [image, setImage] = useState(null)

  return (
    <InstantSearch searchClient={searchClient} indexName='dev_USERS'>
      <Title inverted style={{ marginBottom: '2rem' }}>
        Dashboard. Text Search
      </Title>
      {!isImageLoaded && (
        <h2 style={{ marginBottom: '1rem', color: 'white' }}>
          Fetching Images ...
        </h2>
      )}
      <SearchBox />
      <Hits
        hitComponent={({ hit }) => (
          <img
            alt='Search Result'
            onLoad={() => setIsImageLoaded(true)}
            onClick={() => {
              setIsImageClicked(true)
              setImage(hit.image)
            }}
            src={isImageLoaded ? hit.image : placeholderImage}
          />
        )}
      />
      {image && isImageClicked ? (
        <Portal
          onClick={() => {
            setIsImageClicked(false)
            setImage(null)
          }}>
          <img
            style={{ maxWidth: '90vw', maxHeight: '80vh' }}
            src={image}
            alt='Search Result'
          />
        </Portal>
      ) : null}
    </InstantSearch>
  )
}

export default ImageSearch
