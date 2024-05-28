<template>
    <div class="awesome_editor">
        <div v-if="editor" class="btn_container">
            <span 
                @click="editor.chain().focus().toggleBold().run()" 
                :class="{ 'is-active': editor.isActive('bold') }"
            >
                Bold
            </span>
            <span 
                @click="editor.chain().focus().toggleItalic().run()" 
                :class="{ 'is-active': editor.isActive('italic') }"
            >
                Italic
            </span>
            <span 
                @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" 
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            >
                H1
            </span>
            <span 
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" 
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            >
                H2
            </span>
            <span 
                @click="editor.chain().focus().toggleBulletList().run()" 
                :class="{ 'is-active': editor.isActive('bulletList') }"
            >
                <i class="fa fa-list-ul"></i>
            </span>
            <span 
                @click="editor.chain().focus().toggleUnderline().run()" 
                :class="{ 'is-active': editor.isActive('underline') }" 
            >
                <u>U</u>
            </span>
            <span 
                @click="editor.chain().focus().toggleSuperscript().run()" 
                :class="{ 'is-active': editor.isActive('superscript') }" 
            >
                X<sup>2</sup>
            </span>
            <span 
                @click="editor.chain().focus().toggleSubscript().run()" 
                :class="{ 'is-active': editor.isActive('subscript') }" 
            >
                X<sub>2</sub>
            </span>
            <span 
                @click="editor.chain().focus().setTextAlign('left').run()" 
                :class="{ 'is-active': editor.isActive({textAlign:'left'}) }"
                class="fa fa-align-left" 
            >
            </span>
            <span 
                @click="editor.chain().focus().setTextAlign('center').run()" 
                :class="{ 'is-active': editor.isActive({textAlign:'center'}) }"
                class="fa fa-align-center"
            >
            <i ></i>
            </span>
            <span 
                @click="editor.chain().focus().setTextAlign('right').run()" 
                :class="{ 'is-active': editor.isActive({textAlign:'right'}) }" 
                class="fa fa-align-right"
            >
            </span>
            <span 
                @click="editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()" 
                :class="{ 'is-active': editor.isActive('highlight', { color: '#ffc078' }) }"
                class="fa fa-marker"
            >
            </span>

        </div>
        
        <EditorContent :editor="editor"/>
    </div>
</template>

<script setup>
    import { watch } from 'vue';
    import Highlight from '@tiptap/extension-highlight'
    import TextAlign from '@tiptap/extension-text-align'
    import Superscript from '@tiptap/extension-superscript'
    import Subscript from '@tiptap/extension-subscript'
    import Underline from '@tiptap/extension-underline'
    import { Editor, EditorContent } from '@tiptap/vue-3'
    import StarterKit from '@tiptap/starter-kit'

    const emit=defineEmits(['update']);
    const props=defineProps(['content']);
    const editor = new Editor({
        content:'',
        extensions:[
            StarterKit,
            Underline,
            Superscript,
            Subscript,
            TextAlign.configure({
                types:['heading','paragraph']
            }),
            Highlight.configure({ multicolor: true }),
        ],
        onUpdate:()=>{
            emit('update',editor.getHTML())
        }
    })
   
    function loadContent(){
        if(props.content){
            editor.commands.setContent(props.content)
        }
    }

    watch(()=>props.content,()=>{
        loadContent();
    })

    loadContent();
</script>