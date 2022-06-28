// store/index.js
import axios from 'axios';

export const state = () => ({
    res: {},
    kr: {},
    en: {},
    jp: {},
    cn: {},
    lang : {},
    api: 'https://mvapi.ba-ton.kr/',
})


export const mutations = {
    getData(state, res) {
        state.res = res;
    },
    getKrData(state, kr) {
        state.kr = kr;
    },
    getEnData(state, en) {
        state.en = en;
    },
    getJpData(state, jp) {
        state.jp = jp;
    },
    getCnData(state, cn) {
        state.cn = cn;
    },
    setLang(state, lang) {
        state.lang = lang;
    },
    changeLang(state, lang) {
        state.lang = lang;
    }
}

export const actions = {
    async asyncData(context, params, $axios) {
        let lang;

        if(this.app.router.currentRoute.name.indexOf('-') !== -1) {
            lang = this.app.router.currentRoute.name.split('-')[0]
        } else {
            lang = this.app.router.currentRoute.name == 'index' ? 'kr' : this.app.router.currentRoute.name;
        }

        console.log(lang);

        const res = await this.$axios.$get('http://mvapi.ba-ton.kr/official/?lang='+lang);
        // @TODO 더 단순화하기!
        const kr = res.data['kr'];
        const en = res.data['en'];
        const jp = res.data['jp'];
        const cn = res.data['cn'];

        context.commit('getData', res.data[`${lang}`]);
        context.commit('getKrData', kr);
        context.commit('getEnData', en);
        context.commit('getJpData', jp);
        context.commit('getCnData', cn);
        context.commit('setLang', lang);
    },
    async nuxtServerInit({dispatch}) {
        await dispatch('asyncData')
    }
}
