import {create} from "zustand";
import axios from "../lib/axios.js";
import {toast} from "react-hot-toast";


export const useUserStore = create((set, get) =>({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({name, email, password, confirmPassword}) => {
        set(({loading: true}))

        if(password !== confirmPassword){
            set(({loading: false}))
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axios.post("/auth/signup", {name, email, password})
            toast.success("Signup successfully")
            set({user: res.data.user, loading: false})
        } catch (error) {
            set(({loading: false}))
            toast.error(error.response.data.message || "Signup failed")
        }
    },



    login: async (email, password) => {
        set(({loading: true}))

        try {
            const res = await axios.post("/auth/login", {email, password})
            toast.success("Login successfully")
            set({user: res.data, loading: false})
        } catch (error) {
            set(({loading: false}))
            toast.error(error.response.data.message || "Login failed")
        }
    },


    logout: async (email, password) => {
        try {
            await axios.post("/auth/logout")
            toast.success("Logout successfully")
            set({user: null})
        } catch (error) {
            toast.error(error.response.data.message || "Login failed")
        }
    },


    checkAuth: async () => {
        set({checkingAuth: true})
        try {
            const response = await axios.get("/auth/profile");
            set({user: response.data, checkingAuth: false});
        } catch (error) {
            console.log(error.message);
            set({checkingAuth: false, user: null})
        }
    } 

}))