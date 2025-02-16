'use client'
import Header from '@/app/(app)/Header'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules' 
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade';
import { useState } from 'react'
import MissionList from '@/components/MissionList'

// カルーセルにする画像のリスト//
const images = ['/dummy/1.png', '/dummy/2.png', '/dummy/3.png', '/dummy/4.png']

// ミッションのデータをここで定義（descriptionは未使用）
const initialMissions = [
    { title: 'ログインしよう', description: 'Buy ingredients for the weekly recipes.' },
    { title: 'いいねを３回しよう', description: 'Prepare a healthy dinner for the week.' },
    { title: 'いいねを５つもらおう', description: 'Do a 30-minute workout to stay healthy.' },
    { title: 'バトルに参加しよう', description: 'Keep the kitchen tidy and organized.' },
]

const Dashboard = () => {
    const [missions, setMissions] = useState(initialMissions);

    const handleCompleteMission = (index) => {
        const newMissions = [...missions];
        newMissions[index] = { ...newMissions[index], completed: true };
        setMissions(newMissions);
    };

    return (
        <>
            {/* <Header title="Dashboard" /> */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You are logged in!
                            
                            {/* 枠を作成 */}
                            <div className="border-4 border-gray-300 p-4 rounded-lg shadow-lg">
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                                    slidesPerView={1}
                                    pagination={{ clickable: true }}
                                    navigation
                                    loop={true}
                                    autoplay={{
                                        delay: 4000,
                                        disableOnInteraction: false,
                                    }}
                                    effect="fade"
                                    speed={2000}
                                >
                                    {images.map((src, index) => (
                                        <SwiperSlide key={index}>
                                            <Image src={src} layout="responsive" width={640} height={400} alt={`Slide ${index + 1}`} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* デイリーリーミッションの枠 */}
                                <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold text-gray-700">Mission</h2>
                                    <ul className="mt-4 space-y-4 text-gray-600">
                                        <MissionList />
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
