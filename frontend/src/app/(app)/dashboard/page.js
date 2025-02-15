'use client'
import Header from '@/app/(app)/Header'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules' 
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// カルーセルにする画像のリスト//
const images = ['/dummy/1.jpg', '/dummy/2.jpg', '/dummy/3.jpg', '/dummy/4.jpg', '/dummy/5.jpg']

const Dashboard = () => {
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
