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