const List = ({
  id, title, completed, todoData, setTodoData, provided, snapshot
}) => {

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
    <div
      key={id}
      {...provided.draggableProps}
      ref={provided.innerRef}
      {...provided.dragHandleProps}
      className={`
        ${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"}
        flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
    >
      <div className="items-center">
        <input
          className="cursor-pointer m-4"
          type="checkbox"
          defaultChecked={false}
          onChange={()=>{ handleCompleChange(id) }}
        />{" "}
        <span className={completed ? "line-through" : undefined}>{title}</span>
      </div>
      <div className="items-center">
        <button onClick={()=>{handleClick(id)}}>x</button>
      </div>
    </div>
  )
}

export default List;