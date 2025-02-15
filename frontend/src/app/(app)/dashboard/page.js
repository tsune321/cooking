'use client'
import Header from '@/app/(app)/Header'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules' 
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useState } from 'react'
import MissionList from '@/components/MissionList'

// カルーセルにする画像のリスト//
const images = ['/dummy/1.jpg', '/dummy/2.jpg', '/dummy/3.jpg', '/dummy/4.jpg', '/dummy/5.jpg']

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
                                    modules={[Navigation, Pagination, Autoplay]}
                                    slidesPerView={1}
                                    pagination={{ clickable: true }}
                                    navigation
                                    loop={true}
                                    autoplay={{
                                        delay: 3500,
                                        disableOnInteraction: false,
                                    }}
                                >
                                    {images.map((src, index) => (
                                        <SwiperSlide key={index}>
                                            <Image src={src} layout="responsive" width={640} height={400} alt={`Slide ${index + 1}`} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* デイリーリーミッションの枠 */}
                            <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-700">Dayly Mission</h2>
                                <ul className="mt-4 space-y-4 text-gray-600">
                                    {missions.map((mission, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                            <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
                                            <div>
                                                <p className="font-semibold">{mission.title}</p>
                                                {/*<p className="text-sm">{mission.description}</p>*/}
                                                {mission.completed ? (
                                                    <p className="text-green-600 text-sm">Completed</p>
                                                ) : (
                                                    <button
                                                        onClick={() => handleCompleteMission(index)}
                                                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                                                        完了
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <MissionList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
