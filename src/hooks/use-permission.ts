import { myUseStore } from '@/store'

export function usePermission(pageName: string, hangleName: string) {
  const store = myUseStore()
  const permissions = store.state.loginModule.permissions

  const verifyPermissions = `system:${pageName}:${hangleName}`
  return !!permissions.find((item) => item === verifyPermissions)
}
