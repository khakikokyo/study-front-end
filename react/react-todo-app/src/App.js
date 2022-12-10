import React, {Component} from "react";
import "./App.css";

export default class App extends Component {

  state = {
    todoData: [],
    value: ""
  }

  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  };

  getStyle = (completed) => {
    return {
      padding: "15px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none"
    };
  };

  // 할 일 목록 삭제하기
  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter(data => data.id !== id);
    this.setState({todoData: newTodoData});
  }

  // 글 입력시 state 변경
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  // 입력 버튼 클릭 시 목록에 추가
  handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false
    }

    // 원래 있던 할 일에 새로운 할 일 더해주기
    this.setState({ todoData: [...this.state.todoData, newTodo], value: "" });
  };

  // 체크박스 클릭 시 상태 바꾸기
  handleCompleChange = (id) => {
    let newTodoData = this.state.todoData.map(data => {
      if(data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    })
    this.setState({ todoData: newTodoData });
  }

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

          {this.state.todoData.map((data) => (
            <div style={this.getStyle(data.completed)} key={data.id}>
              <input
                type="checkbox"
                defaultChecked={false}
                onChange={()=>{ this.handleCompleChange(data.id) }}
              />
              {data.title}
              <button style={this.btnStyle} onClick={()=>{this.handleClick(data.id)}}>x</button>
            </div>
          ))}

            <form style={{ display: "flex" }} onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="value"
                style={{ flex: "10", padding: "5px" }}
                placeholder="할 일을 입력하세요."
                value={this.state.value}
                onChange={this.handleChange}
              />

              <input
                type="submit"
                value="입력"
                className="btn"
                style={{ flex: "1" }}
              />
            </form>

        </div>
      </div>
    )
  }
}