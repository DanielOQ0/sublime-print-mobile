import { createAction  } from "@reduxjs/toolkit";

let captureDetails = createAction(
    "captureDetails",
    ({details, product}) => {
        return { payload: {
            details: details,
            product: product
        }}
    }
)

const actions = {captureDetails};
export default actions