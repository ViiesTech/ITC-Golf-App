import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../components/Container'
import SecondaryHeader from '../../components/SecondaryHeader'
import Header from '../../components/Header'

const ManageCards = () => {
  return (
        <Container>
            <Header />
            <SecondaryHeader text={'Manage Cards'} />
        </Container>
  )
}

export default ManageCards

const styles = StyleSheet.create({})