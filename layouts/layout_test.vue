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
                <div class="swiper-slide main-swiper-slide" v-for="(item, index) in cate_list" :key="index" :data-cate="item">
                    <div class="btn-card">
                        <div class="btn-next" @click="nextCard">NEXT</div>
                        <div class="btn-next" @click="prevCard">PREV</div>
                    </div>
                    <div class="card-list">
                        <div class="card-item" v-for="(card, card_index) in cards[item]" :key="card_index" :data-index="card_index">
                            <div class="card-cover" v-bind:style="{backgroundImage: 'url('+card.cover+')'}">
                                <div class="caption">{{item}}</div>
                                <div>
                                    <h2>{{card.title}}</h2>
                                    <button @click="viewCardDetail" class="btn opa">READ MORE</button>
                                </div>
                            </div>
                            <!-- <div class="card-detail view-more" :class="item">
                                <div class="detail-content">
                                    <h3 class="title"></h3>
                                    <div class="desc ko">
                                        <h5>
                                            허니제이는 2017년 결성된 댄스 크루 HolyBang (홀리뱅)의 수장으로 스트릿댄스, 특히 걸스힙합 분야에서 자기만의 스타일을
                                            ‘하나의 표준’으로 만들었다는 평가를 받고 있는 안무가 겸 댄서입니다. 2021년 Mnet ‘스트릿 우먼 파이터’를 통해 압도적인 아우라로 최종 우승을 이끌어내었고, 이후 다양한 방송 활동을 통해 반전 매력을 가감없이 보여주며 대중의 많은 사랑을 받고 있습니다. 또한 다양한 아티스트들의 댄스 트레이닝 뿐만 아니라 고교 및 대학 강의 출강 등 후학 양성에도 힘쓰고 있습니다.
                                        </h5>
                                    </div>
                                </div>
                            </div> -->
                            <div class="card-detail view-more about" v-if="item == 'about'">
                                <div class="detail-content">
                                    <h3 class="title">ABOUT</h3>
                                    <div class="desc ko">
                                        <h5>
                                            모어비전은 AOMG, H1GHR MUSIC, WON SOJU 등 힙합, R&B 장르 문화 기반의 감각적인 브랜드를 전개해나갔던 박재범이 2022년 3월에 설립한 새로운 엔터테인먼트 허브입니다.
                                            <br><br>
                                            <em>주소</em>
                                            서울시 마포구 양화로 12길1 20F
                                            <br><br>
                                            <em>주소</em>
                                            서울시 마포구 양화로 12길1 20F
                                        </h5>
                                    </div>
                                    <h3 class="title">HIRING</h3>
                                    <div class="desc ko">
                                        <h5>
                                            모어비전은 AOMG, H1GHR MUSIC, WON SOJU 등 힙합, R&B 장르 문화 기반의 감각적인 브랜드를 전개해나갔던 박재범이 2022년 3월에 설립한 새로운 엔터테인먼트 허브입니다.
                                            <br><br>
                                            <em>채용</em>
                                            morevision.kr/careers
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div class="card-detail view-more artists" v-if="item == 'artists'">
                                <div class="detail-content">
                                    <h3 class="title">ABOUT</h3>
                                    <div class="desc ko">
                                        <p>
                                            허니제이는 2017년 결성된 댄스 크루 HolyBang (홀리뱅)의 수장으로 스트릿댄스, 특히 걸스힙합 분야에서 자기만의 스타일을
                                            ‘하나의 표준’으로 만들었다는 평가를 받고 있는 안무가 겸 댄서입니다. 2021년 Mnet ‘스트릿 우먼 파이터’를 통해 압도적인 아우라로 최종 우승을 이끌어내었고, 이후 다양한 방송 활동을 통해 반전 매력을 가감없이 보여주며 대중의 많은 사랑을 받고 있습니다. 또한 다양한 아티스트들의 댄스 트레이닝 뿐만 아니라 고교 및 대학 강의 출강 등 후학 양성에도 힘쓰고 있습니다.
                                        </p>
                                    </div>
                                    <div class="album-swiper-container">
                                        <div class="swiper-wrapper">
                                            <div class="swiper-slide">
                                                <div>
                                                    <img src="~/assets/images/dummy/album_1.png" alt="">
                                                </div>
                                                <div>
                                                    <p>Baddest Nice Guys</p>
                                                    <p>Video · 2021</p>
                                                </div>
                                            </div>
                                            <div class="swiper-slide">
                                                <div>
                                                    <img src="~/assets/images/dummy/album_3.png" alt="">
                                                </div>
                                                <div>
                                                    <p>Baddest Nice Guys</p>
                                                    <p>Video · 2021</p>
                                                </div>
                                            </div>
                                            <div class="swiper-slide">
                                                <div>
                                                    <img src="~/assets/images/dummy/album_4.png" alt="">
                                                </div>
                                                <div>
                                                    <p>Baddest Nice Guys</p>
                                                    <p>Video · 2021</p>
                                                </div>
                                            </div>
                                            <div class="swiper-slide">
                                                <div>
                                                    <img src="~/assets/images/dummy/album_1.png" alt="">
                                                </div>
                                                <div>
                                                    <p>Baddest Nice Guys</p>
                                                    <p>Video · 2021</p>
                                                </div>
                                            </div>
                                            <div class="swiper-slide">
                                                <div>
                                                    <img src="~/assets/images/dummy/album_1.png" alt="">
                                                </div>
                                                <div>
                                                    <p>Baddest Nice Guys</p>
                                                    <p>Video · 2021</p>
                                                </div>
                                            </div>
                                            <div class="swiper-slide">
                                                <div>
                                                    <img src="~/assets/images/dummy/album_1.png" alt="">
                                                </div>
                                                <div>
                                                    <p>Baddest Nice Guys</p>
                                                    <p>Video · 2021</p>
                                                </div>
                                            </div>
                                            <div class="swiper-slide">
                                                <div>
                                                    <img src="~/assets/images/dummy/album_1.png" alt="">
                                                </div>
                                                <div>
                                                    <p>Baddest Nice Guys</p>
                                                    <p>Video · 2021</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
            ran_v_card: {
                rotate: [-10, 0, 10],
                top: [-40, -20, 0, 20, 40],
                left: [-70, -20, 0, 20, 70]
            },
            active_slide_index: '',
            active_slide_cards: [],
            current_pg: 0,
            cards: {
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

            },
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
                    self.active_slide_index = this.realIndex;
                    self.active_slide_cards = $('.swiper-slide-visible[data-swiper-slide-index="'+this.realIndex+'"]').find('.card-list .card-item');

                    console.log('this.realIndex', this.realIndex, self.cate);
                    $('.swiper-slide .card-item').css('border', 'none');
                    $(self.active_slide_cards).css('border', '1px solid red');
                    // console.log($('.swiper-slide[data-swiper-slide-index="'+self.active_slide_index+'"]').not('.swiper-slide-duplicate').find('.card-list .card-item'));
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

        const album_swiper = new Swiper('.album-swiper-container', {
            slidesPerView: 4,
            freeMode: true,
        });
    },
    methods:{
        showMenu(){
            $('.swiper-pagination').toggleClass('active')
        },
        clickCard(e) {
            var self = this;
            var index = $(e.target).parents('.card-item').data('index');
            if(self.cate_pg[self.cate] == index) {
                self.viewCardDetail(index);
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
            $('.card-item .card-detail').removeClass('view');
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
            $('.card-item .card-detail').removeClass('view');
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
            var $cards = self.active_slide_cards;
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
                var card_w = Number($target.outerWidth());
                var card_h = Number($target.outerHeight());
                var card_l = Number($target.css('left').split('px')[0]);
                var card_t = Number($target.css('top').split('px')[0]);

                // $target.css('left', card_l + card_w + 80);
                $target.css('top', -(card_t + card_h + 20));
                $target.css('z-index', $cards.length + 1);
                $target.addClass('active');
                setTimeout(() => {
                    // $target.css('left', '50%');
                    $target.css('top', '50%');
                    this.arrangeCard(source);
                }, 300);
                // this.arrangeCard(source);
            } else {
                this.arrangeCard(source);
            }

            // Loop로 복사된 슬라이드 조절
            if(self.active_slide_index == 0) {
                var $cards = $('.swiper-');
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
                    var card_w = Number($target.outerWidth());
                    var card_h = Number($target.outerHeight());
                    var card_l = Number($target.css('left').split('px')[0]);
                    var card_t = Number($target.css('top').split('px')[0]);

                    // $target.css('left', card_l + card_w + 80);
                    $target.css('top', -(card_t + card_h + 20));
                    $target.css('z-index', $cards.length + 1);
                    $target.addClass('active');
                    setTimeout(() => {
                        // $target.css('left', '50%');
                        $target.css('top', '50%');
                        this.arrangeCard(source);
                    }, 300);
                    // this.arrangeCard(source);
                } else {
                    this.arrangeCard(source);
                }
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
                        // 짝수, 홀수 따라 왼쪽, 오른쪽 번갈아가면서 추출
                        // card.css('top', top + self.ran_v_card['top'][Math.floor(Math.random() * self.ran_v_card['top'].length)]);
                        // card.css('left', top + self.ran_v_card['left'][Math.floor(Math.random() * self.ran_v_card['left'].length)]);
                        // card.find('.card-cover').css('transform', 'rotate(' + self.ran_v_card['rotate'][Math.floor(Math.random() * self.ran_v_card['rotate'].length)] + 'deg');
                    }
                })
            } else {
                // $cards = $('.swiper-slide[data-cate="'+self.cate+'"] .card-list .card-item');
                $cards = self.active_slide_cards;
                for(var i = 0; i < $cards.length; i++) {
                    var card = $($cards[i]);
                    card.css('z-index', ($cards.length - self.order_card[self.cate][i]) + 1);
                }
            }
        },
        viewCardDetail(index) {
            var self = this;
            console.log('viewCardDetail');
            // var $cards = $('.swiper-slide')[self.active_slide_index];
            // console.log(self.active_slide_index);
            // var $cards = $('.swiper-slide[data-cate="'+self.cate+'"] .card-list .card-item');
            var $cards = self.active_slide_cards;
            $($cards[index]).find('.card-detail').addClass('view');
            $($cards[index]).css('top', '50%');
            $($cards[index]).css('left', '50%');
        }
    }
}
</script>
