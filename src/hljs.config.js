// code 高亮 样式
import "highlight.js/styles/atom-one-light.css"
import highlight from "highlight.js/lib/highlight"

// 注册需要高亮的语言
highlight.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
highlight.registerLanguage('css', require('highlight.js/lib/languages/css'));
highlight.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
highlight.registerLanguage('vbscript-html', require('highlight.js/lib/languages/vbscript-html'));
highlight.registerLanguage('htmlbars', require('highlight.js/lib/languages/htmlbars'));
highlight.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

export default highlight;