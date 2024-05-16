import { defineStore } from "pinia";
import router from '@/router';
import { useUserStore } from "./user";

import { DB } from "@/utils/firebase";

import { collection, getDoc, doc ,setDoc, 
    serverTimestamp,updateDoc,query,orderBy,getDocs,
    limit, startAfter,deleteDoc} from "firebase/firestore";



let articlesCol=collection(DB,'articles');

export const useArticleStore=defineStore('article', {
    state:()=>({
        homeArticles:'',
        adminArticles:'',
        adminLastVisible:'',
    }),
    getters:{},
    actions:{
     
        async addArticle(formData){
            try{
                //get user data(profile)
                const userStore=useUserStore();
                const user=userStore.getUserData;

                //post document in database
                const newArticle=doc(articlesCol);
                await setDoc(newArticle,{
                    timestamp:serverTimestamp(),
                    owner:{
                        uid:user.uid,
                        firstname:user.firstname,
                        lastname:user.lastname
                    },
                    ...formData
                });

                //redirect user
                router.push({name:'admin_articles',query:{reload:true}})
                return true;

            }catch(error){
                throw new Error(error)
            }
        }
    }
})