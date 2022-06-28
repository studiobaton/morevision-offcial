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
        <button class="menu-btn" @click="showMenu">Menu</button>
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
                                <h3>{{item.title}}</h3>
                                <button @click="viewCardDetail" class="btn">READ MORE</button>
                            </div>
                            <div class="card-detail">
                                <div>Detail Title</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
                <div class="swiper-slide">Slide 4</div>
            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>
            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev">
                <img src="~/assets/images/navi_arrow.svg" alt="logo" class="max">
                <h2>AUDITION</h2>
            </div>
            <div class="swiper-button-next">
                <img src="~/assets/images/navi_arrow.svg" alt="logo" class="max">
                <h2>ARTISTS</h2>
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
import Swiper, { Navigation, Pagination, Mousewheel } from 'swiper'
import 'swiper/swiper-bundle.css'

Swiper.use([ Navigation, Pagination ])

export default {
    data() {
        return {
            about: [
                {title: 'about1', desc: 'desc'},
                {title: 'about2', desc: 'desc'},
                {title: 'about3', desc: 'desc'},
                {title: 'about4', desc: 'desc'},
                {title: 'about5', desc: 'desc'},
                {title: 'about6', desc: 'desc'},
                {title: 'about8', desc: 'desc'},
            ],
            language_show: false,
            sns_show: false
        }
    },
    computed: {

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
            speed: 300,
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
                    var nextIndex = currIndex + 1;
                    var prevIndex = currIndex - 1;
                    $('.curr-loca h1').text(menu[currIndex]);
                    $('.swiper-button-prev h2').text(menu[prevIndex]);
                    $('.swiper-button-next h2').text(menu[nextIndex]);
                }
            },
        });
        // card
        this.initCardItem();
    },
    methods:{
        showMenu(){
            $('.swiper-pagination').toggleClass('active')
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
