import { createSelector } from 'reselect'

export const selectImage = state => state.image

export const selectImageLoading = createSelector(
  [selectImage],
  image => image.loading
)
