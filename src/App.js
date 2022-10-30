import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
// import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
// import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";

const url = "https://randomuser.me/api/";



function App() {


  const [user, setUser] =useState()

  const [label, setLabel] =useState("name")

  const [preUser, setPreUser] = useState([])

  const [flag, setFlag] = useState(false)

  const [nameFlag, setNameFlag] = useState(false)

  const getData = () => {
    

    fetch(url).then((res)=> {
      if(!res.ok) {
        throw new Error("something went wrong")
      }
      return res.json()
    }).then((data)=> setUser(data.results[0])).catch((err)=>console.log(err))
    // document.querySelector(".btn-add-user").disabled = false
    
    
  }

  // const addUser = (e) => {
  //   (document.querySelector("tbody").innerHTML += 
  //   `
  //               <tr className="body-tr">
  //               <td>${user?.name?.first} ${user?.name?.last}</td>
  //               <td>${user?.email}</td>
  //              <td>${user?.phone}</td>
  //              <td>${user?.dob.age}</td>
  //              </tr>
  //               `
  //               )
  //               e.target.disabled=true
  // }


    const addUser =(name) => {
      setFlag(true)
      const show =preUser?.some((item)=> item.name===name )

      show || setPreUser([...preUser, user])
    }

  useEffect(()=> {
      getData() 
  },[])




// console.log((preUser.filter((item)=> item===user).length));
  console.log(preUser)


  console.log(user)



  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={user?.picture?.large} alt="random user" className="user-img" />
          <p className="user-title">{nameFlag && `My ${label} is`}</p>
          <p className="user-value"></p>
          <div className="values-list">
            <button onClick={(e)=>{document.querySelector(".user-value").innerText=user?.name?.first
             setNameFlag(true) 
            setLabel(e.target.parentElement.getAttribute("data-label")) 
            }} className="icon" data-label="name">
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button  className="icon" data-label="email" onClick={(e)=>{document.querySelector(".user-value").innerText=user?.email
            setLabel(e.target.parentElement.getAttribute("data-label")) 
             setNameFlag(true) 
            }}>
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onClick={(e)=>{document.querySelector(".user-value").innerText=user?.dob?.age
            setLabel(e.target.parentElement.getAttribute("data-label"))  
            setNameFlag(true) 
            }}>
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street" onClick={(e)=>{document.querySelector(".user-value").innerText=user?.location?.street?.name
            setLabel(e.target.parentElement.getAttribute("data-label")) 
             setNameFlag(true) 
            }}>
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone" onClick={(e)=>{document.querySelector(".user-value").innerText=user?.phone
            setLabel(e.target.parentElement.getAttribute("data-label"))
            setNameFlag(true) 
            }}>
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon "  data-label="password" onClick={(e)=>{document.querySelector(".user-value").innerText=user?.login?.password
            setLabel(e.target.parentElement.getAttribute("data-label"))
            setNameFlag(true) 
            }}>
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={()=> (getData())}>
              new user
            </button>
            <button className="btn btn-add-user" type="button" onClick={()=>  addUser(user.name)  
            
            
            
            }>
              add user
            </button>
          </div>
            {flag && 
          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
            {preUser.map((user, i)=> {
              return(
                <tr key={i} className="body-tr">
                <td>{user?.name?.first} {user?.name?.last}</td>
                <td>{user?.email}</td>
               <td>{user?.phone}</td>
               <td>{user?.dob.age}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
            }
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
