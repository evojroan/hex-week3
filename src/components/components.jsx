import { useState, useEffect } from 'react';
import {
  signup,
  signin,
  checkout,
  signout,
  getTodos,
  addTodo,
  deleteTodo
} from 'src/api/API';

//Signup 元件
export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div>
      <h3>註冊 SignUp</h3>
      請輸入電子郵件：
      <br />
      <input
        value={email}
        type='email'
        onChange={e => {
          setEmail(e.target.value);
        }}
        placeholder='請輸入電子郵件'
      />
      <br />
      請輸入密碼：
      <br />
      <input
        value={password}
        type='password'
        onChange={e => {
          setPassword(e.target.value);
        }}
        placeholder='請輸入密碼'
      />
      <br />
      請輸入使用者名稱：
      <br />
      <input
        value={nickname}
        type='text'
        onChange={e => {
          setNickname(e.target.value);
        }}
        placeholder='請輸入使用者名稱'
      />
      <br />
      <button onClick={() => signup({ email, password, nickname, setMessage })}>
        註冊
      </button>
      <br />
      回應：{message}
    </div>
  );
}

//signin 元件
export function Signin({ getToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  return (
    <div>
      <h3>登入 SignIn</h3>
      請輸入電子郵件：
      <br />
      <input
        value={email}
        type='email'
        onChange={e => {
          setEmail(e.target.value);
        }}
        placeholder='請輸入電子郵件'
      />
      <br />
      請輸入密碼：
      <br />
      <input
        value={password}
        type='password'
        onChange={e => {
          setPassword(e.target.value);
        }}
        placeholder='請輸入密碼'
      />
      <br />
      <button
        onClick={() => {
          signin({ email, password, setMessage, setToken, getToken }); //getToken 當成參數傳遞給 signin，才能確保先setToeken再 getToken
        }}>
        登入
      </button>
      <br />
      回應：{message}
    </div>
  );
}

//Checkout 元件
export function Checkout({ token }) {
  const [message, setMessage] = useState('');

  return (
    <div>
      <h3>檢查 Token 是否有效 Checkout</h3>
      Token 為：<span>{token}</span>
      <br />
      <button
        onClick={() => {
          checkout({ token, setMessage });
        }}>
        檢查
      </button>
      <br />
      檢查結果：
      {message}
    </div>
  );
}

//Signout 元件
export function Signout({ token }) {
  const [message, setMessage] = useState('');
  return (
    <div>
      <h3>登出 Sign Out</h3>
      Token 為：<span>{token}</span>
      <br />
      <button
        onClick={() => {
          signout({ token, setMessage });
        }}>
        登出
      </button>
      <br />
      結果：{message}
    </div>
  );
}

//Todolist 元件
export function Todolist({ token }) {
  //const dummytodos = ['寫作業', '倒垃圾', '洗衣服', '健身'];
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [todoEdit, setTodoEdit] = useState({});

  useEffect(() => {
    getTodos({ token, setTodos,todos });
  }, []);

  return (
    <div>
      Token:{token}
      <h3>Todolist</h3>
      請新增 Todo 事項
      <br />
      <input
        placeholder='請新增 Todo 事項'
        value={newTodo}
        onChange={event => {
          setNewTodo(event.target.value);
        }}
      />
      <button onClick={() => addTodo({ newTodo, token, setNewTodo,setTodos,todos })}>
        新增
      </button>
      <br />
      所有 Todo 事項：
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {item.content}
            <button>已完成</button>
            <button
              onClick={event => {
                deleteTodo(event.target);
              }}>
              刪除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
