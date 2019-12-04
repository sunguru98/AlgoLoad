import { createSelector } from 'reselect'

export const selectAuth = state => state.auth

export const selectAuthAccessToken = createSelector(
  [selectAuth],
  auth => auth.acessToken
)

export const selectAuthUser = createSelector([selectAuth], auth => auth.user)
