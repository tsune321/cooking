'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth';

const Sns = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('おすすめ');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim() || !image) return;

        const newPost = {
            id: Date.now(),
            userName: user?.name || '匿名',
            comment,
            image: preview,
            liked: false,  // いいね状態を追跡
        };

        setPosts([newPost, ...posts]);
        setComment('');
        setImage(null);
        setPreview(null);
    };

    const handleLike = (postId) => {
        setPosts(posts.map((post) => 
            post.id === postId ? { ...post, liked: !post.liked } : post
        ));
    };

    return (
        <div className="py-20 flex">

            {/* サイドバー */}
            <div className="py-20 fixed top-0 left-0 w-1/4 p-4 bg-gray-200 h-screen">
                <h2 className="text-lg font-bold mb-4">カテゴリ</h2>
                {['おすすめ', '新着', '人気', 'フォロー中'].map((category) => (
                    <button
                        key={category}
                        className={`block w-full text-left p-2 rounded-lg ${selectedCategory === category ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* メインコンテンツ */}
            <div className="w-2/4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-center mb-6">SNS 投稿</h1>

                        {/* 入力 */}
                        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                            <textarea
                                className="w-full p-2 border rounded mb-4"
                                placeholder="コメントを書く..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
                            {preview && (
                                <div className="mb-4">
                                    <Image src={preview} alt="Preview" width={300} height={200} className="rounded" />
                                </div>
                            )}
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full" disabled={!image}>投稿</button>
                        </form>

                        {/* 出力(投稿一覧) */}
                        <div className="mt-6">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-gray-100 p-4 rounded-lg mb-4">
                                    <p className="font-semibold">{post.userName}</p>
                                    <p className="mb-2">{post.comment}</p>
                                    {post.image && <Image src={post.image} alt="Post" width={300} height={200} className="rounded" />}
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className={`px-4 py-2 rounded-lg ${post.liked ? 'bg-red-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                                        >
                                            {post.liked ? '♡' : '♡'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sns;
