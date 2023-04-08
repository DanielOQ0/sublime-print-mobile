import { createAction } from "@reduxjs/toolkit";

let reloadTabs = createAction(
    'reloadTabs',
    ({ state }) => {
        return {
            payload: {
                state: state
            }
        }
    }
)

const tabsActions = {reloadTabs}
export default tabsActions