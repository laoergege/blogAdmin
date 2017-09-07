<template>
    <div class="layout">
        <mu-appbar title="blogAdmin" :titleClass="['titleClass']" />
        <div class="content">
            <mu-paper class="login-paper" :zDepth="2">
                <mu-avatar :src="avatar" :size="96" />
                <br/>
                <mu-text-field name="name" hintText="username" :required="true" icon="person" v-model.trim="name.value" :errorText="nameErr" @blur="onBlur($data.name)" />
                <br/>
                <mu-text-field name="pass" type="password" :required="true" hintText="password" icon="vpn_key" v-model.trim="pass.value" :errorText="passErr" @blur="onBlur($data.pass)" />
                <br/>
                <div>
                    <mu-flat-button label="forget password?" color="#bdbdbd" />
                    <mu-raised-button label="login" type="button" primary @click="login" />
                </div>
            </mu-paper>
        </div>
    </div>
</template>

<script>
import avatar from '@/assets/avatar.jpg';
import store from '@/store/store';
import config from '../config';
export default {
    name: 'login',
    data() {
        return {
            avatar: avatar,
            name: { value: '', touched: false, valid: false },
            pass: { value: '', touched: false, valid: false }
        }
    },
    computed: {
        nameErr() {
            if (this.name.touched) {
                if (this.name.value.trim().length != 0) {
                    this.name.valid = true;
                    return ''
                } else {
                    return '用户名不能为空';
                }
            }
            else
                return '';
        },
        passErr() {
            if (this.pass.touched) {
                if (this.pass.value.trim().length != 0) {
                    this.pass.valid = true;
                    return ''
                } else {
                    return '密码不能为空';
                }
            }
            else
                return '';
        }
    },
    store,
    methods: {
        login() {
            if (this.name.valid && this.pass.valid) {
                this.$store.dispatch('login', {
                    name: this.name.value,
                    pass: this.pass.value
                }).then(
                    (result) => {
                        if (result) {
                            this.$router.push('/')
                        }
                        else {
                            this.reset();
                        }
                    });
            }
        },
        onBlur(filed) {
            filed.touched = true;
        },
        reset() {
            this.name = { value: '', touched: false, valid: false },
                this.pass = { value: '', touched: false, valid: false }
        }
    }
}
</script>

<style scoped>
.layout {
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


