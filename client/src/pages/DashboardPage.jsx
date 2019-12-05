import React, { Fragment } from 'react'

import { MainContainer } from '../styles/commonStyles'
import { CustomButton } from '../styles/componentStyles'

import { connect } from 'react-redux'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import { createStructuredSelector } from 'reselect'

import ImageSearch from '../components/ImageSearch'

const DashboardPage = ({ user, history }) => {
  return (
    <MainContainer>
      {!user.photos.length ? (
        <ImageSearch
          photos={user.photos}
          options={[
            { title: 'Title1' },
            { title: 'Title2' },
            { title: 'Title3' }
          ]}
        />
      ) : (
        <Fragment>
          <h2 style={{ color: 'white' }}>Welcome to AlgoLoad.</h2>
          <h2 style={{ margin: '3rem', color: 'white' }}>
            Click below to get started
          </h2>
          <CustomButton onClick={() => history.push('/upload')}>
            Get Started
          </CustomButton>
        </Fragment>
      )}
    </MainContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser
})

export default connect(mapStateToProps)(DashboardPage)
