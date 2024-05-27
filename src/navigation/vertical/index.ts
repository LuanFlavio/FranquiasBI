// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Visão Geral',
      icon: 'mdi:home-outline',
      children:[
        {
          title: 'Dashboard',
          path: '/home',
        }]
    },
    {
      title: 'Compras',
      icon: 'mdi:archive-outline',
      children:[
        {
          title: 'Comparativos',
          path: '/compras/comparativos',
        },
        {
          title: 'Mix de Produtos',
          path: '/compras/mix-produtos'
        },
        {
          title: 'Variação de Preços',
          path: '/compras/variacao-preco'
        },
      ]
    },
    {
      title: 'Configurações',
      icon: 'mdi:cog-outline',
      children:[
        {
          title: 'Usuários',
          path: '/config/user',
        },
      ]
    }
  ]
}

export default navigation
