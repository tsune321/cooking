'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'

const UserProfile = () => {
    const { data, error } = useSWR('/api/users', () =>
        axios
            .get('/api/users')
            .then(res => res.data) // LaravelのJSON構造をそのまま取得
            .catch(error => {
                console.error(error)
                return null // エラー時にnullを返しておく
            }),
    )

    if (error) return <p>An error has occurred.</p>
    if (!data) return <p>Loading...</p>

    return (
        <ul>
            {data.user && <li key={data.user.id}>{data.user.name}</li>}
        </ul>
    )
}

export default UserProfile
