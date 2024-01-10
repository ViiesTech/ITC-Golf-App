import constant from "../constant"


const url = 'https://inthecup.golf/wp-json/app/v1'

export const getListings = () => {
    return async dispatch => {

        dispatch({
            type: constant.GET_LISTING
        })

        await fetch(`${url}/matches`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(async res => {
            const data = await res.json()
            console.log('listing response =======================>', data)
            dispatch({
                type: constant.GET_LISTING_DONE,
                payload: data
            })
        }).catch(error => {
            console.log('listing errrorr =================>', error)
            dispatch({
                type: constant.GET_LISTING_DONE
            })
        })
    }
}

export const getGroups = () => {
    return async dispatch => {

        dispatch({
            type: constant.GET_GROUPS
        })

        await fetch(`${url}/groups`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(async (res) => {
            const group = await res.json()
            console.log('group responsee ============>', group)
            dispatch({
                type: constant.GET_GROUPS_DONE,
                payload: group
            })
        }).catch((error) => {
            console.log('group errorrrr ==============>', error)
            dispatch({
                type: constant.GET_GROUPS_DONE
            })
        })
    }
}