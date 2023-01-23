export const useAuthApi = () => {
  const { baseUrl } = useAppConfig()

  const login = async (credentials: { username: string; password: string }) => useFetch(() => `${baseUrl}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    server: false,
  })

  const getUser = async () => useFetch(() => `${baseUrl}/auth/user`, {
    server: false,
  })

  return { login, getUser }
}
