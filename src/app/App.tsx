import React from "react";
import Router from "./Router";

import Layout from "../components/Layout";
import "./globalStyles.scss";

const App = () => {
    return (
        <Layout>
            <Router />
        </Layout>
    );
};

export default App;
