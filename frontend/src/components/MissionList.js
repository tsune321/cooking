'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'

const MissionList = () => {
    // `/api/missions` からデータを取得
    const { data, error } = useSWR('/api/missions', () =>
        axios
            .get('/api/missions')
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
            {data.missions?.map(mission => (
                <li
                    key={mission.id}
                    className={
                        mission.is_completed ? 'line-through text-gray-500' : ''
                    }>
                    {mission.mission}
                </li>
            ))}
        </ul>
    )
}

export default MissionList
