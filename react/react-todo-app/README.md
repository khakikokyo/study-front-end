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

## Map 메서도를 사용하여 할 일 목록 나열

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