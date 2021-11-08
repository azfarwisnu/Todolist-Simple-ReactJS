import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import "../styles.css"
import TodoItem from "../components/TodoItem"
import Axios from "axios"
import { connect } from "react-redux"

class TodoPage extends React.Component{

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
        this.props.changeTodo(response.data.length);
    })

  }
   
  renderTodolist = () => {
    return this.state.todolist.map((val) => {
        return(
            <TodoItem completeData={this.completeTodo} deleteData={this.deleteTodo} sendData={val}/>
        )
    })
  }

  componentDidUpdate(){
    return this.fetchTodo()
  }

  componentDidMount(){
    return this.fetchTodo()
  }

 

  render() {
      return(
      <div>
        <h2 className="mx-3">Kegitatan Hari ini</h2>
        <h5 className="mx-3">Data Add : {this.state.inputTodo}</h5>
        <button onClick={this.fetchTodo} className="my-2 btn btn-warning mx-3">
          Get my todolist {this.props.todoGlobalState.todoCount}
        </button>
       <div>
         {this.renderTodolist()}
         <input onChange={this.inputTodo} type="text" className="mx-3 col-2"></input>
         <button onClick={this.addTodo}className="btn btn-primary">AddTodo</button>
         <button onClick={this.props.incrementTodo} className="mx-2 btn btn-primary">Increament Todo</button>
         <button onClick={this.props.decrementTodo} className="mx-2 btn btn-primary">Decreament Todo</button>
         <button onClick={() => this.props.changeTodo(2)} className="mx-2 btn btn-primary">Decreament Todo</button>

       </div>
      </div>
    )
  }


}

const incrementTodoCount = () => {
  return{
    type: "INCREMENT_TODO_COUNT"
  }
}

const decrementTodoCount = () => {
  return{
    type: "DICREMENT_TODO_COUNT"
  }
}

const changeTodoCount = (newCount) => {
  return {
    type: "CHANGE_TODO_COUNT",
    payload: newCount
  }
}


const mapStateProps = (state) => {
 // state.todo.inputTodo
  return{
    testingProps: 0,
    todoGlobalState: state.todo,
  }
}

const mapdisPatchToProps = {
    incrementTodo: incrementTodoCount,
    decrementTodo: decrementTodoCount,
    changeTodo: changeTodoCount,
  }


export default connect(mapStateProps,mapdisPatchToProps)(TodoPage)
