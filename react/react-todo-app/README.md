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

# 입력 버튼 클릭 시 목록에 추가

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
  this.setState({ todoData: [...this.state.todoData, newTodo] });
}
```