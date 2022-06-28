<template>
<div id="app">
    <header>
        <client-only>
        <ul class="menu-list">
            <li>
                <span @click="language_show = !language_show, sns_show = false">LANGUAGE</span>
                <select class="lang-select" name="language" @change="langChange" v-model="lang_key">
                    <option>LANGUAGE</option>
                    <option value="kr">Korean</option>
                    <option value="en">English</option>
                    <option value="jp">Japanese</option>
                    <option value="ch">Chinese</option>
                </select>
            </li>
            <li>
                <span @click="sns_show = !sns_show, language_show = false">SNS</span>
                <select class="sns-select" name="sns" @change="snsChange" v-model="sns_key">
                    <option >SNS</option>
                    <option value="twitter">Twitter</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">Youtube</option>
                    <option value="tictok">Tictok</option>
                </select>
            </li>
        </ul>
        </client-only>
        <ul class="toggle-navigation" v-if="language_show == true">
            <li><a>Korean</a></li>
            <li><a>English</a></li>
            <li><a>Japanese</a></li>
            <li><a>Chinese</a></li>
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
                        <div class="card-item" v-for="(card, card_index) in cards[item]" :key="card_index" :class="card.type" :data-index="card_index" :data-menu="item">
                            <div class="card-cover" :style="{backgroundImage: 'url('+card.thumb_img+')'}">
                                <div class="caption">{{item}}</div>
                                <div>
                                    <h2>{{card.title}}</h2>
                                    <div v-if="card.type == 'link'" class="btn opa link">
                                        <a :href="card.link" target="_blank">Go to Link</a>
                                    </div>
                                    <button v-else class="btn opa" @click="viewCardDetailMo">
                                        <span class="text" v-if="card.type == 'text'">Read More</span>
                                        <span class="text" v-else-if="card.type == 'video'">Play</span>
                                        <span class="close">CLOSE</span>
                                    </button>
                                </div>
                            </div>
                            <div class="card-detail view-more" :class="item">
                                <div class="mo-close-btn"></div>
                                <div class="detail-content">
                                    <div class="mobile-bar"></div>
                                    <!-- about -->
                                    <div v-if="item == 'about'">
                                        <div v-for="(detail, dateil_index) in card.detail" class="detail-item" :key="dateil_index">

                                            <h3 class="title">{{detail.sub_title}}</h3>
                                            <div class="desc" v-html="detail.desc"></div>
                                        </div>
                                    </div>
                                    <!-- artists -->
                                    <div v-else-if="item == 'artists'">
                                        <h3 class="title">ABOUT</h3>
                                        <!-- {{card}} -->
                                        <div class="desc" v-html="card.detail"></div>
                                        <div class="album-swiper-container">
                                            <div class="swiper-wrapper">
                                                <div v-for="(album, album_index) in card.album_video[0].content" class="swiper-slide" :key="album_index">
                                                    <div class="ablum-item">
                                                        <div>
                                                            <img :src="album.image">
                                                        </div>
                                                        <div>
                                                            <p>{{album.title}}</p>
                                                            <p>{{album.category}} · {{album.year}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- careers -->
                                    <div v-else-if="item == 'careers'">
                                        <div v-for="(detail, dateil_index) in card.detail" class="detail-item" :key="dateil_index">
                                            <h3 class="title">{{detail.sub_title}}</h3>
                                            <div class="desc" v-html="detail.desc"></div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="card.type == 'video'" class="detail-video">
                                    <div class="vimeo-wrapper">
                                        <iframe :src="'https://player.vimeo.com/video/'+card.vimeo_id+'?h=70cc5b87d4&title=0&byline=0&portrait=0'" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
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
        <div class="card-back"></div>
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
            card_pos_pc: [
                {
                    0: {
                        top: -40,
                        left: 24,
                        rotate: 0,
                    },
                    1: {
                        top: 40,
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
                    4: {
                        top: -40,
                        left: 24,
                        rotate: 0,
                    },
                    5: {
                        top: 40,
                        left: -70,
                        rotate: 0,
                    },
                    6: {
                        top: -20,
                        left: -40,
                        rotate: 0,
                    },
                    7: {
                        top: 70,
                        left: 40,
                        rotate: 0,
                    },
                }
            ],
            card_pos_mo: [
                {
                    0: {
                        top: 0,
                        left: 0,
                        rotate: 0,
                    },
                    1: {
                        top: 0,
                        left: 0,
                        rotate: 0,
                    },
                    2: {
                        top: 0,
                        left: 0,
                        rotate: 0,
                    },
                    3: {
                        top: 0,
                        left: 0,
                        rotate: 0,
                    },
                    4: {
                        top: 0,
                        left: 0,
                        rotate: 0,
                    },
                    5: {
                        top: 0,
                        left: 0,
                        rotate: 0,
                    },
                    6: {
                        top: 0,
                        left: 0,
                        rotate: 0,
                    },
                    7: {
                        top: 0,
                        left: 0,
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
            is_swiper: false,
            is_detail: false,
            lang_key: 'LANGUAGE',
            sns_key: 'SNS'
        }
    },
    computed: {
        cards() {
            return this.$store.state.res
        }
    },
    mounted() {
        // swiper
        var self = this;
        var menu = self.cate_list;
        var page_swiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            slidesPerView: "auto",
            spaceBetween: 0,
            centeredSlides: true,
            loop: true,
            allowTouchMove: true,
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
            breakpoints :{
                768: {
                    allowTouchMove: false,
                    speed: 800,
                }
            },
            on: {
                slideChange: function () {
                    var currIndex = this.realIndex;
                    var prevIndex = currIndex - 1;
                    var nextIndex = currIndex + 1;

                    if(currIndex == 0){prevIndex = 3;};
                    if(currIndex == 3){nextIndex = 0;};

                    self.cate = menu[currIndex];
                    self.active_slide_index = this.realIndex;
                    self.active_slide_cards = $('.swiper-slide-visible[data-swiper-slide-index="'+this.realIndex+'"]').find('.card-list .card-item');

                    $('.curr-loca h1').text(self.cate);
                    $('.swiper-button-prev h2').text(menu[prevIndex]);
                    $('.swiper-button-next h2').text(menu[nextIndex]);

                    console.log('this.realIndex', this.realIndex, self.cate);
                    $('.card-item.active').removeClass('view');
                    // 슬라이더 이동하는 동안 클릭 방지 + 카드 변경 방지
                    self.is_swiper = true;
                    $(window).on('click', function(e){
                        e.preventDefault();
                    })
                },
                slideChangeTransitionEnd: function() {
                    console.log('slideChangeTransitionEnd');
                    self.is_swiper = false;
                    $(self.active_slide_cards[0]).addClass('active');
                }
            },
        });

        // card init
        $.each(self.cate_list, function(index, item){
            // self.order_card[item] = Array.from(Array($('.swiper-slide[data-cate="'+item+'"] .card-list .card-item').length).keys());
            self.order_card[item] = Array.from(Array(self.cards[`${item}`].length).keys());
        })

        console.log(self.order_card);

        self.changeCard('init');

        // card click
        $(document).on('click', '.card-item:not(.active)', function(e){
            self.clickCard(e);
        })

        $(document).on('click', '.card-item .btn.opa', function(e){
            var $card = $(this).parents('.card-item');
            if($card.hasClass('active')){
                $(this).toggleClass('close');
                $card.toggleClass('view');
                $card.toggleClass('hide');
                $('.card-item').toggleClass('hide');
                $('.card-back').toggleClass('view');

                if($(this).hasClass('close') == true) {
                    self.is_detail = true;
                    $('#app .card-detail').off('scroll touchmove mousewheel');
                } else {
                    self.is_detail = false;
                    $('#app .card-detail').on('scroll touchmove mousewheel', function(e){
                        self.is_detail = false;
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    })
                }

                if($card.data('menu') == 'artists') {
                    self.initArtistSwiper();
                }
            }
        })


        // card wheel - PC
        // $().addEventListener("wheel", function(e){
        //     e.preventDefault();
        // },{passive : false});

        var wheel_t = 0;

        $(window).on('wheel', function(e) {
            clearTimeout(wheel_t);
            wheel_t = setTimeout(function () {
                wheel(e)
            }, 100)
        })

        function wheel(e) {
            var delta_y = e.originalEvent.deltaY;
            console.log(delta_y);

            if(delta_y < -30 && self.is_detail == false) {
                self.nextCard();
            }

            if(delta_y > 30 && self.is_detail == false) {
                self.prevCard();
            }
        }

        $('#app .card-detail').on('scroll touchmove mousewheel', function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        })

        // card touch - mobile
        var touch_s;

        $(document).on('touchstart', function(e){
            touch_s = e.originalEvent.touches[0].clientY;
        })

        $(document).on('touchend', function(e){
            var touch_e = e.originalEvent.changedTouches[0].clientY;

            if(touch_s > touch_e && self.is_swiper == false && self.is_detail == false) {
                self.nextCard();
            }

            if(touch_s < touch_e && self.is_swiper == false && self.is_detail == false) {
                self.prevCard();
            }
        })
    },
    methods:{
        langChange(event){
            var lang = event.target.value;
            console.log('langChange', lang);
            this.$router.push('/'+lang);
        },
        snsChange(event){
            console.log('snsChange');
            console.log(event.target.value);
            window.open('/', '_blank');
        },
        showMenu(){
            if(!$('.menu-btn').hasClass('active')){
                $('.menu-btn').addClass('active');
                $('header').addClass('menu-active');
                $('.swiper-pagination').css('top', '0');
                $('.swiper-container').css('top', '276px');
                $('footer').addClass('menu-active');
            }else{
                $('.menu-btn').removeClass('active');
                $('header').removeClass('menu-active');
                $('.swiper-pagination').css('top', '-276px');
                $('.swiper-container').css('top', '0');
                $('footer').removeClass('menu-active');
            }

        },
        clickCard(e) {
            var self = this;
            var card = $(e.target).parents('.card-item');
            var index = card.data('index');
            console.log('card-data-idx', index);
            var $list = $(card).parents('.card-list');
            var $cards = $($list).find('.card-item');
            var $cate = self.cate;

            if(self.order_card[$cate].length > 1) {
                var $cate = self.cate;
                var other = [];

                $($list).find('.card-item').each(function(card_index, item){
                    if(index !== $(this).data('index')) {
                        other.push(item);
                    }
                })

                $list.empty();
                $list.prepend(card);
                // console.log('default', other);

                other.sort(self.zindexDesc);

                // console.log('sort', other);
                // 나머지 추가
                for(var key in other) {
                    $list.append(other[key]);
                }
                // card.css('z-index', $cards.length + 1);
                // card.animate({
                //     opacity: 0.25,
                // }, 500, function(){
                //     for(var i = 0; i< $cards.length; i++) {
                //         var item = $($cards[i]);
                //         console.log($(item));
                //         $(item).css('z-index', ($cards.length + 1 - i));
                //     }
                //     console.log('callback');
                // });
                // console.log(card);
                // card.css('z-index', $cards.length + 1);
                // console.log(self.order_card[$cate]);
                var $cards_new = $list.find('.card-item');
                for(var i = 0; i < $cards_new.length; i++) {
                    // console.log(self.order_card[$cate][i]);
                    var item = $($cards_new[i]);
                    // console.log('z-index', $(item), ($cards_new.length - self.order_card[$cate][i]) + 1);
                    $(item).css('z-index', $cards_new.length - i + 1);
                    // $(item).css('z-index', ($cards.length - self.order_card[self.cate][i]) + 1);
                }

                $cards.removeClass('active');
                $($cards_new[0]).addClass('active');
                self.active_slide_cards = $cards_new;
                self.cate_pg[$cate] = 0;
                self.order_card[$cate].sort(self.cardOrderAsc);
            }
        },
        nextCard() {
            var self = this;
            var $cards = self.active_slide_cards;
            console.log('nextCard');
            if(self.is_detail == false && self.order_card[self.cate].length > 1) {
                if(self.cate_pg[self.cate] < $cards.length - 1) {
                    self.cate_pg[self.cate]++;
                } else {
                    self.cate_pg[self.cate] = 0;
                }

                self.order_card[self.cate].unshift(self.order_card[self.cate].pop());
                self.changeCard('next');
                console.log('next', self.order_card[self.cate]);
            }
        },
        prevCard() {
            var self = this;
            console.log('prevCard');
            if(self.is_detail == false && self.order_card[self.cate].length > 1) {
                if(self.cate_pg[self.cate] > 0) {
                    self.cate_pg[self.cate]--;
                } else {
                    // prev loop
                    self.cate_pg[self.cate] = self.order_card[self.cate].length - 1;
                }

                self.order_card[self.cate].push(self.order_card[self.cate].shift());
                this.changeCard('prev');
                console.log('prev', self.order_card[self.cate]);
            }
        },
        changeCard(source, index) {
            console.log('changeCard');
            var self = this;
            var $target;
            var $cards = self.active_slide_cards;
            $cards.removeClass('active');
            $('.card-item .btn.opa').removeClass('close');

            console.log('pg', self.cate_pg[self.cate]);
            switch (source) {
                case 'next':
                    if(self.cate_pg[self.cate] - 1 < 0) {
                        $target = $($cards[$cards.length - 1] );
                        $($cards[0]).addClass('active');
                    } else {
                        $target = $($cards[self.cate_pg[self.cate] - 1]);
                        $target.next().addClass('active');
                    }
                    console.log('next-target', $target);
                    break;
                case 'prev':
                    $target = $($cards[self.cate_pg[self.cate]]);
                    console.log('prev-target', $target);
                    $target.addClass('active');
                    break;
            }

            var duration = 0.3;

            if($target) {
                var card_w = Number($target.outerWidth());
                var card_h = Number($target.outerHeight());
                var card_l = Number($target.css('left').split('px')[0]);
                var card_t = Number($target.css('top').split('px')[0]);

                // $target.css('top', -(card_t + card_h + 20));
                console.log($target);
                $target.css('top', -(card_h * .7));
                $target.css('z-index', $cards.length + 1);
                setTimeout(function(){
                    $target.css('top', card_t);
                    self.arrangeCard(source);
                }, 300)
            } else {
                self.arrangeCard(source);
            }
        },
        arrangeCard(source) {
            var self = this;
            // console.log('arrangeCard', source, self.cate);
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
                        if($(window).outerWidth() > 767) {
                            card.css('top', top + self.card_pos_pc[0][i].top);
                            card.css('left', left + self.card_pos_pc[0][i].left);
                            card.find('.card-cover').css('transform', 'rotate('+self.card_pos_pc[0][i].rotate+'deg)');
                        } else {
                            card.css('top', top + self.card_pos_mo[0][i].top);
                            card.css('left', left + self.card_pos_mo[0][i].left);
                            card.find('.card-cover').css('transform', 'rotate('+self.card_pos_mo[0][i].rotate+'deg)');
                        }
                    }
                    $($cards[0]).addClass('active');
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
            // var self = this;
            // var $cards = self.active_slide_cards;
            // console.log('viewCardDetail', $cards);
            // var card_v = $($cards[index]);

            // card_v.find('.card-detail').addClass('view');
            // card_v.css('top', '50%');
            // card_v.css('left', '50%');
            // self.card_detail_show = true;
        },
        viewCardDetailMo(e){
            var self = this;
            var target_list = $(e.target).parents('.card-list');

            // if mobile
            if(window.innerWidth < 767) {
                $('.card-list').not(target_list).addClass('d-none');
                $('.card-list').addClass('active');
                $('.menu-btn ').addClass('d-none');
                $('footer').addClass('d-none');
            }
        },
        zindexDesc(a, b) {
            if($(a).css('z-index') > $(b).css('z-index')) {
                return -1;
            }
            if($(a).css('z-index') < $(b).css('z-index')) {
                return 1;
            }
            return 0;
        },
        cardOrderAsc(a, b) {
            if(a < b) {
                return -1;
            }
            if(a > b) {
                return 1;
            }
            return 0;
        },
        initArtistSwiper() {
            console.log($('.main-swiper-slide[data-cate="artists"]').find('.card-item.active'));
            console.log('initArtistSwiper', $('.main-swiper-slide[data-cate="artists"]').find('.card-item.active').find('.album-swiper-container'));
            var album_swiper = new Swiper($('.card-item.active').find('.album-swiper-container'), {

            })
        }
    }
}
</script>
