<template>
    <div class="page-official">
        <button class="menu-btn" @click="showMenu">Menu</button>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide" style="position:relative;">
                    <div class="btn-card">
                        <div class="btn-next" @click="nextCard">NEXT</div>
                        <div class="btn-next" @click="prevCard">PREV</div>
                    </div>
                    <div class="card-list">
                        <div class="card-item">
                            <div class="card-cover">
                                <h3>about3</h3>
                                <button class="btn">READ MORE</button>
                            </div>
                            <div class="card-detail"><div>Detail Title</div></div>
                        </div>
                        <div class="card-item">
                            <div class="card-cover">
                                <h3>about2</h3>
                                <button class="btn">READ MORE</button>
                            </div>
                            <div class="card-detail"><div>Detail Title</div></div>
                        </div>
                        <div class="card-item">
                            <div class="card-cover">
                                <h3>about1</h3>
                                <button class="btn">READ MORE</button>
                            </div>
                            <div class="card-detail"><div>Detail Title</div></div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide" style="position:relative;">
                    <div class="card-item artist" @click="clickCard" v-for="(item, index) in artist.slice().reverse()" :key="index">
                        <div class="card-cover">
                            <h3>{{item.title}}</h3>
                            <button @click="viewCardDetail" class="btn">READ MORE</button>
                        </div>
                        <div class="card-detail">
                            <div>Detail Title</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>
            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
        <footer></footer>
    </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Mousewheel } from 'swiper'
import 'swiper/swiper-bundle.css'

Swiper.use([ Navigation, Pagination ])

export default {
    data() {
        return {
            about: [
                {title: 'about1'},
                {title: 'about2'},
                {title: 'about3'},
                {title: 'about4'},
            ],
            artist: [
                {title: 'artist1'},
                {title: 'artist2'},
                {title: 'artist3'},
                {title: 'artist4'},
            ]
        }
    },
    computed: {

    },
    mounted() {
        // swiper
        const menu = ['ABOUT', 'ARTISTS'];
        new Swiper('.swiper-container', {
            // slidesPerView: 1,
            speed: 800,
            slidesPerView: "auto",
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + menu[index] + "</span>";
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
        // card
        this.initCardItem();
    },
    methods:{
        showMenu(){
            $('.swiper-pagination').toggleClass('active')
        },
        initCardItem() {
            $('.card-list .card-item').removeClass('card-active card-next card-prev');
            $('.card-list').each(function(){
                var $card = $(this);
                $(this).find('.card-item').each(function(index){
                    // var z_index = $card.find('.card-item').length - index - 1;

                    $(this).css('z-index',index + 1);
                })

                var active = $(this).find('.card-item').last();
                var next = active.prev();
                var prev = active.next();
                prev.length == 0 ? prev = $card.find('.card-item').first() : prev;
                active.addClass('card-active');
                next.addClass('card-next');
                prev.addClass('card-prev');
            })

            // $('.card-list').each(function() {
            //     $(this).find('.card-item').each(function(index){
            //         var max = 50;
            //         var min = -50;
            //         var rand = Math.floor(Math.random() * (max - min) + min);
            //         //TODO top, left, rotate 값등 정해진 값에서 움직이게 할 것인지
            //         // $(this).css('transform','rotate('+index*5+'deg)');
            //         var top = Number($(this).css('top').split('px')[0]);
            //         var left = Number($(this).css('left').split('px')[0]);
            //         $(this).css('top',top - rand);
            //         $(this).css('left',left - rand);
            //         $(this).css('z-index',index);
            //     })
            // })

            // console.log($('.card-list .card-item').last());
            // $('.swiper-slide-active .card-list .card-item').last().addClass('active');
        },
        clickCard(e) {
            if($(e.target).hasClass('active') == false) {
                var target_card = $(e.target).parent('.card-item');
                var z_index = Number($('.card-item.active').css('z-index'));

                target_card.css('z-index', z_index + 1);

                $('.card-item').removeClass('active');
                target_card.addClass('active');
            } else {
                this.viewCardDetail();
            }
        },
        nextCard() {
            // active되어있는 카드 z-index;
            console.log('nextCard');
            var $card = $('.swiper-slide-active .card-list');
            var length = $card.find('.card-item').length;
            var active = $card.find('.card-active');
            // var active_id = active.index();
            // console.log('active_id', active_id);
            var next = $card.find('.card-next');
            var prev = $card.find('.card-prev');
            $('.card-list .card-item').removeClass('card-active card-next card-prev');
            active.addClass('card-prev');
            next.addClass('card-active');
            prev.addClass('card-next');
            // console.log('active', next.index());
            var active_id = next.index();
            console.log('active_id', active_id);
            $card.find('.card-item').each(function(index){
                console.log('index', index);
                if(index == active_id) {
                    $(this).css('z-index',index + 2);
                } else if(index > active_id){
                    $(this).css('z-index',index - 1);
                } else if(index < active_id) {
                    console.log('index_small');
                    $(this).css('z-index',index + 1);
                }
            })
        },
        prevCard() {
            // active되어있는 카드 z-index;
            console.log('prevCard');
        },
        viewCardDetail() {
            console.log('viewCardDetail');
            var b_top = $('.card-item.active').css('top');
            var b_left = $('.card-item.active').css('left');
            // console.log($('.card-item.active'));
            // console.log($('.card-item.active').find('.card-detail'));
            $('.card-item.active').find('.card-detail').addClass('view');
            $('.card-item.active').css('top', '50%');
            $('.card-item.active').css('left', '50%');
        }
    }
}
</script>
