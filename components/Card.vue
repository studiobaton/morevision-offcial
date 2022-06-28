<template>
<div>
<div class="card-list">
    <div class="card-item" v-for="(item, index) in about" :key="index" :data-index="index">
        <div class="card-cover" v-bind:style="{backgroundImage: 'url('+item.cover+')'}">
            <div class="caption">about</div>
            <div>
                <h2>{{item.title}}</h2>
                <button @click="viewCardDetail" class="btn opa">READ MORE</button>
            </div>
        </div>
        <div class="card-detail">
            <div>Detail Title</div>
        </div>
    </div>
</div>
</div>

</template>

<script>
import axios from 'axios';
export default {
    name: 'Card',
    data(){
        return{
            cate_list: ['about', 'artists', 'careers', 'audition'],
            about: [
                {title: 'about1', cover: '_nuxt/assets/images/dummy/Cover_1.png'},
                {title: 'about2', cover: '_nuxt/assets/images/dummy/Cover_2.png'},
                {title: 'about3', cover: '_nuxt/assets/images/dummy/Cover_3.png'},
                {title: 'about4', cover: '_nuxt/assets/images/dummy/Cover_4.png'},
            ],
            artists: [
                {title: 'artist1'},
                {title: 'artist2'},
                {title: 'artist3'},
                {title: 'artist4'},
            ],
            careers: [
                {title: 'careers1'},
                {title: 'careers2'},
                {title: 'careers3'},
            ],
            audition: [
                {title: 'audition1'},
                {title: 'audition2'},
            ],
        }
    }
}
</script>
