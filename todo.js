// Todo List 웹페이지 만들기
// 사용자에게 할 일 입력받기-> 로컬에 저장(새로고침해도 사라지지X)
// 그 리스트를 화면에 보여주기
// 삭제 기능 추가

const toDoForm = document.getElementById("toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("toDoList");

const TODOS_KEY = "todos";
let toDos = []; // 할일 저장할 배열

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // 로컬스토리지에 리스트 저장
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  // 리스트 추가하는 함수
  const li = document.createElement("li"); // li 태그 생성
  li.id = newTodo.id;
  const span = document.createElement("span"); // span 태그 생성
  span.innerText = newTodo.text + " "; // span 태그에 input창에 입력한 값 삽입
  const delbtn = document.createElement("button"); // button 태그 생성
  delbtn.innerText = "완료!";
  delbtn.addEventListener("click", deleteTodo);
  li.appendChild(span); // li의 자식에 span 연결
  li.appendChild(delbtn); // li의 자식에 delBtn 연결
  toDoList.appendChild(li); // toDoList의 자식에 li 연결
}

function handleSubmit(event) {
  // js가 발생한 이벤트를 인자 event로 준다
  event.preventDefault();
  const newTodo = toDoInput.value; // 비우기 전에, input의 현재 value를 새로운 변수 newTodo에 복사
  toDoInput.value = " "; // 엔터치면 input 비우기

  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };

  toDos.push(newTodoObj);
  paintToDo(newTodoObj); // 리스트 추가하는 paintToDo함수 호출
  saveToDos();
}

toDoForm.addEventListener("submit", handleSubmit); // toDoForm에서 submit에 handleSubmit 이벤트를 연결

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  // savedToDos가 로컬스토리지에 존재하면
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}