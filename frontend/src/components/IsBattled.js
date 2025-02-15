'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useState } from 'react'

const IsBattled = () => {
    // `/api/status` からデータを取得
    const { data, error, mutate } = useSWR('/api/status', async () => {
        try {
            const res = await axios.get('/api/status')
            return res.data
        } catch (error) {
            console.error('API取得エラー:', error)
            return null
        }
    })

    // エラーハンドリング
    if (error) return <p>エラーが発生しました。</p>
    if (!data) return <p>読み込み中...</p>

    const handleBattle = async () => {
        try {
            // API にリクエストを送って `is_battled` を true に更新
            await axios.put('/api/status/battle')

            // バトル状態をローカルで更新し、即時反映
            if (data.status) {
                data.status.is_battled = true
                mutate({ ...data }) // mutateで即時反映
            }
        } catch (error) {
            console.error('バトル状態の更新に失敗:', error)
        }
    }

    return (
        <div>
            <p>バトルステータス: {data.status?.is_battled ? 'バトル済み' : '未バトル'}</p>
            {!data.status?.is_battled && (
                <button onClick={handleBattle}>
                    バトルする
                </button>
            )}
        </div>
    )
}

export default IsBattled
