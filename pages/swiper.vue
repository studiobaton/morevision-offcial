<template>
    <div class="page-test">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide card-item">Slide 1</div>
                <div class="swiper-slide card-item">Slide 2</div>
                <div class="swiper-slide card-item">Slide 3</div>
                ...
            </div>
            <!-- If we need pagination -->
            <div class="swiper-pagination"></div>

            <!-- If we need navigation buttons -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Mousewheel } from 'swiper'
import 'swiper/swiper-bundle.css'

Swiper.use([ Navigation, Pagination ])

export default {
    mounted() {
        new Swiper('.swiper-container', {
            modules: [ Mousewheel ],
            slidesPerView: 1,
            spaceBetween: 30,
            mousewheel: true,
            mousewheelControl: true,
            // loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
    }
}
</script>

<style>
.page-test {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.swiper-container {
    width: 400px;
    height: 500px;
}

.card-item {
    border: 1px solid #000;
    width: 100%;
    height: 100%;
}

.card-item:nth-child(1) {
    background: #eee;
}
.card-item:nth-child(2) {
    background: teal;
}
.card-item:nth-child(3) {
    background: olive;
}
</style>
