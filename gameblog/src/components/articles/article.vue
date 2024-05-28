<template>
    <div class="container p_top">
        <div class="text-center m-3" v-if="loading">
            <v-progress-circular
                indeterminate
                color="primary"
            />
        </div>
        <div class="article_page" v-else>
            <div class="game_tag">
                {{ article.game }}
            </div>
        </div>
        <div class="article_featured"
             :style="{backgroundImage:`url(${article.img})`}"
        ></div>
        <div class="article_content">
            <div class="owner">
                <!-- Article written by <b>{{ article.owner.firstname }}</b> <b>{{ article.owner.lastname }}</b> -->
            </div>
            <hr/>
            <h1>{{ article.title }}</h1>
        </div>
        <div class="editor" v-html="article.editor"></div>

        <div class="article_rating">
            Our rating is: <b>{{ article.rating }}</b>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    import { useArticleStore } from '@/stores/articles';
    const articleStore=useArticleStore();

    import { useRoute } from 'vue-router';
    const route=useRoute();

    const loading=ref(true);
    const article=ref('');

    articleStore.getArticleById(route.params.id)
    .then((response)=>{
        article.value=response;
    })
    .finally(()=>{
        loading.value=false;
    })

</script>