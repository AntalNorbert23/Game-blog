<template>
    <div class="signin_container">
       
        <!-- loader-->
        <div class="text-center" v-show="userStore.loading">
            <v-progress-circular
                indeterminate
                color="primary"
            />
        </div>

        <Form @submit="onSubmit" :validation-schema="formSchema" v-show="!userStore.loading">
            <h1 v-text="!type ? 'Sign in' : 'Register'" ></h1>

             <!-- First Name -->
             <div class="form-group" v-if="type">
                <Field 
                    name="firstname" 
                    v-slot="{ field, errors, errorMessage }"
                >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Enter your first name"
                        v-bind="field"
                        :class="{ 'is-invalid': errors.length !== 0 }"
                    />
                    <div class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>

            <!-- Last Name -->
            <div class="form-group" v-if="type">
                <Field 
                    name="lastname" 
                    v-slot="{ field, errors, errorMessage }"
                >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Enter your last name"
                        v-bind="field"
                        :class="{ 'is-invalid': errors.length !== 0 }"
                    />
                    <div class="input_alert" v-if="errors.length !== 0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>

        <!-- E-mail -->

            <div class="form-group">
                <Field 
                    name="email" 
                    :value="'norbert@gmail.com'" 
                    v-slot="{field,errors,errorMessage}"
                >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Enter your email"
                        v-bind="field"
                        :class="{'is-invalid':errors.length !== 0 }"
                    />

                    <div class="input_alert"
                         v-if="errors.length !==0"
                    >
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>

        <!-- Password -->

            <div class="form-group">
                <Field 
                    name="password" 
                    :value="'testing123'" 
                    v-slot="{field,errors,errorMessage}"
                >
                    <input 
                        type="password"
                        class="form-control"
                        placeholder="Enter your password"
                        v-bind="field"
                        :class="{'is-invalid':errors.length !== 0 }"
                    />

                    <div class="input_alert"
                         v-if="errors.length !==0"
                    >
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>

            <button 
                type="submit"
                class="btn mb-3 btn-block"
                v-text="!type ? 'Sign in': 'Register'"
            >
            </button>

            <div class="form_swap" @click="type=!type">
                <span v-if="type">
                    I want to <b>Sign in</b>
                </span>
                <span v-else>
                    I want to <b>Register</b>
                </span>
            </div>
        </Form>
    </div>
</template>

<script setup>
    import { Field, Form } from 'vee-validate';
    import * as yup from 'yup';
    import { ref } from 'vue';

    //toasts
    import { useToast } from 'vue-toast-notification';
    const $toast=useToast();

    //Authstore
    import { useUserStore } from '@/stores/user';
    const userStore=useUserStore();


    const type=ref(false);
    const formSchema=yup.object({
        email:yup.string()
                 .required("The email is required")
                 .email("Not a valid email"),
        password:yup.string()
                    .required('The password is required'),
        firstname: yup.string()
                    .required('The first name is required'),
        lastname: yup.string()
                    .required('The last name is required')
    })

    function onSubmit(values,{ resetForm }){
        if(type.value){
            //register
            userStore.register(values)
        }else{
            userStore.signIn(values)
        }
        //userStore.register(values)
    }

    //subscribe to error
    userStore.$onAction(({name,after,onError})=>{
        if(name === 'register' || name === 'signIn'){
            after(()=>{
                $toast.success('Welcome !!')
            })
            onError((error)=>{
                $toast.error(error.message)
            })
        }
    })

</script>