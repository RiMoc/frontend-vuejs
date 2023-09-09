import { ref } from 'vue'
import axios from 'axios'

export default function PermissionController() {
    const BaseURI = "http://127.0.0.1:8000/api/users"

    const errors = ref(null)

    const getUserList = async () => {
        try {
            let { data } = await axios.get(BaseURI, { headers: { 'Accept': 'application/json' } })
            return data
        } catch (error) {
            errors.value = error
        }
    }


    return { 
        getUserList,
        errors
    }
}