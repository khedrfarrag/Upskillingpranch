import React, { useState } from 'react'
import Stylenavbar from "./navbar.module.css"
import imagUser from "../../../../assets/8c008bab0c67b666a9ccda1c84f11215.png"
import { jwtDecode } from 'jwt-decode'
export default function NavBar() {
    let [Toggle, seToggle] = useState(false)
    const handelTogel = () => {
        console.log(Toggle)
        if (Toggle === false) {
            seToggle(true)
        } else { seToggle(false) }
    }
    let data = localStorage.getItem("token")
    let decoded = jwtDecode(data)
    // console.log(decoded)
    return (
        <div className={Stylenavbar.contaner} >
            <ul className={Stylenavbar.HeroNav}>
                <div className={Stylenavbar.MainSearch}>
                    <box-icon name='search'></box-icon>
                    <input type="search" name="search" aria-label='search' />
                </div>
                <div className={Stylenavbar.ContanerHero}>
                    <div onClick={handelTogel} className={Stylenavbar.img}>
                        <img src={imagUser} alt="img-user" />
                    </div>
                    <p>{decoded.userName}</p>
                    <box-icon onClick={handelTogel} name='down-arrow-alt'></box-icon>
                    {Toggle && <div className={Stylenavbar.downArrow}>
                        <ul className={Stylenavbar.listDown}>
                            <li className={Stylenavbar.listDownItem}>Profile</li>
                            <li className={Stylenavbar.listDownItem}>option</li>
                            <li className={Stylenavbar.listDownItem}>logout</li>
                        </ul>
                    </div>}
                </div>
                <div className={Stylenavbar.MainNvigation}>
                    <box-icon type='solid' name='bell'></box-icon>
                </div>
            </ul>
        </div>
    )
}
