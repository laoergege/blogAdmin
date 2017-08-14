import appBar from 'muse-components/appBar'
import { list, listItem } from 'muse-components/list'
import icon from 'muse-components/icon'
import subHeader from 'muse-components/subHeader'
import contentBlock from 'muse-components/contentBlock'
import iconButton from 'muse-components/iconButton'
import raisedButton from 'muse-components/raisedButton'
import { col, row } from 'muse-components/grid'
import drawer from 'muse-components/drawer'

const comps = {
    [appBar.name]: appBar,
    [list.name]: list,
    [listItem.name]: listItem,
    [icon.name]: icon,
    [subHeader.name]: subHeader,
    [contentBlock.name]: contentBlock,
    [iconButton.name]: iconButton,
    [col.name]: col,
    [row.name]: row,
    [drawer.name]: drawer,
    [raisedButton.name]: raisedButton
}

export function registerComps(Vue) {
    Object.keys(comps).forEach(
        (compName, index) => {
            Vue.component(comps[compName].name, comps[compName]);
        }
    )
}




