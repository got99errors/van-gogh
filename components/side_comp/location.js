import React, {useEffect, useState} from 'react'
import styles from "../side_comp_layout.module.css";
import Image from 'next/image'

function Location({city , country=''}) {
    const [flagURL, setFlagURL] = useState('')

    useEffect( async () => {
        const url = `https://restcountries.eu/rest/v2/name/${country}`
        fetch(url).then(res => res.json()).then(result => {
            console.log(result);
            setFlagURL(result[0].flag)
        })
    } , [])
    return (
        <div className={styles.sideComp}>
            <div><small>Blogging from</small></div>
            <div>{city}, {country}</div>
            <div><img src={flagURL} width={20} height={20} alt="country flag" /></div>
        </div>
    )
}


export default Location;
