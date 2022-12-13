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

# 컴포넌트 렌더링 최적화

컴포넌트가 재렌더링되면 자식 컴포넌트는 항상 함께 재렌더링 된다.<br/>
평소에는 별 문제가 없겠으나, 자식 컴포넌트가 렌더링 시간이 오래 걸리는 무거운 컴포넌트인 경우, 자식 컴포넌트의 재렌더링을 막는 함수를 사용한다.<br/>
사실 재렌더링을 막는다기 보다는, 특정 상황에서만 재렌더링, props가 변할 때만 재렌더링을 해준다.

memo()로 감싼 컴포넌트는 불필요한 재렌더링을 막고, 기존 props와 바뀐 props를 비교하는 연산이 추가로 진행된다.<br/>
props가 크고 복잡하면 이거 자체로도 부담이 될 수 있으니, 꼭 필요한 곳에서만 사용하도록 한다.

1. memo(): 컴포넌트의 불필요한 재렌더링 막기

```javascript
import { memo } from "react";

// 원하는 컴포넌트 정의 부분을 감싼다.
let Child = memo(function( {
  return <div>자식 컴포넌트</div>
}));

function Cart() {
  return(
    <Child />
  )
}
```

2. useMemo(): 메모이제이션된 **'값'**을 반환, 컴포넌트 로드시 1회만 실행하고 싶은 코드가 있는 경우 (useEffect와 비슷한 용도, 실행시점의 차이가 있다.)

** 메모이제이션(memoization): 기존에 수행한 연산의 결과값을 어딘가에 저장해두고 <u>동일한 입력이 들어오면 재활용</u>하는 프로그래밍 기법을 말한다. memoization을 잘 적용하면 **중복 연산**을 피할 수 있기 때문에 메모리를 조금 더 쓰더라도 애플리케이션의 성능을 최적화할 수 있다.

```javascript
import { useMemo } from "react";

function 함수() {
  reutnr 결과
};

function Cart() {
  let result = useMemo(() => { return 함수(), [] });
};
```

3. useCallback(): 메모이제이션된 **'함수'**를 반환, useMemo는 함수를 **실행**해 버리는데, useCallback은 함수를 **반환**한다.

** 원래 컴포넌트가 렌더링 될 때 그 안에 있는 함수도 다시 만들게 된다. 하지만 똑같은 함수를 컴포넌트가 렌더링 된다고 해서 **계속 다시 만드는 것**은 좋은 현상은 아니다. 그리고 이렇게 컴포넌트가 리 렌더링될 때마다 함수를 계속 다시 만든다고 하면 만약 이 함수가 자식 컴포넌트에 props로 내려 준다면 함수를 포함하고 있는 컴포넌트가 리 렌더링 될 때마다 **자식 컴포넌트도 함수가 새롭게 만들어지니 계속 리 렌더링**하게 된다.

```javascript
import { useCallback } from "react";

const callback = useCallback(() => {}, []);
```

# 할 일 목록 수정 기능

1. 다른 UI 제공을 위한 state 생성

```javascript
const [isEditing, setIsEditing] = useState(false);
const [editedTitle, setEditedTitle] = useState(title);
```

2. edit 버튼 추가 & 클릭 시 isEditing state 변경

```javascript
<div className="items-center">
  <button
    className="px-4 py-2 float-right"
    onClick={()=>{handleClick(id)}}
  >
    x
  </button>
  <button
    className="px-4 py-2 float-right"
    onClick={()=>{setIsEditing(true)}}
  >
    edit
  </button>
</div>
```

3. 조건에 따른 UI 렌더링

```javascript
if(isEditing) {
  return (
    <div>editing...</div>
  )
} else {
  return (
    <div>
      [...]
    </div>
  )
}
```

4. edotomg 입력할 때 editedTitle state 변경

```javascript
const handleEditChange = (e) => {
  setEditedTitle(e.target.value);
}
```

```javascript
<input
  className="cursor-pointer m-4 w-full px-3 py-2 mr-4 text-gray-500 rounded"
  value={editedTitle}
  onChange={handleEditChange}
/>
```

5. editing 입력 후 save

```javascript
<form onSubmit={handleSubmit}></form>
<button onClick={handleSubmit}>save<button>
```

```javascript
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
```