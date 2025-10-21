export interface UserRequest {
  razao_social: string
  cnpj: string
  phone: string
  email: string
  password: string
  confirmPassword?: string
}
