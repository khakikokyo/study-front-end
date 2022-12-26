# React 설치를 위해서 필요한 것들(Node.js & Visual Studio Code)
## Node.js

### Node.js 란?

리액트 프로젝트를 만들기 위해서 Node.js와 npm을 먼저 설치해야 하는데 Node.js를 받을 때 npm도 같이 설치된다.<br/>
Node.js란 크롬 V8 자바스크립트 엔진으로 빌드한 자바스크립트 런타임으로서, **웹 브라우저 환경이 아닌 곳에서도** 자바스크립트를 사용하여 연산할 수 있다.

### React 설치 시 Node.js가 필요한 이유

리액트 앱은 웹 브라우저에서 실행되는 코드여서 Node.js와 직접적인 연관은 없지만, 프로젝트를 개발하는데 주요 도구들이 Node.js를 사용하기 때문에 필요하다.<br/>
이 때 사용하는 개발 도구는 바벨, 모듈화된 코드를 한 파일로 합치고 코드를 수정할 때 마다 웹 브라우저를 리로딩하는 등 여러 기능을 지는 웹팩 등이 있다.

### Node.js 설치 방법

1. 검색 엔진에서 [Node.js](https://nodejs.org/ko/) 검색
2. 다운로드 > 안정적, 신뢰도 높은 버전으로 설치
3. 설치 확인
```bash
$ node -v
```

## Visual Studio Code

### Visual Studio Code란?

비주얼 스튜디오 코드(Visual Studio Code)는 마이크로소프트(Microsoft)에서 오픈소스로 개발하고 있는 소스 코드 에디터이다. 웹 기반 기술들로 데스크톱 애플리케이션을 만들 수 있는 깃허브(GitHub)의 일렉트론(Electron)을 기반으로 만들어져 맥OS(macOS), 리눅스(Linux), 윈도우(Windows) 등 메이저 운영체제를 모두 지원하고 있다. 마이크로소프트의 통합 개발 환경(IDE) 비주얼 스튜디오(Visual Studio)와 이름이 비슷하지만 따로 개발되고 있으며 IDE보다는 코드 에디터에 가깝다. MIT 라이센스로 오픈소스로 공개되어 있으며, 무료로 사용할 수 있다.

### Visual Studio Code 설치 방법

1. 검색 엔진에서 [visual studio code](https://code.visualstudio.com/) 검색
2. 다운로드

# GitHub Pages 배포

```bash
$ npm i gh-pages --save -dev
```

1. 홈페이지 url 작성

    https://{깃허브 유저 이름}.github.io{저장소 이름}/

```javascript
// package.json
{
  "name": "react-netfilx",
  "version": "0.1.0",
  "private": true,
  "homepage": "https://khakikokyo.github.io/react-netflix", // 추가
  [...]
}
```

2. 배포를 위한 script 추가

```javascript
// package.json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "predeploy": "npm run build", // 추가
  "deploy": "gh-pages -d build", // 추가
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
```

3. react router dom 기본 경로 변경

  기본 경로: https://~~~/react-netflix (basename)

```javascript
// index.js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="react-netflix">
    <App />
  </BrowserRouter>
);
```

# 리액트 앱 설치 방법

### 웹팩이란?

웹팩은 오픈 소스 자바스크립트 모듈 번들러로써 여러개로 나누어져 있는 파일들을 하나의 자바스크립트 코드로 압축하고 최적화하는 라이브러리이다.

### 웹팩(Webpack)의 장점은?

1. 여러 파일의 자바스크립트 코드를 압축하여 최적화할 수 있기 때문에 로딩에 대한 네트워크 비용을 줄일 수 있다.
2. 모듈 단위로 개발이 가능하며, 가독성과 유지보수가 쉽다.

![webpack](./img/webpack-bundling.png)

### 바벨(Babel)이란?

최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해서 최신 자바스크립트 문법을 구형 브라우저에서도 돌 수 있게 변환 시켜주는 라이브러리이다.

### create-react-app

create-react-app을 사용하여 리액트를 설치하면 Babel이나 Webpack 설정이 이미 다 되어있기 때문에 많은 시간이 걸리지 않고 리액트 앱을 시작할 수 있다.

1. 리액트 앱을 만들 폴더 생성
2. 터미널 실행

```
$ npx create-react-app ./
```

### npx란?

npx는 노드 패키지 실행을 도와주는 도구이다. 그래서 create-react-app이란 npm 레지스트리에 있는 패키지를 해당 폴더에서 실행해서 리액트를 설치해 준다.

- npm 레지스트리(registry): 라이브러리들이 저장된 곳

# SPA(Single Page Application) 이란?

웹 사이트의 전체 페이지를 하나의 페이지에 담아 동적으로 화면을 바꿔가며 표현

# JSX(Javascript syntax extension)

JSX는 자바스크립트의 확장 문법이다. 리액트에서는 이 JSX를 이용해서 화면에서 UI가 보이는 모습을 나타내준다.<br/>
JSX를 이용하면 UI를 나타낼 때 자바스크립트(logic)와 HTML 구조(markup)를 같이 사용할 수 있기 때문에 기본 UI에 데이터가 변하는 것들이나 이벤트들이 처리되는 부분을 더욱 쉽게 구현할 수 있다.<br/>
자바스크립트 안에서 UI 작업을 하는데 편리하여 React를 사용할 때는 대부분 JSX를 사용한다.

# JSX Key 속성

리액트에서 요소의 리스트를 나열할 때는 Key를 넣어줘야 한다.<br/>
Key는 React가 변경, 추가 또는 제거된 항목을 식별하는데 도움이 된다. 요소에 안정적인 ID를 부여하려면 배열 내부의 요소에 키를 제공해야 한다.

### Key에는 유니크한 값을 넣어 준다.

index도 0부터 시작해서 유니크한 값을 가지지만 만약 리스트가 추가되거나 제거되면 해당 리스트들의 key 값도 바뀌게 된다.

# React State

컴포넌트의 렌더링 결과물에 영향을 주는 데이터를 갖고 있는 객체. state가 변경되면 컴포넌트는 리렌더링(Re-rendering) 된다. 또한 state는 컴포넌트 안에서 관리된다.

# 전개 연산자(Spread Operator) [...]

전개 연산자는 ECMAScript6(2015)에서 새롭게 추가되었으며, 특정 객체 또는 배열의 값을 다른 객체, 배열로 복제하거나 옮길 때 사용한다.

```javascript
// 배열 조합
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const arrWrap = arr1.concat(arr2);
console.log(arrWrap) // [1, 2, 3, 4, 5, 6]

// 전개 연산자 활용
const arrWrap = [...arr1, ...arr2];
console.log(arrWrap) // [1, 2, 3, 4, 5, 6]

// 객체 조합
const obj1 = {
  a: "A",
  b: "B"
};
const obj2 = {
  c: "C",
  d: "D"
}

const objWrap = {obj1, obj2};
console.log(objWrap);

// 객체 자체가 들어간다.
{
  obj1: {
    a: "A",
    b: "B"
  },
  obj2: {
    c: "C",
    d: "D"
  }
}

// 전개 연산자 활용
const objWrap = {...obj1, ...obj2};
console.log(objWrap);

// 객체 자체가 아닌 각각의 값이 할당된다.
{
  a: "A",
  b: "B",
  c: "C",
  d: "D"
}
```

기존 배열을 보존

```javascript
const arr1 = [1, 2, 3];

// 원본 배열까지 역순으로 변경
const arr2 = arr1.reverse();
console.log(arr1); // [3, 2, 1]
console.log(arr2); // [3, 2, 1]

// 원본 배열 유지
const arr2 = [...arr1].reverse();
console.log(arr1); // [1, 2, 3]
console.log(arr2); // [3, 2, 1]
```

# React Hooks

## React Hooks는 무엇인가?

React Hooks는 ReactConf 2018 에서 발표된, class 없이 state를 사용할 수 있는 새로운 기능이다.

## React Hooks가 필요한 이유

항상 기술은 그 전의 것에 불편함이나 문제점을 해결하기 위해 발전한다.<br/>
그와 같이 React Hooks도 주로 Class Component로 사용되어온 React에 느껴왔던 불편함이나 문제점들을 해결하기 위해서 개발되었다. 원래 React는 Class Component를 사용하고 React Hooks는 Functional Component를 사용했다.

### React Component

Class Component | Functional Component
:--:|:--:
더 많은 기능 제공 | 더 적은 기능 제공
더 긴 코드 양 | 짧은 코드 양
더 복잡한 코드 | 더 심플한 코드
더딘 성능 | 더 빠른 성능

```javascript
// Class Component
import React, { Component } from 'react';

export default class Hello extends Component {
  render() {
    return (
      <div>
        Hello!
      </div>
    )
  }
}
```

```javascript
// Functional Component
import React from 'raact';

function Hello() {
  return (
    <div>
      Hello!
    </div>
  )
}
```

### 리액트의 생명주기(Lifecycle)

![Lifecycle](./img/lifecycle.png)

1. mount(생성)
2. update(재렌더링)
3. unmount(삭제)

생명주기를 함수형 컴포넌트에서는 사용을 하지 못했기 때문에 함수형 컴포넌트가 더 간결하고 빠르더라도 클래스형 컴포넌트를 사용했으나, **React 16.8 Hooks 업데이트**로 함수형 컴포넌트에서도 생명주기를 사용할 수 있기에 데이터를 가져오고 컴포넌트를 시작하자마자 API도 호출하는 등의 많은 부분을 할 수 있게 되었다.

### useEffect

```javascript
// 1. 재렌더링마다 코드를 실행
useEffect(function() {});

// 2. mount시 1회 코드를 실행
useEffect(function() {}, []);

// 3. unmount시 1회 코드를 실행
useEffect(function() {
  return function() {}
});

// 4. 특정 state 변경시에만 실행
useEffect(function() {}, [state명]);
```

Class Component 에서는 생명주기를 이용할 때 componentDidMount, componentDidUpdate, componentWillUnmount 이렇게 다르게 처리를 해주지만, 리액트 훅을 사용하면 useEffect 안에서 다 처리를 해줄 수 있다.

## state & props

### state

1. 해당 컴포넌트 내부에서 데이터를 전달
2. state는 변경 가능(mutable)
3. state가 변하면 re-render

### props (properties)

1. props는 상속하는 부모 컴포넌트로부터 자녀 컴포넌트에 데이터 등을 전달하는 방법
2. props는 읽기 전용(immutable)으로 자녀 컴포넌트 입장에서는 변하지 않는다. (변하게 하고자 하면 부모 컴포넌트에서 state를 변경시켜줘야 한다.)

# 구조 분해 할당 (Destructuring)

배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 Javascript 표현식

# TailWindCss

HTML 안에서 CSS 스타일을 만들 수 있게 해주는 CSS 프레임워크

### CSS 프레임워크란?

CSS 프레임워크는 레이아웃 및 여러 컴포넌트 구성, 브라우저 호환성을 보장하는데 소요되는 시간을 최소화하기 위해 여러 웹 개발/디자인 프로젝트에 적용할 수 있는 CSS 파일 모음이다.<br/>
더 빠르게 애플리케이션을 스타일링 하는데 도움을 준다.

### CSS Framework 종류 for React JS

1. Material UI
2. React Bootstrap
3. Semantic UI
4. Ant Design
5. Materialize
6. ...

### Tailwind CSS 장점

[Tailwind CSS](https://tailwindcss.com/)는 부트스트랩과 비슷하게 m-1, flex와 같이 미리 세팅된 Uitility Class를 활용하는 방식으로 HTML에서 스타일링을 할 수 있다.

1. 그러기에 빠른 스타일링 작업이 가능하며,
2. class 혹은 id 명을 작성하기 위한 고생을 하지 않아도 된다.
3. 유틸리티 클래스가 익숙해지는 시간이 필요할 수 있지만 IntelliSense 플러그인이 제공되서 금방 익숙해 질 수 있다.

### CRA에 [TailWindCSS](https://tailwindcss.com/docs/guides/create-react-app) 적용하기

```bash
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```

tailwind.config.js

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

index.css

```javascript
@tailwind base;
@tailwind components;
@tailwind utilities;
```

# 리액트의 불변성

불변성이란 사전적 의미로는 값이나 상태를 변경할 수 없는 것을 의미한다.

## 자바스크립트 타입을 통한 불변성 의미

원시 타입은 불변성(immutable)을 가지고 있고 참조 타입은 불변성을 가지고 있지 않다.(mutable)

- 원시 타입: Boolean, String, Number, null, undefined, Symbol
- 참조 타입: Object, Array

기본적으로 Javascript는 원시 타입에 대한 참조 및 값을 저장하기 위해 Call Stak 메모리 공간을 사용하지만 참조 타입의 경우 Heap이라는 별도의 메모리 공간을 사용한다. 이 경우 Call Stack은 개체 및 배열 값이 아닌 메모리에만 Heap 메모리 참조 ID를 값으로 저장한다.

- 원시 타입: 고정된 크기로 Call Stack 메모리에 저장, 실제 데이터가 변수에 할당
- 참조 타입: 데이터 크기가 정해지지 않고 Call Stack 메모리에 저장, 데이터의 값이 Heap에 저장되며 변수에 Heap 메모리의 주소값이 할당

### 불변성을 지겨야 하는 이유

1. 참조 타입에서 객체나 배열의 값이 변할 때 원본 데이터가 변경되기에 이 원본 데이터를 참조하고 있는 다른 객체에서 예상치 못한 오류가 발생할 수 있어서 프로그래밍의 복잡도가 올라간다.
2. 리액트에서 화면을 업데이트할 때 불변성을 지켜서 값을 이전 값과 비교해서 변경된 사항을 확인한 후 업데이트하기 때문에 불변성을 지켜줘야 한다.

### 불변성을 지키는 방법

참조 타입에서는 값을 바꿨을 때 Call Stack 주소 값은 같은데 Heap 메모리 값만 바꿔주기에 불변성을 유지할 수 없었으므로 아예 새로운 배열을 반환하는 메소드를 사용하면 된다.

spread operator, map, filter, slice, reduce

원본 데이터를 변경하는 메소드: splice, push

# Styled Component

[Styled Component](https://styled-components.com/docs/basics)란 css-in-JS라고 하는 Javascript 파일 안에서 CSS를 처리할 수 있게 해주는 대표적인 라이브러리이다.

### 설치 방법

```bash
# with npm
$ npm install --save styled-components
```

```bash
# with yarn
$ yarn add styled-components
```

# React Router Dom

React Router DOM을 사용하면 웹 앱에서 동적 라우팅을 구현할 수 있다. 라우팅이 실행중인 앱 외부의 구성에서 처리되는 기존 라우팅 아키텍처와 달리 React Router DOM은 앱 및 플랫폼의 요구사항에 따라 컴포넌트 기반 라우팅을 용이하게 한다.

1. 라우팅: 사용자가 요청한 URL에 따라 해당 URL에 맞는 페이지를 보여주는 것
2. 리액트 라우터(React Router)
    - 사용자가 입력한 주소를 감지하는 역할을 하며, 여러 환경에서 동작할 수 있도록 여러 종류의 라우터 컴포넌트를 제공
    - 이중 가장 많이 사용하는 라우터 컴포넌트는 `BrowserRouter`와 `HashRouter`이다.
3. 종류
    - `BrowserRouter`: HTML5를 지원하는 브라우저의 주소를 감지
    - `HashRouter`: 해시 주소(http://aaa.com/#test)를 감지

## Single Page Application (SPA)

리액트는 SPA이기 때문에 하나의 index.html 템플릿 파일을 가지고 있다. 이 하나의 템플릿에 자바스크립트를 이용해서 다른 컴포넌트를 이 index.html 템플릿에 넣으므로 페이지를 변경해 주게 된다. 이때 이 React Router Dom 라이브러리가 새 컴포넌트로 라우팅/탐색을 하고 렌더링하는데 도움을 주게 된다.

## React Router Dom APIs

1. 중첩 라우팅(Nested Routes): 서브 경로 생성, React Router의 가장 강력한 기능 중 하나이다. 복잡한 레이아웃 코드를 어지럽힐 필요가 없다. 대부분의 레이아웃은 URL의 세그먼트에 연결되며 React Router는 이를 완전히 수용한다.

2. Outlet: 자식 경로 요소를 렌더링 하려면 부모 경로 요소에서 <Outlet>을 사용해야 한다. 이렇게 하면 하위 경로가 렌더링될 때 중첩된 UI가 표시될 수 있다. 부모 라우트가 정확히 일치하면 자식 인덱스 라우트를 렌더링하거나 인덱스 라우트가 없으면 아무것도 렌더링하지 않는다.

3. use Navigate: 경로를 바꿔준다. navigate('/home') => localhost:3000/home으로 이동

4. useParams: :style 문법을 path 경로에 사용하였다면 useParams()로 읽을 수 있다.

5. useLocation: 해당 Hooks는 현재 위치 객체를 반환한다. 현재 위치가 변경될 때마다 일부 side effect를 수행하려는 경우에 유용할 수 있다.

6. useRoutes: useRoutes Hooks는 Routes와 기능적으로 동일하지면 Route 요소 대신 Javascript 객체를 사용하여 경로를 정의한다. 이러한 객체는 일반 Route 요소와 동일한 속성을 갖지만 JSX가 필요하지 않다.

## useDebounce Custom Hooks
### Debounce

검색 입력을 할 때 결과가 나타날 때까지 시간이 걸리는 것을 debounce라는 함수에 의해서 제어를 할 수 있다. Debounce Function은 사용자가 설정한 시간 동안 타이핑을 멈출 때까지 keyup 이벤트 처리를 지연시킨다.

- Debounce의 장점

    1. UI 코드가 모든 이벤트를 처리할 필요가 없다.
    2. 서버로 전송되는 API 호출이 크게 줄어든다.
    3. 입력된 모든 문자를 처리하면 성능이 저하되는 것을 막을 수 있다.
    4. 백엔드에 불필요한 로드를 추가하지 않는다.

Input 창에 글씨를 쓸 때 onChange로 값을 받을 때 debounce를 사용하지 않으면 글자 하나하나가 변할 때마다 값을 바꾸지만 debounce를 사용하면 결과값만 얻을 수 있다.

# 테스트 주도 개발(Test Driven Development)

실제 코드를 작성하기 전에 테스트 코드를 먼저 작성하고, 그 테스트 코드를 pass 할 수 있는 실제 코드를 작성한다.

### TDD 장점

1. 디버깅 시간을 단축 할 수 있다.

    이는 유닛 테스팅을 하는 이점이기도 하다.

    예를 들면 사용자의 데이터가 잘못 나온다면 DB의 문제인지, 비즈니스 레이어의 문제인지 UI의 문제인지 실제 모든 레이러들을 전부 디버깅 해야하지만, TDD의 경우 자동화 된 유닛테스팅을 전재하므로 특정 버그를 손 쉽게 찾아낼 수 있다. 


2. 코드가 내 손을 벗어나기 전에 가장 빠르게 피드백 받을 수 있다.

    개발 프로세스에서는 보통 ‘인수 테스트’를 한다. 이미 배치된 시스템을 대상으로 클라이언트가 의뢰한 소프트웨어가 사용자 관점에서 사용할 수 있는 수준인지 체크하는 과정이다.

    이미 90% 이상 완성된 코드를 가지고 테스트하기 때문에, 문제를 발견해도, 정확하게 원인이 무엇인지 진단하기는 힘들다.

    하지만 TDD를 사용하면 기능 단위로 테스트를 진행하기 때문에 코드가 모두 완성되어 프로그래머의 손을 떠나기 전에 피드백을 받는 것이 가능하다.

3. 작성한 코드가 가지는 불안정성을 개선하여 생산성을 높일 수 있다.

    TDD를 사용하면, 코드가 내 손을 떠나 사용자에게 도달하기 전에 문제가 없는지 먼저 진단 받을 수 있다. 그러므로 코드가 지닌 불안정성과 불확실성을 지속적으로 해소해준다.

4. 재설계 시간을 단축 할 수 있다.

    테스트 코드를 먼저 작성하기 때문에 개발자가 지금 무엇을 해야하는지 분명히 정의하고 개발을 시작하게 된다. 또한 테스트 시나리오를 작성하면서 다양한 예외사항에 대해 생각해볼 수 있다. 이는 개발 진행 중 소프트웨어의 전반적인 설계가 변경되는 일을 방지할 수 있다.

5. 추가 구현이 용이하다.

    개발이 완료된 소프트웨어에 어떤 기능을 추가할 때 가장 우려되는 점은 해당 기능이 기존 코드에 어떤 영향을 미칠지 알지 못한다는 것이다. 하지만 TDD의 경우 자동화된 유닛 테스팅을 전제하므로 테스트 기간을 획기적으로 단축시킬 수 있다.

### TDD 단점

1. 가장 큰 단점은 바로 생산성의 저하이다. 

    개발 속도가 느려진다고 생각하는 사람이 많기 때문에 TDD에 대해 반신반의 한다. 왜냐하면 처음부터 2개의 코드를 짜야하고, 중간중간 테스트를 하면서 고쳐나가야 하기 때문이다. TDD 방식의 개발 시간은 일반적인 개발 방식에 비해 대략 10~30% 정도로 늘어난다. SI 프로젝트에서는 소프트웨어의 품질보다 납기일 준수가 훨씬 중요하기 때문에 TDD 방식을 잘 사용하지 않는다.

2. 이제까지 자신이 개발하던 방식을 많이 바꿔야 한다. 

    몸에 체득한 것이 많을 수록 바꾸기가 어렵다. 오히려 개발을 별로 해보지 않은 사람들에겐 적용하기가 쉽다.

3. 구조에 얽매힌다.

    TDD로 프로젝트를 진행하면서 어려운 예외가 생길 수 있는데 그것 때문에 고민하는 순간이 찾아오게 된다.
    
    원칙을 깰 수는 없고 꼼수가 있기는 한데 그 꼼수를 위해서 구조를 바꾸자니 이건 아무래도 아닌 것 같고, 테스트는 말 그대로 테스트일 뿐 실제 코드가 더 중요한 상황인데도 불구하고 테스트 원칙 때문에 쉽게 넘어가지 못하는 그런 경우다.

# NextJS

React의 SSR(server side rendering)을 쉽게 구현할 수 있게 도와주는 간단한 프레임워크이다. (리액트는 라이브러리)

리액트로 개발할 때 SPA(Single Page Application)을 이용하여 CSR(Client Side Rendering)을 하기 때문에 좋은 점도 있지만 단점도 있는데 그 부분이 바로 검색엔진 최적화(SEO) 부분이다. Client Side Rendering을 하면 첫페이지에서 빈 html을 가져와서 JS파일을 해석하여 화면을 구성하기 때문에 포털 검색에 거의 노출될 일이 없다.

하지만 Next.js에서는 Pre-Rendering을 통해서 페이지를 미리 렌더링 하며 완성된 HTML을 가져오기 때문에 사용자와 검색 엔진 크롤러에게 바로 렌더링된 페이지를 전달할 수 있게 된다.

리액트에서도 SSR을 지원하지만 구현하기에 굉장히 복잡하기 때문에 Next.js를 통해서 이 문제를 해결한다.

### 설치 방법

```bash
$ npx create-next-app@latest
```

```bash
# ./ 현재 폴더 인에 설치
$ npx create-next-app@latest --typescript ./
```