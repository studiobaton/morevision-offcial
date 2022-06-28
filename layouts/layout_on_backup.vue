<template>
    <div>
        <h1>test</h1>
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
            </ul>
        </client-only>
    </div>
</template>
<script>
export default {
    data() {
        return {
            language_show: false,
            sns_show: false,
            lang_key: 'LANGUAGE',
        }
    },
    methods:{
        langChange(event){
            var lang = event.target.value;
            console.log('langChange', lang);
            this.$router.push('/'+lang);
        },
    }
}
</script>
