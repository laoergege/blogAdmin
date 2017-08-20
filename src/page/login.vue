<template>
    <div class="layout">
        <mu-appbar title="blogAdmin" :titleClass="['titleClass']" />
        <div class="content">
            <mu-paper class="login-paper" :zDepth="2">
                <mu-avatar :src="avatar" :size="96" />
                <br/>
                <mu-text-field hintText="username" icon="person" />
                <br/>
                <mu-text-field hintText="password" icon="vpn_key" />
                <br/>
                <div>
                    <mu-flat-button label="forget password?" color="#bdbdbd"/>
                    <mu-raised-button label="login" primary/>
                </div>
            </mu-paper>
        </div>
    </div>
</template>

<script>
import avatar from '@/assets/avatar.jpg';

export default {
    name: 'login',
    data() {
        return {
            avatar: avatar
        }
    }
}
</script>

<style scoped>
.layout{
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.content {
    margin: auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-paper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 20px;
}
</style>


