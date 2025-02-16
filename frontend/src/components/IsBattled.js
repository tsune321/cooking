'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'

const IsBattled = () => {
    const { data, error, mutate } = useSWR('/api/status', async () => {
        try {
            const res = await axios.get('/api/status')
            return res.data
        } catch (error) {
            console.error('API取得エラー:', error)
            return null
        }
    })

    const [errorMessage, setErrorMessage] = useState(null)

    if (error) return <p>エラーが発生しました。</p>
    if (!data) return <p>読み込み中...</p>

    const handleBattle = async () => {
        try {
            // goldが50未満の場合はエラーメッセージを表示し、処理を中断
            if (data.status.gold < 50) {
                setErrorMessage('ゴールドが足りません！')
                return
            }

            // バトル前にAPIにリクエストを送って、ゴールドを減らす処理を行う
            const response = await axios.put('/api/status/battle')

            if (response.status === 200) {
                // バックエンドから返ってきた最新のデータを即座に反映
                mutate({ ...data, status: response.data.status })  // mutateで状態を更新
                setErrorMessage(null)  // エラーメッセージをクリア
            } else if (response.data.error) {
                setErrorMessage(response.data.error)  // エラーメッセージ
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error)
            } else {
                console.error('バトル状態の更新に失敗:', error)
                setErrorMessage('バトル処理に失敗しました。')
            }
        }
    }

    return (
        <div>
            <p>バトルステータス: {data.status?.is_battled ? 'バトル済み' : '未バトル'}</p>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {!data.status?.is_battled && (
                <button onClick={handleBattle}>
                    バトルする
                </button>
            )}
        </div>
    )
}

export default IsBattled
