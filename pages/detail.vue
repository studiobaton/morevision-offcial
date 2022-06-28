<template>
</template>
<script>
export default {
    mounted() {
        console.log(this.$route.query['id']);
        console.log(this.$route.query['lang']);
    },
}
</script>
