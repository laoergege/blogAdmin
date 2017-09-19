<template>
  <div>
    <mu-list>
      <mu-list-item :title="tag" v-for="(tag, index) in tags" :key="index" @click="goBook(book)">
        <mu-icon slot="left" value="local_offer" />
        <mu-icon slot="right" value="clear" @click.stop="clear(index)" />
      </mu-list-item>
      <mu-list-item>
        <mu-icon slot="left" value="local_offer" />
        <mu-text-field hintText="新标签" :fullWidth="true" ref="newTag" /><br/>
        <mu-icon slot="right" value="add" @click.stop="add($refs.newTag.inputValue) && ($refs.newTag.inputValue = '')" />
      </mu-list-item>
    </mu-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  LIST_TITLE
} from '../store/mutation-types';

export default {
  name: 'tags',
  computed: {
    ...mapState({
      tags(state) {
        return state.currentPosts.tags
      }
    }),
    ...mapState(['currentPosts'])
  },
  methods: {
    add(value) {
      this.$store.dispatch('addTag', {
        book: this.currentPosts.directory.split('/')[2],
        articleID: this.currentPosts._id,
        tag: value
      })
      return true;
    },
    clear(index) {
      this.$store.dispatch('removeTag', {
        book: this.currentPosts.directory.split('/')[2],
        articleID: this.currentPosts._id,
        tag: this.tags[index],
        index: index
      })
    }
  },
  created() {
    this.$store.commit(LIST_TITLE, '标签')
  },
  mounted() {
    let input = this.$refs.newTag.$refs.input;
    input.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.add(this.$refs.newTag.inputValue);
        this.$refs.newTag.inputValue = '';
      }
    })
  }
}
</script>
