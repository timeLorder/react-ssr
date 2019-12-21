import React from "react";
import styles from "../styles/about.css";
import withStyles from "isomorphic-style-loader/withStyles";

function About(props) {
  return (
    <div>
      <h1 className={styles.about}>关于我们</h1>
    </div>
  )
}

export default withStyles(styles)(About)