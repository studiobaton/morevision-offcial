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
                <div class="swiper-slide main-swiper-slide" style="position: relative;" data-cate="about">
                    <div class="btn-card">
                        <div class="btn-next" @click="nextCard">NEXT</div>
                        <div class="btn-next" @click="prevCard">PREV</div>
                    </div>
                    <div class="card-list">
                        <div class="card-item" v-for="(item, index) in about" :key="index" :data-index="index">
                            <div class="card-cover" v-bind:style="{backgroundImage: `url(${item.cover})`}">
                                <div class="caption">about</div>
                                <div>
                                    <h2>{{item.title}}</h2>
                                    <button class="btn opa"><span class="text">READ MORE</span><span class="close">CLOSE</span></button>
                                </div>
                            </div>
                            <div class="card-detail">
                                <div>Detail Title</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide main-swiper-slide" style="position: relative;" data-cate="artists">
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
                                    <button class="btn opa"><span class="text">READ MORE</span><span class="close">CLOSE</span></button>
                                </div>
                            </div>
                            <div class="card-detail">
                                <div>Detail Title</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide main-swiper-slide" style="position: relative;" data-cate="careers">
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
                                    <button class="btn opa"><span class="text">READ MORE</span><span class="close">CLOSE</span></button>
                                </div>
                            </div>
                            <div class="card-detail">
                                <div>Detail Title</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide main-swiper-slide" style="position: relative;" data-cate="audition">
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
                                    <button class="btn opa"><span class="text">READ MORE</span><span class="close">CLOSE</span></button>
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
import Swiper, { Navigation, Pagination, Mousewheel } from 'swiper'
import 'swiper/swiper-bundle.css'

Swiper.use([ Navigation, Pagination ])

export default {
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
            //TODO pos값을 PC, 모바일 분리
            card_pos: [
                {
                    0: {
                        top: -14,
                        left: 24,
                        rotate: 0,
                    },
                    1: {
                        top: 14,
                        left: -70,
                        rotate: 0,
                    },
                    2: {
                        top: -20,
                        left: -40,
                        rotate: 0,
                    },
                    3: {
                        top: 70,
                        left: 40,
                        rotate: 0,
                    },
                }
            ],
            ran_v_card: {
                rotate: [-5, 0, 5],
                top_e: [-60, -40, -20],
                top_o: [20, 40, 60],
                left_e: [-100, -70, -20],
                left_o: [20, 70, 100],
            },
            active_slide_index: '',
            active_slide_cards: [],
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
            card_detail_show: false,
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
                    self.active_slide_index = this.realIndex;
                    self.active_slide_cards = $('.swiper-slide-visible[data-swiper-slide-index="'+this.realIndex+'"]').find('.card-list .card-item');

                    console.log('this.realIndex', this.realIndex, self.cate);
                    // $('.swiper-slide .card-item').css('border', 'none');
                    // $(self.active_slide_cards).css('border', '1px solid red');
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

        $('.card-item .btn.opa').on('click', function(e){
            console.log('opa');
            var $card = $(this).parents('.card-item');
            $(this).toggleClass('close');
            $card.find('.card-detail').toggleClass('view');
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
            if(self.cate_pg[self.cate] == index) {
                // self.viewCardDetail(index)(index);
            } else {
                // TODO 순차적으로 넘어가도록
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
            var $cards = self.active_slide_cards;
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
            var $cards = self.active_slide_cards;
            $cards.removeClass('active');
            $('.card-item .card-detail').removeClass('view');
            $('.card-item .btn.opa').removeClass('close');

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
                var card_w = Number($target.outerWidth());
                var card_h = Number($target.outerHeight());
                var card_l = Number($target.css('left').split('px')[0]);
                var card_t = Number($target.css('top').split('px')[0]);

                $target.css('top', -(card_t + card_h + 20));
                $target.css('z-index', $cards.length + 1);
                $target.addClass('active');
                setTimeout(function(){
                    $target.css('top', '50%');
                    self.arrangeCard(source);
                }, 300)
            } else {
                self.arrangeCard(source);
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
                        var top = Number(card.css('top').split('px')[0]);
                        var left = Number(card.css('left').split('px')[0]);

                        card.css('z-index', ($cards.length - self.order_card[$cate][i]) + 1);
                        //TODO 카드 덱 포지션 값 4개 만들고 로드할 때마다 랜덤 인덱스(0,1,2,3 사이)에서 시작해도록
                        card.css('top', top + self.card_pos[0][i].top);
                        card.css('left', left + self.card_pos[0][i].left);
                        card.find('.card-cover').css('transform', 'rotate('+self.card_pos[0][i].rotate+'deg)');

                        // if(index !== 0) {
                        //     if(index%2 == 0) {
                        //         // 짝수
                        //         card.css('left', top + self.ran_v_card['left_e'][Math.floor(Math.random() * self.ran_v_card['left_e'].length)]);
                        //         card.css('top', top + self.ran_v_card['top_e'][Math.floor(Math.random() * self.ran_v_card['top_e'].length)]);
                        //         // card.find('.card-cover').css('transform', 'rotate(-5deg)');
                        //     } else {
                        //         // 홀수
                        //         card.css('left', top + self.ran_v_card['left_o'][Math.floor(Math.random() * self.ran_v_card['left_o'].length)]);
                        //         card.css('top', top + self.ran_v_card['top_o'][Math.floor(Math.random() * self.ran_v_card['top_o'].length)]);
                        //         // card.find('.card-cover').css('transform', 'rotate(5deg)');
                        //     }
                        // }


                        // if(index !== 0) {
                        //     card.find('.card-cover').css('transform', 'rotate(' + self.ran_v_card['rotate'][Math.floor(Math.random() * self.ran_v_card['rotate'].length)] + 'deg');
                        //     card.css('top', top + self.ran_v_card['top'][Math.floor(Math.random() * self.ran_v_card['top'].length)]);
                        // }
                    }
                })
            } else {
                if(self.active_slide_index == 0) {
                    // loop로 복제된 슬라이드까지 카드 변경
                    $.each($('.swiper-slide[data-swiper-slide-index="'+self.active_slide_index+'"]'), function(index){
                        var $cards = $(this).find('.card-list .card-item');
                        for(var i = 0; i < $cards.length; i++) {
                            var card = $($cards[i]);
                            card.css('z-index', ($cards.length - self.order_card[self.cate][i]) + 1);
                        }
                    })
                } else {
                    $cards = self.active_slide_cards;
                    for(var i = 0; i < $cards.length; i++) {
                        var card = $($cards[i]);
                        card.css('z-index', ($cards.length - self.order_card[self.cate][i]) + 1);
                    }
                }
            }
        },
        viewCardDetail(index, event) {
            var self = this;
            var $cards = self.active_slide_cards;
            console.log('viewCardDetail', $cards);
            var card_v = $($cards[index]);

            card_v.find('.card-detail').addClass('view');
            card_v.css('top', '50%');
            card_v.css('left', '50%');
            self.card_detail_show = true;
        }
    }
}
</script>
