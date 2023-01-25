import type { IResources } from '~~/types'

const resources: IResources = reactive({
  components: {
    banner: {
      color: 'red',
      text: '',
      action: {
        href: '',
        text: '',
      },
    },
  },
})

export default resources
