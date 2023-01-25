import type { IResources } from '~~/types'

const resources: IResources = reactive({
  components: {
    banner: {
      color: 'bg-primary-darken-2',
      text: '',
      action: {
        href: '',
        text: '',
      },
    },
  },
})

export default resources
