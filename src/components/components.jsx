import { useState } from 'react';
import { signup } from 'src/api/API';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');


  return (
    <div>
      <h1>註冊 Signup</h1>
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
