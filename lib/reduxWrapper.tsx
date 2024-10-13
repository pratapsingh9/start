'use client';

import { Provider } from "react-redux";
import { reduxStore } from "@/redux/store";

export default function ReduxWrapper({children}:{
    children: JSX.Element
}) {
    return (
        <Provider store={reduxStore}>
            {children}
        </Provider>
    );
}
