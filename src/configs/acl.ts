import { AbilityBuilder, Ability } from '@casl/ability'
import { IUsers } from 'src/@core/models'

export type Subjects = 'all' | 'financialBoleto' | 'financialContasAPagar' | string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete' | 'View' | string

export type AppAbility = Ability<[Actions, Subjects]>

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: Subjects
}

export type ProductACL = {
  id: string
  permission: string //actions
  module: string //subject
}

//  Como era
//  const defineRulesFor = (role: string, subject: string) => {
//   const { can, rules } = new AbilityBuilder(AppAbility)

//   if (role === 'admin') {
//     can('manage', 'all')
//   } else if (role === 'client') {
//     can(['read'], 'acl-page')
//   } else {
//     can([ 'create','read', 'update', 'delete'], subject)
//   }

//   return rules
// }

const defineRulesFor = (user: IUsers) => {
  const { can, rules } = new AbilityBuilder(AppAbility)
  if(false){ console.log(user) }

  // user.users.map(u => {
  //   u.permissions.map(p => {
  //     can('manage', p.module)
  //     // can(p.permission, p.module)
  //     })
  // })
  can('manage','all')

  return rules
}

export const buildAbilityFor = (user: IUsers): AppAbility => {
  return new AppAbility(defineRulesFor(user), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
