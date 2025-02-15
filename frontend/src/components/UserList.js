'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'

const UserList = () => {
    const { data, error } = useSWR('/api/users', () =>
        axios
            .get('/api/users')
            .then(res => res.data) // LaravelのJSON構造をそのまま取得
    )

    if (error) return 'An error has occurred.'
    if (!data) return 'Loading...'

    return (
        <ul>
            {data.user?.map(user => ( // `data.user` を参照
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    )
}

export default UserList
