import { createAction } from "@reduxjs/toolkit";

let checkoutMP = createAction(
    "checkoutMP",
    ({ checkout }) => {
        return{
            payload: {
                checkout: checkout
            }
        }
    }
)
const actions = { checkoutMP }
export default actions