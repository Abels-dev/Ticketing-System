import {create} from 'zustand'
import axios from 'axios'
import {toast} from 'react-hot-toast'
export const useAuthStore=create((set)=>({
     user:null,
     isCheckingAuth:true,
     isSigningUp:false,
     isLoggingIn:false,
     signup:async(credentials)=>{
        set({isSigningUp:true})
        try {
            const response = await axios.post("/api/auth/signup", credentials);
            console.log(response.data);
            set({user:response.data.user,isSigningUp:false})
            toast.success("Account created successfully");
         } catch (error) {
             set({user:null,isSigningUp:false})
             toast.error(error.response.data.message||"Signup failed")
         }
     },
     login:async(credentials)=>{
          set({isLoggingIn:true})
          try {
              const response=await axios.post("/api/auth/login",credentials);
              set({user:response.data.user,isLoggingIn:false});
              toast.success("Logged in successfully");
          } catch (error) {
            set({user:null,isLoggingIn:false})
             toast.error(error.response.data.message||"Login failed")
          } 
     },
     logout:async()=>{
          try {
              await axios.post("/api/auth/logout");
              set({user:null});
              toast.success("Logged out successfully");
          } catch (error) {
              console.log(error.message);  
          }
     },
     checkAuth:async()=>{
           set({isCheckingAuth:true})
           try {
               const response=await axios.get("/api/auth/checkAuth")
               set({user:response.data.user,isCheckingAuth:false})
           } catch (error) {
                 console.log(error.message); 
                 set({user:null,isCheckingAuth:false})     
           } 
     }
}))     
