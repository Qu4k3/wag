import React, { useEffect } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loadUser, logout } from '../../redux/actions/userActions'
import loadGroups from '../../redux/actions/groupsActions'
import homeStyles from './HomeStyles'

function Home ({ groups, user, actions, navigation }) {
  useEffect(() => {
    actions.loadGroups()
  }, [])

  if (!user.email) {
    navigation.navigate('Auth')
  }

  return (
        <View style={homeStyles.HomeContainer}>
          <View style={homeStyles.homeTitleContent}>
          <Image
            source={require('../../assets/images/wag-icon.png')}
            style={homeStyles.wagIcon}
          />
            <Text style={homeStyles.title}>My Groups</Text>

            <TouchableOpacity
              onPress={() => actions.logout()}
            >
              <Text>Log out</Text>
            </TouchableOpacity>
          </View>
          <Text>Bienvenido {user.email}</Text>
          <ScrollView key="groupsContainer">
                {groups && groups.map((group) => (
                  <TouchableOpacity key={group.name} style={homeStyles.cardContent}>
                      <Text style={homeStyles.card}>
                          {group.name}
                      </Text>
                      <Text style={homeStyles.cardDate}>
                          {group.date}
                      </Text>
                  </TouchableOpacity>

                ))}
              </ScrollView>

            <View style={homeStyles.floatButton}>
                <TouchableOpacity
                    disabled
                    onPress={() => console.log('holi')}
                >
                    <Text style={homeStyles.textFloatButton}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}

Home.propTypes = {
  actions: PropTypes.shape({
    loadGroups: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired
  }).isRequired,

  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,

  groups: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,

  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

function mapStateToProps (state) {
  return {
    groups: state.groups,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ loadGroups, logout, loadUser }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
