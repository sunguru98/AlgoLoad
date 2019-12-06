import React, { Fragment } from 'react'

import { MainContainer } from '../styles/commonStyles'
import { CustomButton } from '../styles/componentStyles'

import { connect } from 'react-redux'
import {
  selectAuthUser,
  selectAuthPublicKey
} from '../redux/selectors/authSelectors'
import { createStructuredSelector } from 'reselect'

import ImageSearch from '../components/ImageSearch'
import { selectImageDatas } from '../redux/selectors/imageSelectors'

import { Helmet } from 'react-helmet'

const DashboardPage = ({ user, history, datas, publicKey }) => {
  return (
    <MainContainer>
      <Helmet>
        <title>AlgoLoad - Dashboard</title>
      </Helmet>
      {user.datas.length || datas.length ? (
        <ImageSearch user={user} key={publicKey} />
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
  user: selectAuthUser,
  publicKey: selectAuthPublicKey,
  datas: selectImageDatas
})

export default connect(mapStateToProps)(DashboardPage)
