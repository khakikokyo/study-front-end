# React-Todo-App

## Class형으로 만들어 보기

```javascript
export default class App extends Component {
  render(
    return (
      <div>
        클래스형
      </div>
    )
  )
}
```

## state를 사용하여 Data 객체로 저장

```javascript
state = {
  todoData: [
    {
      id: "1",
      title: "공부하기",
      completed: true
    },
    {
      id: "2",
      title: "청소하기",
      completed: false
    }
  ]
}
```

## Map 메서드를 사용하여 할 일 목록 나열

```javascript
{this.state.todoData.map((data) => (
  <div style={this.getStyle()} key={data.id}>
    <input type="checkbox" defaultChecked={false} />
    {data.title}
    <button style={this.btnStyle} onClick={()=>{this.handleClick(data.id)}}>x</button>
  </div>
))}
```

## Filter 메소드를 사용해서 할 일 목록 삭제하기

```javascript
// filter(): 주어진 함수의 테스트를 통화하는 모든 요소를 모아 새로운 배열로 반환
handleClick = (id) => {
  let newTodoData = this.state.todoData.filter(data => data.id !== id);
  this.setState({todoData: newTodoData});
}
```

## 입력 버튼 클릭 시 목록에 추가, 입력한 값 지우기

```javascript
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
}
```

## 완료 상태 변환 & 삼항 연산자 활용

```javascript
getStyle = (completed) => {
  return {
    padding: "15px",
    borderBottom: "1px #ccc dotted",
    textDecoration: completed ? "line-through" : "none"
  };
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
```

# Drag and Drop

## Drag and Drop 기능 구현 순서

1. HTML 드래그 앤 드롭 API를 사용하여 원하는 목록을 드래그 가능하게 만든다.
2. 사용자가 드래그를 할 때 적절한 애니메이션을 준다.
3. 사용자가 드래그를 멈췄는지 확인한다. 그리고 해당 위치에도 애니메이션을 준다.
4. 클라이언트가 목록을 재정렬한 경우 항목의 위치를 새 항목으로 업데이트한다.
5. 이것들을 쉽게 구현할 수 있게 도와주는 모듈이 [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)

```bash
# 필요 모듈 설치
$ npm install react-beautiful-dnd --save
```

```javascript
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
```

```javascript
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// Drag and drop을 사용하고자 하는 어플리케이션의 영역을 감싸는 Wrapper
<DragDropContext onDragEnd={handleEnd}>
  // Drag and drop에서 drop을 할 수 있는 영역이자, Draggable를 감싸는 Wrapper
  <Droppable droppableId="todo">
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {todoData.map((data, idx) => (
          // Drag and Drop의 주체가 되는, Drag가 가능한 컴포넌트를 감싸는 Wrapper
          <Draggable
            key={data.id}
            draggableId={data.id.toString()}
            index={idx}
          >
            {(provided, snapshot) => (
              <div>
                [...]
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
```