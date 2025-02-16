'use client'

const Battle = () => {
    return (
        <div className="py-20">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">

                        {/* cookkingのロゴ */}
                        <div className="flex justify-center items-center mt-4">
                            <img
                                src="/dummy/cookking.png"
                                alt="Battle Image"
                                className="w-96 h-auto"
                            />
                        </div>

                        {/* 画像の下に枠（背景を黄色っぽく） */}
                        <div className="relative w-full max-w-4xl mx-auto aspect-[3/2] bg-yellow-100 flex flex-col justify-center items-center rounded-lg shadow-md">

                            {/* Match!! の画像を上部に配置 */}
                            <div className="mb-4">
                                <img
                                    src="/dummy/match.png"
                                    alt="Match Image"
                                    className="w-64 h-auto"
                                />
                            </div>

                            {/* アイコンと VS 表示 */}
                            <div className="flex justify-center items-center">
                                {/* 自分のアイコン */}
                                <div className="flex flex-col items-center mx-16">
                                    <img
                                        src="/dummy/icon1.png"
                                        alt="My Icon"
                                        className="w-64 h-64 rounded-full border-8 border-gray-400"
                                    />
                                    <p className="mt-4 font-bold text-2xl">あなた</p>
                                </div>

                                {/* VS 表示 */}
                                <p className="text-4xl font-bold mx-8">VS</p>

                                {/* 対戦相手のアイコン */}
                                <div className="flex flex-col items-center mx-16">
                                    <img
                                        src="/dummy/icon5.png"
                                        alt="Opponent Icon"
                                        className="w-64 h-64 rounded-full border-8 border-gray-400"
                                    />
                                    <p className="mt-4 font-bold text-2xl">対戦相手</p>
                                </div>
                            </div>

                        </div>

                        {/* お相手の投稿エリア */}
                        <div className="mt-8 w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                            {/* アイコン＋名前 */}
                            <div className="flex items-center mb-4">
                                <img
                                    src="/dummy/icon5.png"
                                    alt="Opponent Icon"
                                    className="w-12 h-12 rounded-full border-2 border-gray-400"
                                />
                                <p className="ml-4 font-bold text-lg">対戦相手</p>
                            </div>

                            {/* 投稿内容 */}
                            <p className="text-gray-800 mb-4">からあげつくりました！</p>

                            {/* 画像 */}
                            <img
                                src="/dummy/karaage.jpg"
                                alt="Opponent's Dish"
                                className="w-full rounded-lg"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Battle
