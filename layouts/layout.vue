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
            <li><a>Tiktok</a></li>
        </ul>
    </header>
    <div class="page-official">
        <button class="menu-btn" @click="showMenu">
            <p class="desc">MENU</p>
            <img src="~/assets/images/toggle.svg" alt="logo" class="max">
        </button>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide">
                    <div class="card-list">
                        <div class="btn-card">
                            <div class="btn-next">NEXT</div>
                            <div class="btn-next">PREV</div>
                        </div>
                        <div class="card-item" @click="clickCard" v-for="(item, index) in about" :key="index">
                            <div class="card-cover">
                                <div class="caption">ABOUT</div>
                                <div>
                                    <h2>{{item.title}}</h2>
                                    <button @click="viewCardDetail" class="btn opa">READ MORE</button>
                                </div>
                            </div>
                            <div class="card-detail about">
                                <div class="detail-content">
                                    <h3 class="title">Detail Title</h3>
                                    <div class="desc ko">
                                        <h5>
                                            모어비전은 AOMG, H1GHR MUSIC, WON SOJU 등 힙합, R&B 장르 문화 기반의 감각적인 브랜드를 전개해나갔던 박재범이 2022년 3월에 설립한 새로운 엔터테인먼트 허브입니다.
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">ARTISTS</div>
                <div class="swiper-slide">CAREERS</div>
                <div class="swiper-slide">AUDITION</div>
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
                <h1>ABOUT</h1>
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

Swiper.use([ Navigation, Pagination ])

export default {
    data() {
        return {
            lang: this.$store.state.lang,
            // about: [
            //     {title: 'about1', desc: 'desc'},
            //     {title: 'about2', desc: 'desc'},
            //     {title: 'about3', desc: 'desc'},
            //     {title: 'about4', desc: 'desc'},
            //     {title: 'about5', desc: 'desc'},
            //     {title: 'about6', desc: 'desc'},
            //     {title: 'about8', desc: 'desc'},
            // ],
            language_show: false,
            sns_show: false
        }
    },
    computed: {
        about() {
            return this.$store.state.res.about
        },
    },
    mounted() {
        // swiper
        const menu = ['ABOUT', 'ARTISTS', 'CAREERS', 'AUDITION'];
        const page_swiper = new Swiper('.swiper-container', {
            // slidesPerView: 1,
            speed: 800,
            slidesPerView: "auto",
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            allowTouchMove: false,
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

                    $('.curr-loca h1').text(menu[currIndex]);
                    $('.swiper-button-prev h2').text(menu[prevIndex]);
                    $('.swiper-button-next h2').text(menu[nextIndex]);

                    //슬라이더 이동하는 동안 클릭 방지
                    $(window).on('click', function(e){
                        e.preventDefault();
                    })
                }
            },
        });
        // card
        this.initCardItem();
    },
    methods:{
        showMenu(){
            $('.swiper-pagination').toggleClass('active');
            $('.menu-btn').toggleClass('active');
            $('header').toggleClass('active');
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
        initCardItem() {
            $('.card-item').each(function(index){
            var max = 50;
            var min = -50;
            var rand = Math.floor(Math.random() * (max - min) + min);
            //TODO top, left, rotate 값등 정해진 값에서 움직이게 할 것인지
            // $(this).css('transform','rotate('+index*5+'deg)');
            var top = Number($(this).css('top').split('px')[0]);
            var left = Number($(this).css('left').split('px')[0]);
            $(this).css('top',top - rand);
            $(this).css('left',left - rand);
            $(this).css('z-index',index);
            })

            console.log($('.card-list .card-item').last());
            $('.swiper-slide-active .card-list .card-item').last().addClass('active');
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
