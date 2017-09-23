import appBar from 'muse-components/appBar'
import { list, listItem } from 'muse-components/list'
import icon from 'muse-components/icon'
import subHeader from 'muse-components/subHeader'
import contentBlock from 'muse-components/contentBlock'
import iconButton from 'muse-components/iconButton'
import flatButton from 'muse-components/flatButton'
import raisedButton from 'muse-components/raisedButton'
import { col, row } from 'muse-components/grid'
import drawer from 'muse-components/drawer'
import avatar from 'muse-components/avatar'
import paper from 'muse-components/paper'
import textField from 'muse-components/textField'
import badge from 'muse-components/badge'
import iconMenu from 'muse-components/iconMenu'
import {menuItem} from 'muse-components/menu'
import dialog from 'muse-components/dialog'
import circularProgress from 'muse-components/circularProgress'

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
    [raisedButton.name]: raisedButton,
    [avatar.name]: avatar,
    [paper.name]: paper,
    [textField.name]: textField,
    [flatButton.name]: flatButton,
    [badge.name]: badge,
    [iconMenu.name]: iconMenu,
    [menuItem.name]: menuItem,
    [dialog.name]: dialog,
    [circularProgress.name]: circularProgress
}

export function registerComps(Vue) {
    Object.keys(comps).forEach(
        (compName, index) => {
            Vue.component(comps[compName].name, comps[compName]);
        }
    )
}




