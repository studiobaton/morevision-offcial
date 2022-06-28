<template>
<div id="app">
    <header>
        <ul>
            <li>LANGUAGE</li>
            <li>SNS</li>
        </ul>
    </header>
    <div class="page-official">
        <button class="menu-btn" @click="showMenu">Menu</button>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide" style="position: relative;">
                    <div class="btn-card">
                        <div class="btn-next" @click="nextCard">NEXT</div>
                        <div class="btn-next" @click="prevCard">PREV</div>
                    </div>
                    <div class="card-list">
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
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
        <footer>
            <div class="navi">ABOUT</div>
            <div class="logo">MORE VISION</div>
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
            current_pg: 0,
            about: [
                {title: 'about1', desc: 'desc'},
                {title: 'about2', desc: 'desc'},
                {title: 'about3', desc: 'desc'},
                {title: 'about4', desc: 'desc'},
                {title: 'about5', desc: 'desc'},
                {title: 'about6', desc: 'desc'},
                {title: 'about7', desc: 'desc'},
                {title: 'about8', desc: 'desc'},
            ],
            orderCard: [],
        }
    },
    computed: {

    },
    mounted() {
        // swiper
        const menu = ['ABOUT', 'ARTISTS', 'CAREERS', 'AUDITION'];
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
        this.orderCard = Array.from(Array($('.swiper-slide-active .card-list .card-item').length).keys());
        this.changeCard('init');
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
        nextCard() {
            console.log('nextCard');
            var $cards = $('.swiper-slide-active .card-list .card-item');
            if(this.current_pg < $cards.length - 1) {
                this.current_pg++;
                console.log(this.orderCard.unshift(this.orderCard.pop()));
                this.changeCard('next');
            }
        },
        prevCard() {
            console.log('prevCard');
            // this.changeCard('prev');
            if(this.current_pg > 0) {
                this.current_pg--;
                this.orderCard.push(this.orderCard.shift());
                this.changeCard('prev');
            }
        },
        changeCard(source) {
            var $target;
            var $cards = $('.swiper-slide-active .card-list .card-item');
            switch (source) {
                case 'next':
                    $target = $($cards[this.current_pg - 1]);
                    break;
                case 'prev':
                    $target = $($cards[this.current_pg]);
                    break;
            }

            if($target) {
                $target.css('z-index', $cards.length + 1);
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
                    // }
                }
            }
        },
        // orderCard() {
        //     var $cards = $('.swiper-slide-active .card-list .card-item');
        //     return Array.from(Array($cards.length).keys());
        // },
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
