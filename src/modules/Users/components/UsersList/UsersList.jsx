import React, { useEffect, useState } from 'react'
import Styleuser from "./user.module.css"
import svgimg from "../../../../assets/header-recipes.svg"
import HeaderItemsProps from '../../../Shared/components/headerItemProps/HeaderItemsProps'
import Spiners from '../../../Shared/components/ModalsSpiner/Spiners'
import { BASEIMAGE, USERRLIST } from '../../../Constants/ENDPOINT'
import axios from 'axios'
import DropUsers from '../../../Shared/components/DropdownUsers/DropUsers'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function UsersList() {
  const navigate = useNavigate()
  const Toaddadmin = () => {
    navigate("/dashboard/add-admin")
  }
  const [Namevalue, SetNamevalue] = useState("")
  const [Emailvalue, SetEmailvalue] = useState("")
  const [Cantryvalue, SetCantryvalue] = useState("")
  const [groupvalue, Setgroupvalue] = useState("")




  const [arrayofPage, setArrayofPage] = useState([])
  const [DataUsers, SetDataUsers] = useState([])

  const isDataUsers = async (pagesize, pagenamber, Nameinput, Emailinput, Cantryinput, group) => {
    try {
      let response = await axios.get(USERRLIST.get, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: { pageSize: pagesize, pageNumber: pagenamber, userName: Nameinput, email: Emailinput, country: Cantryinput, groups: group }
      })
      // console.log(response.data.data[0].group)
      setArrayofPage(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
      SetDataUsers(response.data.data)
      console.log(response)

    }
    catch (error) {
      console.log(error)
      // SetLoadin(false)

    }

  }
  const ValueName = (input) => {
    SetNamevalue(input.target.value)
    isDataUsers(20, 1, input.target.value, Emailvalue, Cantryvalue, groupvalue)

  }

  const ValueEmail = (input) => {
    SetEmailvalue(input.target.value)
    isDataUsers(20, 1, Namevalue, input.target.value, Cantryvalue, groupvalue)

  }
  const ValueCantry = (input) => {
    SetCantryvalue(input.target.value)
    isDataUsers(20, 1, Namevalue, Emailvalue, input.target.value, groupvalue)

  }
  const Valuegroup = (input) => {
    Setgroupvalue(input.target.value)
    isDataUsers(20, 1, Namevalue, Emailvalue, Cantryvalue, input.target.value)

  }

  useEffect(() => {
    isDataUsers(20, 1)
  }, [])


  return (
    <>
      <div className={Styleuser.contaner}>
        <HeaderItemsProps Title={"Users"} TitleSpan={"List"} Discreption={"You can now add your items that any user can order it from the Application and you can edit"} imag={svgimg} />

        <div className={Styleuser.HeadDetalis}>
          <Button onClick={Toaddadmin}>Create User Admin</Button>
        </div>
        <div className={Styleuser.secSearching}>
          <div className={Styleuser.searchinput}>
            <box-icon name='search' color="gray" ></box-icon>
            <input onChange={ValueName} type="search" name="search" id="search" placeholder='Search here ...' />
          </div>
          <div className={Styleuser.Option}>
            <select onChange={ValueEmail} name="tag" id="">
              <option disabled="Select-Email">Email</option>
              {
             DataUsers.map((Email ,index)=>(
              <option key={index} value={Email.email}>{Email.email}</option>

            ))
           }
            </select>
          </div>
          <div className={Styleuser.optionCategory}>
            <select onChange={ValueCantry} name="" id="">
              <option disabled="Select-cantry">country</option>
              {
             DataUsers.map((cantry ,index)=>(
              <option key={index} value={cantry.country}>{cantry.country}</option>

            ))
           }
            </select>
          </div>
          <div className={Styleuser.optionCategory}>
            <select onChange={Valuegroup} name="" id="">
              <option disabled="Select-group">group</option>
              {
             DataUsers.map((group ,index)=>(
              <option key={index} value={group.group.id}>{group.group.id}</option>

            ))
           }
            </select>
          </div>

        </div>


        <div className={Styleuser.headTable}>
          <table>
            <thead>

              <tr className={Styleuser.trhead}>
                <th>Id</th>
                <th>Name</th>
                <th>ImagePath</th>
                <th>Email</th>
                <th>Country</th>
                <th>Group</th>
                <th>CreationDate</th>
                <th></th>
              </tr>

            </thead>
            <tbody>
              {DataUsers?.length <= 0 ? <Spiners Title={"MmMm....... Wait a moment! If the data does not come, restart the page.   "} /> : DataUsers?.map((data, index) =>
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.userName}</td>
                  <td> {data.imagePath === null ? "" : <img className={`${Styleuser.imagUser} "w-25"`} src={`${BASEIMAGE}/${data.imagePath}`} alt="img-user" />}</td>
                  <td>{data.email}</td>
                  <td>{data.country}</td>
                  <td>{data.group.id}</td>
                  <td>{data.group.creationDate}</td>
                  <td><DropUsers isDataUsers={isDataUsers} DataUsers={DataUsers} data={data.id} /></td>
                </tr>
              )}


            </tbody>



          </table>


        </div >


        {DataUsers?.length <= 0 ? "" :
          <nav aria-label="Page navigation example" className='my-50'>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {
                arrayofPage.map((pagenum) => (

                  <li key={pagenum} className="page-item" onClick={() => isDataUsers(20, pagenum)}><a className="page-link" >{pagenum}</a></li>
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

      </div >


    </>

  )
}
