import getCurrentUser from "./actions/getCurrentUser";
import Avatar from "./components/Avatar";
import SignOut from "./components/SignOut";

export default async function Home() {

  const currentUser = await getCurrentUser()

  return (
    <main className="h-full">
        <div className="
          justify-center 
          items-center 
          flex
          h-full
        ">
          <div className="w-[400px] flex flex-col gap-4 items-center">
            {/*Content*/}
            <Avatar src={currentUser?.image}/>
            <SignOut />
          </div>
        </div>
    </main>
  )
}
