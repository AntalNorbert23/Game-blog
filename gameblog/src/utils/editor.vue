<template>
    <div class="awesome_editor">
        <EditorContent :editor="editor"/>
    </div>
</template>

<script setup>
    import { Editor, EditorContent } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit'

    const emit=defineEmits(['update'])
    const editor = new Editor({
        conten:'',
        extensions:[
            StarterKit
        ],
        onUpdate:()=>{
            emit('update',editor.getHTML())
        }
    })
</script>