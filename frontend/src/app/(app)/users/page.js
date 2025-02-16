import Header from '@/app/(app)/Header'
import UserProfile from '@/components/UserProfile'

export const metadata = {
    title: 'Laravel - User',
}

const User = () => {
    return (
        <>
            <Header title="User" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h1>ユーザー情報</h1>
                            <UserProfile />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User