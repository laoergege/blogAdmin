<template>
    <div class="layout">
        <mu-content-block>
            <mu-avatar :src="avatar" :size="68"/>
            <span>laoergege</span>
            <p>不要再玩了！</p>
        </mu-content-block>
    </div>
</template>

<script>
import avatar from '@/assets/logo.png';

export default {
    name: 'host',
    data() {
        return {
            avatar: avatar
        }
    }
}

</script>

<style lang="less" scoped>
@import "../../node_modules/muse-ui/less/vars.less"; // 默认基础的变量
.layout {
    background-color: @primaryColor
}
</style>
