import React, { Fragment } from 'react'

import { MainContainer } from '../styles/commonStyles'
import { CustomButton } from '../styles/componentStyles'

import { connect } from 'react-redux'
import { selectAuthUser } from '../redux/selectors/authSelectors'
import { createStructuredSelector } from 'reselect'

import ImageSearch from '../components/ImageSearch'
import { selectImageDatas } from '../redux/selectors/imageSelectors'

const DashboardPage = ({ user, history, datas }) => {
  return (
    <MainContainer>
      {user.datas.length || datas.length ? (
        <ImageSearch
          datas={user.datas || datas}
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
  user: selectAuthUser,
  datas: selectImageDatas
})

export default connect(mapStateToProps)(DashboardPage)
