'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'

const ShowGold = () => {
    // `/api/status` からデータを取得
    const { data, error } = useSWR('/api/status', () =>
        axios
            .get('/api/status')
            .then(res => res.data) // LaravelのJSON構造をそのまま取得
            .catch(error => {
                console.error(error)
                return null // エラー時は null を返す
            }),
    )

    if (error) return <p>An error has occurred.</p>
    if (!data) return <p>Loading...</p>

    return (
        <ul>
            {data.status && <li key={data.status.id}>{data.status.gold}</li>}
        </ul>
    )
}

export default ShowGold
