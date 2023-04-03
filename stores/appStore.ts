type BufferStatus = 'success' | 'error' | 'pending'
interface IBuffer {
  currentStep: number
  totalSteps: number
  status: BufferStatus
  message?: string
}

interface IBufferStep {
  step: number
  status: BufferStatus
  message: string
}

const default_buffer: IBuffer = {
  currentStep: 0,
  status: null,
  totalSteps: null,
  message: '',
}

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const buffer = ref<IBuffer>(default_buffer)

  const startBuffering = (totalSteps: number, message = '') => {
    loading.value = true
    buffer.value = {
      ...default_buffer,
      status: 'pending',
      totalSteps,
      message,
    }
  }

  const stopBuffering = () => {
    return new Promise(resolve => setTimeout(() => {
      loading.value = false
      buffer.value = default_buffer
      resolve(true)
    }, 2500))
  }

  const updateBuffer = async (bufferStep?: Partial<IBufferStep>) => {
    if (!buffer.value.status)
      return

    const step = bufferStep?.step || buffer.value.currentStep + 1

    buffer.value.currentStep = step > buffer.value.totalSteps ? buffer.value.totalSteps : step
    buffer.value.message = bufferStep?.message || buffer.value.message
    buffer.value.status = (bufferStep?.status || 'pending')

    if (!!bufferStep && bufferStep?.status !== 'pending')
      await stopBuffering()
  }

  watch(() => loading.value, (newValue) => {
    if (!newValue)
      buffer.value = default_buffer
  })

  const bufferPercentage = computed(() => buffer.value ? (buffer.value.currentStep / buffer.value.totalSteps) * 100 : 0)

  return { loading, buffer, bufferPercentage, startBuffering, updateBuffer }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
