import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { SignupPage } from "./pages/SignupPage"
import {LoginPage} from './pages/LoginPage'
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"
import { CreatePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
function App() {
  const {user,checkAuth,isCheckingAuth}=useAuthStore();
  useEffect(()=>{
      checkAuth();
  },[checkAuth])
  if(isCheckingAuth){
    return (
        <div className="h-screen bg-slate-400 w-full flex justify-center items-center">
           <div className="size-10 border-dotted border-4 border-cyan-950 rounded-full animate-spin"></div>
        </div>
    )
  }
  return (
    <>
       <Routes>
          <Route path="/" element={user?<HomePage/>:<Navigate to={"/signup"}/>}/>
          <Route path="/signup" element={(!user)?<SignupPage/>:<Navigate to={"/"}/>}/>
          <Route path="/login" element={(!user)?<LoginPage/>:<Navigate to={"/"}/>}/>
          <Route path="/create" element={user?<CreatePage/>:<Navigate to={"/signup"}/>}/>
          <Route path="/details/:id" element={user?<DetailPage/>:<Navigate to={"/signup"}/>}/>
       </Routes>
       <Toaster/>
    </>
  )
}

export default App
