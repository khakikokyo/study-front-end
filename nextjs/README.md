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

### NextJS 기본 파일 구조

1. pages

    - 해당 폴더 안에 페이지들을 생성
    - index.tsx가 처음 "/" 페이지
    - _app.tsx는 공통되는 레이아웃을 작성한다. 모든 페이지에 공통으로 들어가는걸 넣어주려면 여기에 넣어주면 된다. (url을 통해 특정 페이지에 진입하기 전 통과하는 인터셉터 페이지이다.)
    - 만약 about이라는 페이지를 만들려면 pages 폴더 안에 about.tsx를 생성해 주면 된다.

2. public

    - 이미지 같은 정적(static) 에셋들을 보관

3. styles

    - 스타일링을 처리해 주는 폴더
    - 모듈(module) css는 컴포넌트 종속적으로 스타일링하기 위한 것이며, 확장자 앞에 module을 붙여줘야 한다.

4. next.config.js

    - Nextjs는 웹팩을 기본 번들러로 사용한다.
    - 웹팩에 관한 설정들을 해당 파일에서 해줄 수 있다.

### Pre-rendering

NextJS는 모든 페이지를 pre-render 한다. 이 pre-render 한다는 의미는 모든 페이지를 위한 HTML을 Client 사이드에서 자바스크립트로 처리하기 전, "사전에" 생성한다는 것이다. 이렇게 하기 때문에 SEO 검색엔진 최적화가 좋아진다.