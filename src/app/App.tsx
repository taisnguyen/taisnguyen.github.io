import React from "react";
import Router from "./Router";

import Layout from "../components/Layout";
import "./globalStyles.scss";
import "../assets/css/satoshi.css";
import "../assets/css/general-sans.css";

const App = () => {
    return (
        <Layout>
            <Router />
        </Layout>
    );
};

export default App;
