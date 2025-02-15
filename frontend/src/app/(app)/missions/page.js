import Header from '@/app/(app)/Header';
import MissionList from '@/components/MissionList'; // インポート名を修正

export const metadata = {
  title: 'ミッション',
}

const Mission = () => {
  return (
      <>
          <Header title="ミッション" />
          <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                      <div className="p-6 bg-white border-b border-gray-200">
                          <h1>ミッション</h1>
                          <MissionList />
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Mission