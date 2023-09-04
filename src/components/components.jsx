import { useState, useEffect } from 'react';
import {
  signup,
  signin,
  checkout,
  signout,
  getTodos,
  addTodo,
  deleteTodo,
  editTodo,
  toggleDone
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
      Token 為：<span className='showToken'>{token}</span>
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
      Token 為：<span className='showToken'>{token}</span>
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
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [todoEdit, setTodoEdit] = useState({}); //收集所有編輯的事項

  useEffect(() => {
    getTodos({ token, setTodos });
  }, [token]);

  return (
    <div>
      
      
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
      <button
        onClick={() =>
          addTodo({ newTodo, token, setNewTodo, setTodos, todos })
        }>
        新增
      </button>
      <br />
      <h3>所有 Todo 事項：</h3>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {item.status ? '(已完成)' : '(未完成)'}
            <input
              type='checkbox'
              onClick={() => {
                toggleDone(item.id, { token, setTodos });
              }}
            />

            {item.status ? (
              <span style={{ textDecoration: 'line-through' }}>
                {item.content}
              </span>
            ) : (
              <span>{item.content}</span>
            )}

            <input
              type='text'
              placeholder='更新值'
              onChange={e => {
                setTodoEdit({
                  ...todoEdit, //在全部現有的 todoEdit 事項之餘(最當初是空的{})，
                  [item.id]: e.target.value //再增加 [item.id](計算屬性名稱): e.target.value。id 是新增事項時，API回傳提供的。todoEdit 收集暫存了所有的修改事項。
                });
              }}
            />
            <button
              onClick={() => {
                editTodo(item.id, {
                  token,
                  setTodos,
                  todos,
                  todoEdit,
                  setTodoEdit
                });
              }}>
              修改
            </button>
            <button
              onClick={() => {
                deleteTodo(item.id, { token, setTodos });
              }}>
              刪除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


