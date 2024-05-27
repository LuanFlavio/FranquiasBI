import { ICompany } from "../company/Company"

export interface IUsers {
  id: number
  name: string
  email: string
  password: string
  profile: string
  company: string
}

export interface IUsersDTO {
  id: number
  name: string
  email: string
  password: string
  profile: string
  company: ICompany
}
