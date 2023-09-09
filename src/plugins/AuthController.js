import { ref } from 'vue'
import axios from 'axios'

export default function UserController(){ 
    const BaseURI = "http://127.0.0.1:8000/api/auth/"

    const errors = ref(null)

    const getLogin = async (username, password) => {
        try {
            let { data } = await axios.post(BaseURI+"login", {'username': username, 'password': password}, {headers: {'Accept': 'application/json'}})
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('permission', data.permissions)
            return { success: true }
        } catch (error) {
            errors.value = error
        }
    }

    return { 
        getLogin,
        errors
    }
} 