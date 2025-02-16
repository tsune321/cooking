'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState({ name: '', description: '', icon: '' });
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newIcon, setNewIcon] = useState(null);

  useEffect(() => {
    // ログインユーザーの情報を取得
    axios.get('/api/user')
      .then(response => {
        setUser(response.data);
        setNewName(response.data.name);
        setNewDescription(response.data.description);
      })
      .catch(error => {
        console.error('ユーザー情報の取得に失敗しました', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newName);
    formData.append('description', newDescription);
    if (newIcon) formData.append('icon', newIcon);

    try {
      // プロフィールの更新をリクエスト
      const response = await axios.put('/api/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data);
      alert('プロフィールが更新されました');
    } catch (error) {
      console.error('プロフィールの更新に失敗しました', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>プロフィール編集</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="名前を入力"
          />
        </div>
        <div>
          <label>説明</label>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="自分についての説明"
          />
        </div>
        <div>
          <label>アイコン</label>
          <input
            type="file"
            onChange={(e) => setNewIcon(e.target.files[0])}
          />
          {user.icon && <img src={`/storage/icons/${user.icon}`} alt="Current Icon" />}
        </div>
        <button type="submit">更新する</button>
      </form>
    </div>
  );
}
