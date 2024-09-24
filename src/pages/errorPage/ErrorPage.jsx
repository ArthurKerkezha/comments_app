import React from "react";

import styles from "./ErrorPage.module.less";

const ErrorPage = () => (
  <div className={styles.container}>
    <h1>Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
  </div>
);

export default ErrorPage;
