import I18n from "i18n-js"

import {
    Provider as LocalizationProvider,
    Context as LocalizationContext
} from "./provider"

const t = {
    string: (key, fallback = null, params = null) => {
        return I18n.t(key, {defaultValue: fallback, ...params})
    },
    page: (page, key, params = null) => {
        return I18n.t(`pages.${page}.${key}`, params)
    },
    component: (component, key, params = null) => {
        return I18n.t(`components.${component}.${key}`, params)
    }
}

export {
    LocalizationProvider,
    LocalizationContext,
    t
}