import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "./List";
import { memo } from "react";

const Lists = memo(({ todoData, setTodoData }) => {

  console.log('Lists Component');

  // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함
  const handleEnd = (result) => {
    // 목적지가 없으면(이벤트 취소) 해당 함수를 종료
    if(!result.destination) return;

    // 리액트 불변성을 지키기 위해 새로운 todoData 생성
    const newTodoData = [...todoData];

    // 1. 변경시키는 아이템을 배열에서 삭제
    // 2. return 값으로 지워진 아이템을 잡아주기
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 reorderedItem을 insert
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, idx) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={idx}
                >
                  {(provided, snapshot) => (
                    <List
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
});

export default Lists;