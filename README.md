# socar 기업 과제
## 실행 방법
```
client
npm i
npm start

server
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```
**route path는 `/list`입니다.**


## 구현 화면 
![screenshot_socar](https://user-images.githubusercontent.com/96907766/206612972-18b1557d-673d-4804-b61e-bb45b5bda8f7.gif)

## 구현사항

- 특가 차량 캐러셀 구현
    - 마우스 + 터치 이벤트 동작
    - 특가 차량 클릭 시 해당 차량 위치로 스크롤 이동
- 모든 차량 더보기 구현
- 차량 리스트 모달 구현

## 구현 내용

### 특가 차량 캐러셀 구현

- 전체 리스트에서 특가 태그가 붙은 차량만을 filter로 걸러 보내주는 hook을 만들어 view와 데이터 로직를 분리하였습니다.
- 특가 차량 캐러셀의 전체 container 너비를 transform:translate로 계산하여 움직였습니다.

### 마우스 + 터치 이벤트 동작

- 마우스 이벤트와 터치 이벤트는 각각 onMouse/onTouch로 구분해 동작하도록 하였습니다.
- 마우스 이벤트와 터치 이벤트를 구분하기 위해 event._reactName으로 접근하여 hook을 구현했습니다.

```jsx
const getClientX = (event) => {
  return event._reactName === "onTouchStart"
    ? event.touches[0].clientX
    : event._reactName === "onTouchMove" || event._reactName === "onTouchEnd"
    ? event.changedTouches[0].clientX
    : event.clientX;
};
```

- 처음 클릭한 위치와 드래그된 위치를 계산하여 좌우 슬라이드를 구현했습니다.
- 클릭과 슬라이딩 이벤트를 구분하기 위해서 드래그 거리(distance)를 계산하여 0인 경우 클릭으로 설정하였습니다.
- 클릭시 타켓 element를 벗어나도(onMouseLeave) 값을 초기화하여 에러를 방지하였습니다.

### 특가 차량 클릭 시 해당 차량 위치로 스크롤 이동

- useRef로 타겟을 지정하고 scrollIntoView로 스크롤을 이동시켰습니다.
- 특가 차량과 모든 차량은 형제 컴포넌트이기 때문에 cumstom hook을 만들어 props로 전달해 상태를 변경시켰습니다.
- ref는 forwardRef를 이용해 props로 전달하였습니다.
- 현재 차량에 렌더되지 않은 특가 차량을 클릭한 경우, 클릭한 차량의 id와 인덱스를 이용해 원하는 타겟이 나오는 페이지를 계산하여 렌더링 해준 후 스크롤을 이동시켰습니다.

### 모든 차량 더보기 구현

- 전체 데이터에서 현재 페이지와 perpage를 받아 페이지별로 인덱싱을 해주는 hook을 구현했습니다.
- 마지막 페이지에 도달하였을 경우 더보기 버튼은 보이지 않도록 구현하였습니다.

### 차량 리스트 모달 구현

- 모달 포탈은 createPortal을 이용해 현재가 아닌 다른 dom을 참조해 구현했습니다.
- 모달 컴포넌트는 component 폴더로 분리하여 관리하였습니다.
- dim 영역은 스크롤을 방지하기 위해 `body` 태그의 css를 변경했습니다. `position`을 `fixed`로 하고, `top`의 위치를 현재 스크롤 위치로 설정한 뒤 `overflow-y: scroll; width: 100%;` 을 추가 지정하면 스크롤바로 인해 배경의 위치가 움직이지 않고 스크롤을 방지 시킬 수 있었습니다.
- `useEffect`를 사용해 css를 변경하며, 모달이 사라질 때에는 `useEffect`의 `return`을 사용해 `body`의 `cssText`를 리셋시킨 다음 `window,scroll`을 이용해 현재 스크롤 위치로 이동시킵니다.

- dim 영역 클릭시 모달창을 닫기 위해 ref로 모달을 참조하고 클릭 이벤트 `mousedown`가 발생시, `event.target`이 `ref`에 저장된 요소를 포함하는지 확인합니다. 포함되지 않는 다면 모달을 닫습니다.


# web-frontend
## 주의사항

- 🔥 **최종 코드 제출은 main 브랜치에 올려주세요. main 브랜치에 merge가 안되어 있으면 불합격 입니다.** 🔥
- 🔥 **node.js 버전은 최소 16이상 ~ LTS 버전(현재 18.12.0)을 사용해주세요.** 🔥

## 기술스택

- React
- JavaScript or TypeScript
  - TypeScript 사용 시
  ```
    npm install --save typescript @types/node @types/react @types/react-dom @types/jest
  ```
- 상태관리는 필요하다면 외부 패키지(redux, mobx, recoil, zustand, jotai 등) 사용 가능
- 그 외 ui, event관련 패키지 (modal, chip button, scroll, animation등) 사용불가
- styling을 위한 css-in-js(styled-component, emotion 등) 형태의 패키지는 사용가능
- 라우팅을 위해 react-router는 사용가능

## 과제 내용

- 안내 메일에 첨부되어 있는 문서링크

## local에서 json-server 실행 방법

```
json-server db.json --routes routes.json --port 8080
```

## api url

- 차량 전체 리스트: `http://localhost:8080/carClasses`
- 차량 상세 정보: `http://localhost:8080/carClasses/${carClassId}`
