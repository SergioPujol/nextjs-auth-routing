import SignOut from "./components/SignOut";

export default function Home() {
  return (
    <main className="h-full">
        <div className="
          justify-center 
          items-center 
          flex
          h-full
        ">
          <div className="w-3/6">
            {/*Content*/}
            <SignOut />
          </div>
        </div>
    </main>
  )
}
