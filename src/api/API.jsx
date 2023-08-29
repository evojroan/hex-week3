//把所有 API 都集中在本檔案裡
import axios from 'axios';
const baseUrl = 'https://todolist-api.hexschool.io';

//signup 功能
export async function signup({ email, password, nickname, setMessage }) {
  try {
    const response = await axios.post(`${baseUrl}/users/sign_up`, {
      email,
      password,
      nickname
    });

    return response.data;
  } catch (error) {
    console.error('註冊失敗！', error);
    setMessage(error.message);
    throw new Error(error);
  }
}
