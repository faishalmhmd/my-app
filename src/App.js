import axios from 'axios'
import { useState } from 'react'

function App() {
  // form register
  const [username,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  // form login

  const [logUsername,setLogUsername] = useState('')
  const [logPassword,setLogPassword] = useState('')

  // token
  const [token,setToken] = useState('')


  // data
  const [postData,setPostData] = useState('')

  // fetch Data
  const [fetchData,setFetchData] = useState('')



  // function buat regis
  const regis = (e) => {
    e.preventDefault()
    const data = {
      email: email,
      password: password,
      username: username
    }
    const json = JSON.stringify(data)
    axios.post('http://94.74.86.174:8080/api/register',json,{ headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    alert(`username : ${username} , password : ${password}, email: ${email}`)
  }

  // function buat login
  const login = (e) => {
    e.preventDefault()
    const data = {
      password: logPassword,
      username: logUsername
    }
    const json = JSON.stringify(data)
    axios.post('http://94.74.86.174:8080/api/login',json,{ headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
        console.log(response.data.data)
        setToken(response.data.data.token)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // function buat getData
  const getData = (e) => {
    e.preventDefault()
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    axios.get('http://94.74.86.174:8080/api/checklist',config)
      .then(response => {
        console.log(response.data.data)
        setFetchData(response.data.data)
      })

      .catch(console.log)
  }

  // function buat kirim data
  const sendData = (e) => {
    e.preventDefault()
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    const data = {
      name: postData
    }
    const json = JSON.stringify(data)

    axios.post('http://94.74.86.174:8080/api/checklist',data,config)
      .then(console.log)
      .catch(console.log)
  }


  return (
    <div>
      token : {token}
      <center>
        <h4>Form Register</h4>
        <table border="1">
          <tr>
            <td>Username  </td>
            <td>:</td>
            <td>
              <input class="input" type="text" placeholder="masukan username" value={username} onChange={(e) => setName(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>password  </td>
            <td>:</td>
            <td>
              <input class="input" type="text" placeholder="masukan password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>E-mail  </td>
            <td>:</td>
            <td>
              <input class="input" type="text" placeholder="masukan password" value={email} onChange={(e) => setEmail(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td> <button onClick={regis}>Register </button> </td>
          </tr>
        </table>
        <hr />
        <h4>Form Login</h4>
        <table border="1">
          <tr>
            <td>Username  </td>
            <td>:</td>
            <td>
              <input class="input" type="text" placeholder="masukan username" value={logUsername} onChange={(e) => setLogUsername(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>Password  </td>
            <td>:</td>
            <td>
              <input class="input" type="text" placeholder="masukan username" value={logPassword} onChange={(e) => setLogPassword(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td> <button onClick={login}>Login </button> </td>
          </tr>
        </table>
        <hr />
        <h4>Post Data</h4>
        <table border="1">
          <tr>
            <td>Data  </td>
            <td>:</td>
            <td>
              <input class="input" type="text" placeholder="masukan Data" value={postData} onChange={(e) => setPostData(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td> <button onClick={sendData}>Kirim </button> </td>
          </tr>
        </table>
        <hr />
        <h4>Get Data</h4>
        <button onClick={(e) => getData(e)} type='button'>get Data</button>
        <table>
          {for (let i = 0; i < fetchData.length; i++) {
            return
          }}
        </table>
      </center>
    </div >
  )
}

export default App
