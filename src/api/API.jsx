//把所有 API 都集中在本檔案裡
import axios from 'axios';
const baseUrl = 'https://todolist-api.hexschool.io';

//如果字串太長，剪短
function shortString(str) {
  if (str.length >= 10) {
    return str.slice(0, 20) + '...';
  }
  return str;
}

//signup 功能
export async function signup({ email, password, nickname, setMessage }) {
  if (email.length == 0) {
    alert('請輸入電子郵件！');
  }
  if (password.length < 6) {
    alert('密碼請至少六個字元！');
  }
  if (nickname.length == 0) {
    alert('請輸入使用者名稱！');
  }
  try {
    const response = await axios.post(`${baseUrl}/users/sign_up`, {
      email,
      password,
      nickname
    });
    setMessage('註冊成功！' + JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    setMessage(error.message);
    throw new Error(error);
  }
}

//signin 功能
export async function signin({
  email,
  password,
  setMessage,
  setToken,
  getToken
}) {
  if (email.length == 0) {
    alert('請輸入電子郵件！');
  }
  if (password.length == 0) {
    alert('請輸入密碼！');
  }
  try {
    const response = await axios.post(`${baseUrl}/users/sign_in`, {
      email,
      password
    });
    const shortToken = shortString(JSON.stringify(response.data.token));
    setMessage('登入成功！' + shortToken);
    setToken(response.data.token);
    getToken(response.data.token); //確保能夠 getToken，以供其他元件使用

    return response.data;
  } catch (error) {
    alert('電子郵件或密碼錯誤！');
    setMessage(error.message);
    throw new Error(error);
  }
}

//checkout 功能
export async function checkout({ token, setMessage }) {
  try {
    const response = await axios.get(`${baseUrl}/users/checkout`, {
      headers: {
        authorization: token
      }
    });

    setMessage('Token 正確！' + JSON.stringify(response.data));
    console.log(response.data);

    // setMessage('檢查結果' + response);
  } catch (error) {
    setMessage('驗證失敗！' + error.message);
    throw new Error(error);
  }
}

//signout 功能
export async function signout({ token, setMessage }) {
  try {
    const response = await axios.post(
      `${baseUrl}/users/sign_out`,
      {},
      { headers: { authorization: token } }
    );
    setMessage('登出成功！' + JSON.stringify(response.data));
  } catch (error) {
    setMessage('登出失敗！' + error.message);
    throw new Error(error);
  }
}

//getTodos 功能
export async function getTodos({ token, setTodos }) {
  try {
    if (!token) {
      return;
    }
    const response = await axios.get(`${baseUrl}/todos`, {
      headers: {
        Authorization: token
      }
    });
    setTodos(response.data.data);

    console.log(response.data.data);
  } catch (error) {
    throw new Error(error);
  }
}

//addTodo 功能
export async function addTodo({ token, newTodo, setNewTodo, setTodos }) {
  if (!newTodo) {
    alert('請輸入新增事項！');
    return;
  }

  await axios.post(
    `${baseUrl}/todos`,
    { content: newTodo },
    { headers: { Authorization: token } }
  );
  setNewTodo('');
  getTodos({ token, setTodos });
}

//deleteTodo 功能
export async function deleteTodo(id, { token, setTodos }) {
  await axios.delete(`${baseUrl}/todos/${id}`, {
    headers: { Authorization: token }
  });
  getTodos({ token, setTodos });
}

// editTodo 功能
export async function editTodo(
  id,
  { token, setTodos, todos, setTodoEdit, todoEdit }
) {
  try {
    const todo = todos.find(todo => todo.id === id); //以 id 相符的方式指定所選的事項
    todo.content = todoEdit[id]; //所選事項的 content 被賦值("content" 這個 key 是 API 定義的，參閱API文件)，賦值的內容是 todoEdit 中，id 相符的事項
    if (todo.content == '') {
      alert('請輸入更新值！');
      return;
    }
    await axios.put(`${baseUrl}/todos/${id}`, todo, {
      headers: {
        Authorization: token
      }
    });
    getTodos({ token, setTodos });
    setTodoEdit({
      ...todoEdit,
      [id]: '' //只清空我剛剛按下修改按鈕的事項的內容，其他事項沒有清空，避免一併被清空。
    });
    console.log(todoEdit);
  } catch (error) {
    throw new Error(error);
  }
}

//toggleDone 功能
export async function toggleDone(id, { token, setTodos }) {
  try {
    const response = await axios.patch(
      `${baseUrl}/todos/${id}/toggle`,
      {},
      { headers: { authorization: token } }
    );
    console.log(response.data.status);
    getTodos({ token, setTodos });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
