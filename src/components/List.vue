<template>
   <div class="content-left">
          <mu-appbar title="blog-admin">
            <mu-icon-button icon="menu" slot="left" @click="onOpenDrawer" />
          </mu-appbar>
          <mu-list @change="handleListChange" :value="activeList">
            <mu-list-item title="Sent mail" value="list1">
              <mu-icon slot="left" value="send" />
            </mu-list-item>
            <mu-list-item title="Drafts" value="list2">
              <mu-icon slot="left" value="drafts" />
            </mu-list-item>
            <mu-list-item title="Inbox" toggleNested value="list3">
              <mu-icon slot="left" value="inbox" />
              <mu-list-item slot="nested" title="Starred" value="list4">
                <mu-icon slot="left" value="grade" />
              </mu-list-item>
              <mu-list-item slot="nested" disabled title="Sent mail" toggleNested value="list5">
                <mu-icon slot="left" value="send" />
                <mu-list-item title="Drafts" slot="nested" value="list6">
                  <mu-icon slot="left" value="drafts" />
                </mu-list-item>
              </mu-list-item>
              <mu-list-item slot="nested" title="Inbox" toggleNested value="list7">
                <mu-icon slot="left" value="inbox" />
                <mu-list-item title="Drafts" slot="nested" value="list8">
                  <mu-icon slot="left" value="drafts" />
                </mu-list-item>
              </mu-list-item>
            </mu-list-item>
          </mu-list>
        </div>
</template>

<script scoped>
export default {
  name: 'list'
}
</script>
