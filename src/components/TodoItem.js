import React from "react"


class TodoItem extends React.Component{
	render(){
		return(
			<div className="my-1 d-flex flex-row justify-content-between todo-item-container align-items-center mx-3">
	        	<h6><b>Kegiatan: </b>{this.props.sendData.activity}</h6>
	        <div className="">
	          <button disabled={this.props.sendData.status} onClick={() => this.props.completeData(this.props.sendData.id)} className="btn btn-success mx-1">
	          	{
	          		this.props.sendData.status ? "Finished" : "Complete"
	          	}
	          </button>
	          <button onClick={() => this.props.deleteData(this.props.sendData.id)} className="btn btn-danger">Delete</button>
	        </div>
	      </div>
		)
	}
}

export default TodoItem