import React, { useContext, useEffect, useState } from 'react'
import Stylerecipes from "./recipes.module.css"
// import svgimg from "../../../../assets/header-home.svg"
import svgimg from "../../../../assets/header-recipes.svg"
import DropRecipe from "../../../Shared/DropdownRecipe/DropRecipe"
import { Button } from "react-bootstrap"
import HeaderItemsProps from '../../../Shared/components/headerItemProps/HeaderItemsProps'
import axios from "axios"
import { BASEDTAGID, BASEIMAGE, CATEGORY, RECIPE } from "../../../Constants/ENDPOINT"
import Spiners from '../../../Shared/components/ModalsSpiner/Spiners'
import { useNavigate} from 'react-router-dom'


export default function RecipesList() {
  // usecontxet

  const [Tagid, setTagid] = useState([])
  const GetTagId = async () => {
    try {
      let response = await axios.get(BASEDTAGID, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },


      })
      // toast.success("Login successfuliy")
      setTagid(response.data)
      console.log(response.data)
    }
    catch (error) {
      console.log(error)
      // toast.error(error.Response.data.message)

    }
  }



  const [Categ, setCateg] = useState([])

  const isDataCategory = async () => {
    try {
      let response = await axios.get(CATEGORY.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })

      setCateg(response.data.data)

      // console.log(response.data.data)
    }
    catch (error) {
      console.log(error)

    }

  }



  const navigate = useNavigate()
  const ToRecipse = () => {
    navigate("/dashboard/add-recipe")
  }
  const [Namevalue, SetNamevalue] = useState("")
  const [Tagvalue, SetTagvalue] = useState("")
  const [Catvalue, SetCatvalue] = useState("")


  const [dataRecipe, SetDataRecipe] = useState([])
  // const [loading, SetLoadin] = useState(true)

  // const [dataRecipe, SetDataRecipe] = useState([])

  const [arrayofPage, setArrayofPage] = useState([])
  const isDataRecipe = async (pagesize, pagenamber, Nameinput, Taginput, Catinput) => {
    try {
      let response = await axios.get(RECIPE.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: {
          pageSize: pagesize,
          pageNumber: pagenamber,
          name: Nameinput,
          tagId: Taginput,
          categoryId: Catinput
        }
      })
      setArrayofPage(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      SetDataRecipe(response.data.data)
      // setTimeout(() => {
      //   SetLoadin(false)
      // }, 2000)
      console.log(response)
    }
    catch (error) {
      console.log(error)
      // SetLoadin(false)

    }

  }



  const ValueName = (input) => {
    SetNamevalue(input.target.value)
    isDataRecipe(4, 1, input.target.value, Tagvalue, Catvalue)

  }
  const ValueTag = (input) => {
    SetTagvalue(input.target.value)
    isDataRecipe(4, 1, Namevalue, input.target.value, Catvalue)

  }

  const ValueCat = (input) => {
    SetCatvalue(input.target.value)
    isDataRecipe(4, 1, Namevalue, Tagvalue, input.target.value)

  }



  useEffect(() => {
    isDataRecipe(4, 1)
    GetTagId()
    isDataCategory()
    // DeleteRecipe()
  }, [])

  return (
    <>
      <div className={Stylerecipes.contaner}>

        <HeaderItemsProps Title={"welcome"} TitleSpan={"Recioes"} Discreption={"This is a welcoming screen for the entry of the application , you can now see the options"} imag={svgimg} />

        <div className={Stylerecipes.HeadDetalis}>
          <div className={Stylerecipes.HeadTitle}>
            <h1>Recipe Table Details</h1>
            <span>You can check all details</span>
          </div>
          <Button onClick={ToRecipse}>Add New Item</Button>
        </div>
        <div className={Stylerecipes.secSearching}>
          <div className={Stylerecipes.searchinput}>
            <box-icon name='search' color="gray" ></box-icon>
            <input onChange={ValueName} type="search" name="search" id="search" placeholder='Search here ...' />
          </div>
          <div className={Stylerecipes.Option}>
            <select name="tag" id="" onChange={ValueTag}>
              <option disabled="Select-Tag"> SelectTag...</option>
              {Tagid.map(Tag => (

                <option key={Tag.id} value={Tag.id}>{Tag.name}</option>
              ))}
            </select>
          </div>
          <div className={Stylerecipes.optionCategory}>
            <select name="" id="" onChange={ValueCat}>
              <option disabled="Select-category"> SelectCategory...</option>
              {Categ.map(cat => (

                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}

            </select>
          </div>

        </div>




        <div className={Stylerecipes.contanerUsers}>




          <table>
            <thead>

              <tr className={Stylerecipes.trhead}>
                <th>Id</th>
                <th>Name</th>
                <th>imagePath</th>
                <th>price</th>
                <th>Description</th>
                <th>tag</th>
                <th>creationDate</th>
                <th></th>
              </tr>

            </thead>
            <tbody>
              {dataRecipe?.length <= 0 ? <Spiners Title={"MmMm....... Wait a moment! If the data does not come, restart the page.   "} /> : dataRecipe?.map((data, index) =>
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td> {data.imagePath ==="" ||null? "" : <img className={`${Stylerecipes.imagUser} "w-25"`} src={`${BASEIMAGE}/${data.imagePath}`} alt="img-user" />}</td>
                  <td>{data.price}</td>
                  <td>{data.description}</td>
                  <td>{data.tag.name}</td>
                  <td>{data.creationDate}</td>
                  <td><DropRecipe isDataRecipe={isDataRecipe} staterecipe={data} data={data.id} /></td>
                </tr>
              )}


            </tbody>



          </table>






        </div>
{dataRecipe?.length <= 0 ?"":
  <nav aria-label="Page navigation example" className='my-50'>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {
            arrayofPage.map((pagenum) => (

              <li key={pagenum} className="page-item" onClick={() => isDataRecipe(4, pagenum)}><a className="page-link" >{pagenum}</a></li>
            ))
          }
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
}
 

      </div>
     
    </>

  )
}



