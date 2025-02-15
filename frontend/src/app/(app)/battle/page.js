

const Battle = () => {
    return(
        <>
            <div className="py-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            {/* センターに配置するためのdiv */}
                            <div className="flex justify-center items-center mt-4">
                                <img
                                    src="/dummy/cookking.png" // 画像パスをここに設定
                                    alt="Battle Image"
                                    className="w-96 h-auto" // 画像のサイズを調整
                                />
                            </div>

                            {/* 画像の下に四角い枠 */}
                            <div className="mt-6 border-2 border-gray-400 p-6 rounded-lg">
                                {/* この中に他の要素を追加する予定 */}
                                <p className="text-center">ここにいろいろなコンテンツが入ります</p>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Battle