import { createAction } from "@reduxjs/toolkit";

let productsPagination = createAction(
    'productsPagination',
    ({ state }) => {
        return {
            payload: {
                state: state
            }
        }
    }
)

const productsClickActions = {productsPagination}
export default productsClickActions