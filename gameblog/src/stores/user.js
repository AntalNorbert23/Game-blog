import { defineStore } from "pinia";
import router from '@/router';

import { AUTH, DB } from "@/utils/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {getDoc, doc, setDoc, updateDoc} from 'firebase/firestore';


const DEFAULT_USER={
    uid:null,
    email:null,
    firstname:null,
    lastname:null,
    isAdmin:null
}

export const useUserStore=defineStore('user',{
    state:()=>({
        loading:false,
        user:DEFAULT_USER,
        auth:false
    }),
    getters:{

    },
    actions:{
        setUser(user){
            this.user={...this.user, ...user};
            this.auth=true;
        },
       
        async register(formData){
            try{    
                this.loading=true;

                //register user
                const response=await createUserWithEmailAndPassword(
                    AUTH,
                    formData.email,
                    formData.password
                );

                //add user to DB
                const newUser = {
                    uid: response.user.uid,
                    email:response.user.email,
                    isAdmin: false
                }
                await setDoc(doc(DB,'users',response.user.uid),newUser);

                this.setUser(newUser);

                //redirect user
                router.push({name:'dashboard'})
            }catch(error){
                throw new Error(errorCode(error.code));
            }finally{
                this.loading=false;
            }
        }
    }
})
