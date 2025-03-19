import { useAuthStore } from "../store/authStore"

export const HomePage = () => {
  const {logout}=useAuthStore();
  return (
    <div className=" flex items-center justify-between p-6">
      <div className="m-5 text-3xl text-red-500 p-4 font-bold">HomePage</div>
      <button className="p-2 rounded bg-cyan-900 text-slate-300 font-bold mr-4" onClick={logout}>Logout</button>
    </div>
  )
}

