import logo from './logo.svg';
import './App.css';
import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import "./styles.css"
import TodoItem from "./components/TodoItem"
import TodoPage from "./pages/TodoPage"
import MyNavbar from "./components/MyNavbar"
import Axios from "axios"

class App extends React.Component{
  render(){
    return(
      <div>
        <MyNavbar />
        <TodoPage />
      </div>
    )
  }
}


export default App;
