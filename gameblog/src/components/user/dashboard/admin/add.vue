
<template>
    <h1>Add article</h1>
    <hr/>

    <Form class="mb-5" @submit="onSubmit">
        <div class="mb-4">
            <!-- Name of the game -->
                <Field name="game" v-slot="{field,errors,errorMessage}">
                    <input 
                        type="password"
                        placeholder="Name of the game"
                        v-bind="field"
                        class="form-control"
                        :class="{'is-invalid':errors.length !== 0 }"
                    />

                    <div class="input_alert"v-if="errors.length !==0">
                        {{ errorMessage }}
                    </div>
                </Field>
            </div>
    </Form>
</template>

<script setup>
    import { ref } from 'vue';
    import { Field, Form } from 'vee-validate';

    function onSubmit(values,{ resetForm }) {
        
    }

</script>

