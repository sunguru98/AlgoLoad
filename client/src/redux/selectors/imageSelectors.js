import { createSelector } from 'reselect'

export const selectImage = state => state.image

export const selectImageDatas = createSelector(
  [selectImage],
  image => image.datas
)

export const selectImageLoading = createSelector(
  [selectImage],
  image => image.loading
)
