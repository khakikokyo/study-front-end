import "./App.css";
import { useState } from "react";
import List from "./components/List";

function App() {

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  // 글 입력시 state 변경
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // 입력 버튼 클릭 시 목록에 추가
  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는 걸 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기
    setTodoData(prev => [...prev, newTodo]);
    setValue("");
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <List todoData={todoData} setTodoData={setTodoData} />

          <form style={{ display: "flex" }} onSubmit={handleSubmit}>
            <input
              type="text"
              name="value"
              style={{ flex: "10", padding: "5px" }}
              placeholder="할 일을 입력하세요."
              value={value}
              onChange={handleChange}
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

export default App;