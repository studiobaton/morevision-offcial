<template>
<div id="app">
    <header>
        <ul class="menu-list">
            <li @click="language_show = !language_show, sns_show = false">LANGUAGE</li>
            <li @click="sns_show = !sns_show, language_show = false">SNS</li>
        </ul>
        <ul class="toggle-navigation" v-if="language_show == true">
            <li><a>Korean</a></li>
            <li><a>English</a></li>
            <li><a>Japanese</a></li>
            <li><a>chinese</a></li>
        </ul>
        <ul class="toggle-navigation" v-if="sns_show == true">
            <li><a>Twitter</a></li>
            <li><a>Facebook</a></li>
            <li><a>Instagram</a></li>
            <li><a>Youtube</a></li>
            <li><a>Tictok</a></li>
        </ul>
    </header>
    <div class="page-official">
        <div class="menu-btn" @click="showMenu">MENU<img src="~/assets/images/toggle.svg" alt="logo" class="max"></div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide" style="position: relative;" data-cate="about">
                    <div class="btn-card">
                        <div class="btn-next" @click="nextCard">NEXT</div>
                        <div class="btn-next" @click="prevCard">PREV</div>
                    </div>
                    <Card />
                </div>
                <div class="swiper-slide" style="position: relative;" data-cate="artists">
                    <div class="btn-card">
                        <div class="btn-next" @click="nextCard">NEXT</div>
                        <div class="btn-next" @click="prevCard">PREV</div>
                    </div>
                    <div class="card-list">
                        <div class="card-item" v-for="(item, index) in artists" :key="index" :data-index="index">
                            <div class="card-cover">
                                <div class="caption">cate</div>
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
                <div class="swiper-slide" style="position: relative;" data-cate="careers">
                    <div class="btn-card">
                        <div class="btn-next" @click="nextCard">NEXT</div>
                        <div class="btn-next" @click="prevCard">PREV</div>
                    </div>
                    <div class="card-list">
                        <div class="card-item" v-for="(item, index) in careers" :key="index" :data-index="index">
                            <div class="card-cover">
                                <div class="caption">careers</div>
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
                <div class="swiper-slide" style="position: relative;" data-cate="audition">
                    <div class="btn-card">
                        <div class="btn-next" @click="nextCard">NEXT</div>
                        <div class="btn-next" @click="prevCard">PREV</div>
                    </div>
                    <div class="card-list">
                        <div class="card-item" v-for="(item, index) in audition" :key="index" :data-index="index">
                            <div class="card-cover">
                                <div class="caption">careers</div>
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
            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>
            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev">
                <img src="~/assets/images/navi_arrow.svg" alt="logo" class="max">
                <h2></h2>
            </div>
            <div class="swiper-button-next">
                <img src="~/assets/images/navi_arrow.svg" alt="logo" class="max">
                <h2></h2>
            </div>
        </div>
        <footer>
            <div class="curr-loca bg-white">
                <h1>{{cate}}</h1>
                <div class="footer-pagination"></div>
            </div>
            <div class="logo">
                <img src="~/assets/images/logo.svg" alt="logo" class="max">
                <img src="~/assets/images/logo_arrow.svg" alt="logo" class="max">
            </div>
        </footer>
    </div>
</div>

</template>

<script>

import axios from 'axios';
import Swiper, { Navigation, Pagination, Mousewheel } from 'swiper'
import 'swiper/swiper-bundle.css'
import Card from '@/components/Card.vue'

Swiper.use([ Navigation, Pagination ])

export default {
    components: { Card },
    data() {
        return {
            cate_list: ['about', 'artists', 'careers', 'audition'],
            cate: 'about',
            cate_pg: {
                about: 0,
                artists: 0,
                careers: 0,
                audition: 0,
            },
            order_card: {
                about: [],
                artists: [],
                careers: [],
                audition: [],
            },
            currnet_slide_idx: '',
            active_slide: [],
            current_pg: 0,
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
            language_show: false,
            sns_show: false,
        }
    },
    computed: {

    },
    mounted() {
        // swiper
        var self = this;
        const menu = ['about', 'artists', 'careers', 'audition'];
        const page_swiper = new Swiper('.swiper-container', {
            speed: 800,
            slidesPerView: 1,
            slidesPerView: "auto",
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            allowTouchMove: false,
            watchSlidesVisibility: true,
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
            on: {
                slideChange: function () {
                    var currIndex = this.realIndex;
                    var prevIndex = currIndex - 1;
                    var nextIndex = currIndex + 1;

                    if(currIndex == 0){prevIndex = 3;};
                    if(currIndex == 3){nextIndex = 0;};

                    // $('.curr-loca h1').text(menu[currIndex]);
                    $('.curr-loca h1').text(self.cate);
                    $('.swiper-button-prev h2').text(menu[prevIndex]);
                    $('.swiper-button-next h2').text(menu[nextIndex]);


                    self.cate = menu[currIndex];
                    self.currnet_slide_idx = this.realIndex;
                    self.active_slide = $('.swiper-slide-visible[data-swiper-slide-index="'+this.realIndex+'"]').find('.card-list .card-item');

                    console.log('this.realIndex', this.realIndex, self.cate);
                    $('.swiper-slide .card-item').css('border', 'none');
                    $(self.active_slide).css('border', '1px solid red');
                    // console.log($('.swiper-slide[data-swiper-slide-index="'+self.currnet_slide_idx+'"]').not('.swiper-slide-duplicate').find('.card-list .card-item'));
                    //슬라이더 이동하는 동안 클릭 방지
                    $(window).on('click', function(e){
                        e.preventDefault();
                    })
                }
            },
        });

        // card init
        $.each(self.cate_list, function(index, item){
            // self.order_card[item] = Array.from(Array($('.swiper-slide[data-cate="'+item+'"] .card-list .card-item').length).keys());
            self.order_card[item] = Array.from(Array(self[`${item}`].length).keys());
        })

        self.changeCard('init');

        // card click
        $('.card-item').on('click', function(e){
            self.clickCard(e);
        })


        // card wheel
        window.addEventListener("wheel", function(e){
            e.preventDefault();
        },{passive : false});

        $(window).on('wheel', function(e) {
            var delta_y = e.originalEvent.deltaY;
            console.log(delta_y);

            if(delta_y < -30) {
                self.nextCard();
            }

            if(delta_y > 30) {
                self.prevCard();
            }
        })
    },
    methods:{
        showMenu(){
            $('.swiper-pagination').toggleClass('active')
        },
        clickCard(e) {
            var self = this;
            var index = $(e.target).parents('.card-item').data('index');
            $('.card-item.active .card-detail').removeClass('view');
            if(self.cate_pg[self.cate] == index) {
                self.viewCardDetail(index);
            } else {
                if(self.cate_pg[self.cate] > index) {
                    console.log('prev');
                    for(var i = self.cate_pg[self.cate]; i > index; i--) {
                        self.prevCard();
                    }
                } else {
                    console.log('next');
                    for(var i = self.cate_pg[self.cate]; i < index; i++) {
                        self.nextCard();
                    }
                }
            }
        },
        nextCard() {
            var self = this;
            // var $cards = $('.swiper-slide[data-swiper-slide-index="'+self.currnet_slide_idx+'"]').not('.swiper-slide-duplicate').find('.card-list .card-item');
            // var $cards = $('.swiper-slide[data-cate="'+self.cate+'"] .card-list .card-item');
            var $cards = self.active_slide;
            console.log('nextCard');
            if(self.cate_pg[self.cate] < $cards.length - 1) {
                self.cate_pg[self.cate]++;
                self.order_card[self.cate].unshift(self.order_card[self.cate].pop());
                console.log(self.order_card[self.cate]);
                self.changeCard('next');
            }
        },
        prevCard() {
            var self = this;
            console.log('prevCard');
            if(self.cate_pg[self.cate] > 0) {
                self.cate_pg[self.cate]--;
                self.order_card[self.cate].push(self.order_card[self.cate].shift());
                this.changeCard('prev');
            }
        },
        changeCard(source, index) {
            console.log('changeCard');
            var self = this;
            var $target;
            var $slide = $('.swiper-slide');
            var $cards = self.active_slide;
            $cards.removeClass('active');
            switch (source) {
                case 'next':
                    $target = $($cards[self.cate_pg[self.cate] - 1]);
                    break;
                case 'prev':
                    $target = $($cards[self.cate_pg[self.cate]]);
                    break;
            }

            var duration = 0.3;

            if($target) {
                var t1 = this.$gsap.timeline();
                // tl.to($target, {
                //     x: 500,
                //     duration: duration
                // })
                // tl.to($target, {
                //     x: 500,
                //     duration: duration
                // })
                $target.css('z-index', $cards.length + 1);
                $target.addClass('active');
                this.arrangeCard(source);
            } else {
                this.arrangeCard(source);
            }
        },
        arrangeCard(source) {
            var self = this;
            console.log('arrangeCard', source, self.cate);
            var $cards;
            var $cate;
            if(source === "init") {
                $('.swiper-slide').each(function(index, item){
                    $cate = $('.swiper-slide').data('cate');
                    $cards = $(this).find('.card-item');
                    for(var i = 0; i < $cards.length; i++) {
                        var card = $($cards[i]);
                        card.css('z-index', ($cards.length - self.order_card[$cate][i]) + 1);
                        var max = 50;
                        var min = -50;
                        var rand = Math.floor(Math.random() * (max - min) + min);
                        var top = Number(card.css('top').split('px')[0]);
                        var left = Number(card.css('left').split('px')[0]);
                        card.css('top',top - rand);
                        card.css('left',left - rand);
                    }
                })
            } else {
                // $cards = $('.swiper-slide[data-cate="'+self.cate+'"] .card-list .card-item');
                $cards = self.active_slide;
                for(var i = 0; i < $cards.length; i++) {
                    var card = $($cards[i]);
                    card.css('z-index', ($cards.length - self.order_card[self.cate][i]) + 1);
                }
            }
        },
        viewCardDetail(index) {
            var self = this;
            console.log('viewCardDetail');
            // var $cards = $('.swiper-slide')[self.currnet_slide_idx];
            // console.log(self.currnet_slide_idx);
            // var $cards = $('.swiper-slide[data-cate="'+self.cate+'"] .card-list .card-item');
            var $cards = self.active_slide;
            $($cards[index]).find('.card-detail').addClass('view');
            $($cards[index]).css('top', '50%');
            $($cards[index]).css('left', '50%');
        }
    }
}
</script>
