import { memo, useState } from "react";

const List = memo(({
  id, title, completed, todoData, setTodoData, provided, snapshot
}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

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
  };

  // editing 입력할 때 editedTitle state 변경
  const handleEditChange = (e) => {
    setEditedTitle(e.target.value);
  }

  // editing 입력 후 save
  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodoData = todoData.map(data => {
      if(data.id === id) {
        data.title = editedTitle
      }
      return data;
    })
    setTodoData(newTodoData);
    setIsEditing(false);
  }

  if(isEditing) {
    return (
      <div className={`flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 border rounded`}>
        <div className="items-center">
          <form onSubmit={handleSubmit}>
            <input
              className="cursor-pointer m-4 w-full px-3 py-2 mr-4 text-gray-500 rounded"
              value={editedTitle}
              onChange={handleEditChange}
            />
          </form>
        </div>
        <div className="items-center">
          <button
            className="px-4 py-2 float-right"
            onClick={()=>{setIsEditing(false)}}
          >x</button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 float-right"
            type="submit"
          >save</button>
        </div>
      </div>
    )
  } else {
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
          <button
            className="px-4 py-2 float-right"
            onClick={()=>{handleClick(id)}}>x</button>
          <button
            className="px-4 py-2 float-right"
            onClick={()=>{setIsEditing(true)}}>edit</button>
        </div>
      </div>
    )
  }
});

export default List;