<script lang="ts" setup>
import { useSlots } from 'vue'
export type Mode = 'replace-all' | 'replace-first'
export type Tag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface ExternalLink {
  href: string
  text: string
  [x: string]: any
}

export interface NuxtLink {
  text: string
  children?: NuxtLink[]
  [x: string]: any
}

// defineProps current dosn't accept imported Types
export type Link = NuxtLink | ExternalLink

export interface Props {
  enphasys?: string | string[]
  underline?: string | string[]
  bold?: string | string[]
  semiBold?: string | string[]
  medium?: string | string[]
  light?: string | string[]
  regular?: string | string[]
  highlight?: string | string[]
  link?: Link | Link[]
  tag?: Tag
  mode?: Mode
  color?: string
}

type Prop = keyof Props
type PropValue = string | Link
type BluePrint = Partial<Record<Prop, (value: PropValue) => string>>

const props = withDefaults(defineProps<Props>(), {
  tag: 'p',
  mode: 'replace-all',
  color: 'primary',
})

const { getColor } = useThemeController()
const highlightTextColor = getColor(props.color)

const slots = useSlots()
const slotRawText = slots.default ? slots.default()[0].children as string : ''
const slotText = getTextContent(slotRawText)

function getTextContent(text: string) {
  Object.entries(props).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        text = enchantText(text, val, key as Prop)
      })
    }
    else {
      text = enchantText(text, value, key as Prop)
    }
  })

  return text.split('\n')
}

function enchantText(text: string, val: PropValue, key: Prop) {
  const bluePrints: BluePrint = {
    enphasys: value => `<span class="font-italic">${value}</span>`,
    underline: value =>
        `<span class="text-decoration-underline">${value}</span>`,
    bold: value => `<span class="font-weight-bold">${value}</span>`,
    semiBold: value =>
        `<span class="font-weight-semi-bold">${value}</span>`,
    medium: value => `<span class="font-weight-medium">${value}</span>`,
    light: value => `<span class="font-weight-light">${value}</span>`,
    regular: value => `<span class="font-weight-regular">${value}</span>`,
    highlight: value =>
        `<span style="color: ${highlightTextColor}">${value}</span>`,
    link: (value) => {
      const { href, to, text: label, text_color, download, ...props } = value as Link
      let link

      try {
        if (to && typeof JSON.parse(to) === 'object') {
          const obj = JSON.parse(to)
          link = obj?.text || obj?.path || obj
          link = `${link}${obj.hash}`
        }
        else {
          link = href || (to && to) || undefined
        }
      }
      catch (error) {
        link = href || (to && to) || undefined
      }

      const { attrs, ay11n } = convertObjectToHTMLAtributes(props)

      return `<a href="${link}" ${attrs} ${download} target="${
          href ? '_blank' : ''
        }" class="pa-0 font-weight-bold text-primary ${
          text_color || ''
        }"text>${
          ay11n && `<span class="visually-hidden">${ay11n}</span>`
        }${label}</a>`
    },
  }

  if (!val || !Object.hasOwnProperty.call(bluePrints, key))
    return text

  const enchantMethod = bluePrints[key]
  if (!enchantMethod)
    return text

  const enchanted = enchantMethod(val)

  const needle = Object.hasOwnProperty.call(val, 'text')
    ? (val as Link).text
    : val as string
  return replaceText(text, needle, enchanted)
}

function replaceText(text: string, needle: string, value: string): string {
  if (!value || !text.includes(needle))
    return text
  else if (props.mode === 'replace-all')
    return text.replace(needle, value)
  else return text.replaceAll(needle, value)
}

function convertObjectToHTMLAtributes(obj: Record<string, any>) {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      let { attrs, ay11n } = acc

      if (key.includes('aria')) {
        attrs = `${attrs} ` + `${key}="${value}"`
        ay11n = `${ay11n}${value}`
      }
      else if (typeof value === 'boolean' && value) {
        attrs = `${attrs}${key}`
      }
      else {
        attrs = `${attrs} ` + `${key}="${value}"`
      }
      return { attrs, ay11n }
    },
    { attrs: '', ay11n: '' },
  )
}
</script>

<template>
  <component :is="tag" class="odp-text-container">
    <span v-for="(text, index) in slotText" :key="index" v-html="text" />
  </component>
</template>

<style lang="scss" scoped>
.odp-text-container {
  > span {
    display: block;
  }
}
</style>
