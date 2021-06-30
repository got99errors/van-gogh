import React from "react";
import Location from './location'
import styles from "../side_comp_layout.module.css";

function SideComponents() {
	return <div className={styles.container}>
        <Location city='Tbilisi' country='Georgia' />
    </div>;
}

export default SideComponents;
