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
                    <div class="card-list">
                        <div class="card-item" @click="clickCard" v-for="(item, index) in about" :key="index" :data-index="index">
                            <div class="card-cover">
                                <div class="caption">category</div>
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
                <div class="swiper-slide">
                    <div class="swiper-slide" style="position: relative;" data-cate="artist">
                        <div class="btn-card">
                            <div class="btn-next" @click="nextCard">NEXT</div>
                            <div class="btn-next" @click="prevCard">PREV</div>
                        </div>
                        <div class="card-list">
                            <div class="card-item" @click="clickCard" v-for="(item, index) in artist" :key="index" :data-index="index">
                                <div class="card-cover">
                                    <div class="caption">category</div>
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
                <h1>{{category}}</h1>
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

//TO 여러개 카드 더미의 값 조정 curr_pg, cardOrder 등
Swiper.use([ Navigation, Pagination ])

export default {
    data() {
        return {
            category: 'ABOUT',
            category_pg: {
                about: 0,
                artist: 0,
                audtion: 0,
                career: 0,
            },
            current_pg: 0,
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
            ],
            language_show: false,
            sns_show: false,
            orderCard: [],
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
                    $('.curr-loca h1').text(this.category);
                    this.category = menu[currIndex];
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
        this.orderCard = Array.from(Array($('.swiper-slide-active .card-list .card-item').length).keys());
        this.changeCard('init');
    },
    methods:{
        showMenu(){
            $('.swiper-pagination').toggleClass('active')
        },
        clickCard(e) {
            var index = $(e.target).parents('.card-item').data('index');
            if(this.current_pg == index) {
                // console.log('viewDetail');
                this.viewCardDetail(index);
            } else {
                if(this.current_pg > index) {
                    console.log('prev');
                    for(var i = this.current_pg; i > index; i--) {
                        console.log(i);
                        this.prevCard();
                    }
                } else {
                    console.log('next');
                    for(var i = this.current_pg; i < index; i++) {
                        this.nextCard();
                    }
                }
            }
        },
        nextCard() {
            console.log('nextCard');
            var $cards = $('.swiper-slide-active .card-list .card-item');
            if(this.current_pg < $cards.length - 1) {
                this.current_pg++;
                this.orderCard.unshift(this.orderCard.pop())
                this.changeCard('next');
            }
        },
        prevCard() {
            console.log('prevCard');
            if(this.current_pg > 0) {
                this.current_pg--;
                this.orderCard.push(this.orderCard.shift());
                this.changeCard('prev');
            }
        },
        changeCard(source, index) {
            var $target;
            var $cards = $('.swiper-slide-active .card-list .card-item');
            $cards.removeClass('active');
            switch (source) {
                case 'next':
                    $target = $($cards[this.current_pg - 1]);
                    break;
                case 'prev':
                    $target = $($cards[this.current_pg]);
                    break;
            }

            if($target) {
                // $target.css('z-index', $cards.length + 1);
                // $target.addClass('active');
                this.arrangeCard(source);
            } else {
                this.arrangeCard(source);
            }
        },
        arrangeCard(source) {
            var $cards = $('.swiper-slide-active .card-list .card-item');
            for(var i = 0; i < $cards.length; i++) {
                var card = $($cards[i]);
                card.css('z-index', ($cards.length - this.orderCard[i]) + 1);

                if(source === 'init') {
                    // 초기 셋팅
                    // if (i !== this.currentPage) {
                    //     card.css('transform', 'rotate(' + Math.round((Math.random() * 3) + 1) + 'deg');
                    // } else {
                    //     card.css('transform', 'rotate(0deg)');
                    //}
                    var max = 50;
                    var min = -50;
                    var rand = Math.floor(Math.random() * (max - min) + min);
                    var top = Number(card.css('top').split('px')[0]);
                    var left = Number(card.css('left').split('px')[0]);
                    card.css('top',top - rand);
                    card.css('left',left - rand);
                }

                if(source === 'click') {

                }
            }
        },
        viewCardDetail(index) {
            console.log('viewCardDetail');
            var $cards = $('.swiper-slide-active .card-list .card-item');
            $($cards[index]).find('.card-detail').addClass('view');
            $($cards[index]).css('top', '50%');
            $($cards[index]).css('left', '50%');
            // var b_top = $('.card-item.active').css('top');
            // var b_left = $('.card-item.active').css('left');
            // // console.log($('.card-item.active'));
            // // console.log($('.card-item.active').find('.card-detail'));
            // $('.card-item.active').find('.card-detail').addClass('view');
            // $('.card-item.active').css('top', '50%');
            // $('.card-item.active').css('left', '50%');
        }
    }
}
</script>
