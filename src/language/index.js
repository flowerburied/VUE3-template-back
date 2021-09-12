import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    // something vue-i18n options here ...
    locale: 'zhCn', // 默认语言
    messages: {
        'zhCn': require("./zh-cn.js"),
        'en': require('./en.js')
    }
})

export default i18n