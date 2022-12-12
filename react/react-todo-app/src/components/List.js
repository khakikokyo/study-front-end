function List({ todoData, setTodoData }) {

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  };

  const getStyle = (completed) => {
    return {
      padding: "15px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none"
    };
  };

  // 할 일 목록 삭제하기
  const handleClick = (id) => {
    let newTodoData = todoData.filter(data => data.id !== id);
    setTodoData(newTodoData);
  };

  // 체크박스 클릭 시 상태 바꾸기
  const handleCompleChange = (id) => {
    let newTodoData = todoData.map(data => {
      if(data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    })
    setTodoData(newTodoData);
  }

  return (
    <div>
      {todoData.map((data) => (
        <div style={getStyle(data.completed)} key={data.id}>
          <input
            type="checkbox"
            defaultChecked={false}
            onChange={()=>{ handleCompleChange(data.id) }}
          />
          {data.title}
          <button
            style={btnStyle}
            onClick={()=>{handleClick(data.id)}}>
              x
          </button>
        </div>
      ))}
    </div>
  )
}

export default List;