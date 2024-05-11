
import { ref } from "vue";

//authstore
import { useUserStore } from "@/stores/user";

//firebase
import { AUTH } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const firstLoad=()=>{
    const userStore=useUserStore();
    const loading=ref(true);

    onAuthStateChanged(AUTH,async(user)=>{
        if(user){
            await userStore.autosignin(user.uid);
        }

        loading.value=false;
    })
    return { loading };
}

