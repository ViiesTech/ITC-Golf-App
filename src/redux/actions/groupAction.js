import axios from "axios"
import constant, { URL } from "../constant"
import { ShowToast } from "../../Custom"

export const createGroup = (group_title, private_group, area_code, itc_handshake, desired_tee, suggested_day, kind_listing) => {
    return async dispatch => {

        dispatch({
            type: constant.CREATE_GROUP
        })

        let payload = {
            listing_title: group_title,
            private_group: private_group,
            area_code: area_code,
            itc_group_handshake: itc_handshake,
            group_desired_teebox: desired_tee,
            suggested_day: suggested_day,
            what_kind_of_match_is_this: kind_listing
        }

        await axios.post(`${URL}/create_group`, payload, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => {
            console.log('creating group response ======================>', res.data)
            if (res.data.post_id) {
                dispatch({
                    type: constant.CREATE_GROUP_DONE
                })
                ShowToast(res.data.message)
            } else {
                dispatch({
                    type: constant.CREATE_GROUP_DONE
                })
                ShowToast(res.data.message)
            }
        }).catch(error => {
            dispatch({
                type: constant.CREATE_GROUP_DONE
            })
            return ShowToast('Check your network, Try Again!' || error.code)
        })

    }
}

