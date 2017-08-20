<template>
    <div>
        <textarea id="editor"></textarea>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
    name: 'editor',
    components: {
        mavonEditor
    }
}

</script>

<style scoped>
#editor {
    height: 100%;
    width: 100%
}

textarea {
    border: none;
    outline: none;
}
</style>
