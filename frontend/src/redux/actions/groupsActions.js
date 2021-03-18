import axios from 'axios'
import groupActionsTypes from './groupActionsTypes'

const host = 'http://192.168.0.33:5000'
// const host = 'http://192.168.1.26:5000'

export default function loadGroups () {
  return async (dispatch) => {
    try {
      const allGroups = await axios.get(`${host}/groups`, { withCredentials: true })
      dispatch({
        type: groupActionsTypes.LOAD_GROUPS,
        groups: allGroups.data
      })
    } catch {
      dispatch({
        type: groupActionsTypes.LOAD_GROUPS_ERROR
      })
    }
  }
}
