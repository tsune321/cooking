import Header from '@/app/(app)/Header'
import ShowGold from '@/components/ShowGold'
import ShowBattleRate from '@/components/ShowBattleRate'
import IsBattled from '@/components/IsBattled'

const Status = () => {
  return (
      <>
          <Header title="ステータス" />
          <div className="py-12">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                        Gold: <ShowGold />&emsp;
                    </div>
                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                        Rate: <ShowBattleRate />&emsp;
                    </div>
                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                        Battle: <IsBattled />&emsp;
                    </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Status
