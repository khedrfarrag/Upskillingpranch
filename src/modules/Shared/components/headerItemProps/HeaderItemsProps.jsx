import React from 'react'
import StyleHeadr from "./head.module.css"

export default function HeaderItemsProps({Title,TitleSpan,Discreption,imag}) {
  return (
    // <div className={StyleHeadr.contaner}>
      <>
      
      
      <div className={StyleHeadr.SectionHead}>
        <div className={StyleHeadr.head}>
          <h1>{Title} <span>{TitleSpan}</span> </h1>
          <p>{Discreption}</p>
        </div>
        <div className={StyleHeadr.imghead}>
          <img src={imag} alt="logo-home" />
        </div>
      </div>
      </>
      // {/* </div> */}
)
}
