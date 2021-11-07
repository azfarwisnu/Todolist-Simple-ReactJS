import logo from './logo.svg';
import './App.css';
import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import "./styles.css"
import TodoItem from "./components/TodoItem"
import Axios from "axios"

class App extends React.Component{

  state = {
    todolist : [],
    inputTodo : "",
  }

  completeTodo = (id) => {
    Axios.patch(`http://localhost:2000/todo/${id}`, {
      status: true,
    })
    .then(() => {
      alert("Data Complete")
      return this.fetchTodo()
    })
    .catch((err) => {
      alert("terjadi kesalahan pada server")
      return this.fetchTodo()
    })

  }

  deleteTodo = (id) => {
    Axios.delete(`http://localhost:2000/todo/${id}`)
    .then(() => {
      alert("Hapus data berhasil")
      return this.fetchTodo()
    })
    .catch((err) => {
      alert("terjadi kesalahan pada server")
      return this.fetchTodo()
    })
  }


  addTodo = () => {
    Axios.post("http://localhost:2000/todo", {
        activity: this.state.inputTodo,
        status: false,
    }).then(() => {
        alert("Data berhasil ditambahkan")
        return this.fetchTodo()
    }).catch(() => {
      alert("terjadi kesalahan pada server")
      return this.fetchTodo()
    })
  }

  inputTodo = (event) => {
    this.setState({inputTodo: event.target.value})
  }

  fetchTodo = () => {
    Axios.get("http://localhost:2000/todo")
    .then((response) => {
        this.setState({
          todolist: response.data
        })
    })

  }
   
  renderTodolist = () => {
    return this.state.todolist.map((val) => {
        return(
            <TodoItem completeData={this.completeTodo} deleteData={this.deleteTodo} sendData={val}/>
        )
    })
  }


 

  render() {
      return(
      <div>
        <h2 className="mx-3">Kegitatan Hari ini</h2>
        <h5 className="mx-3">Data Add : {this.state.inputTodo}</h5>
        <button onClick={this.fetchTodo} className="my-2 btn btn-warning mx-3">Get my todolist</button>
       <div>
         {this.renderTodolist()}
         <input onChange={this.inputTodo} type="text" className="mx-3 col-2"></input>
         <button onClick={this.addTodo}className="btn btn-primary">AddTodo</button>
       </div>
      </div>
    )
  }


}


export default App;
