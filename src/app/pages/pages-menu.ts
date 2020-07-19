import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/inicio',
    home: true,
  },
  {
    title: 'Registrar Entrada/Saída',
    icon: 'pricetags-outline',
    link: '/pages/entrada-saida/list',
  },
  {
    title: 'DATABASE',
    group: true,
  },
  {
    title: 'Usuários',
    icon: 'people-outline',
    link: '/pages/usuario/list',
  },
  {
    title: 'Veículos',
    icon: 'car-outline',
    link: '/pages/veiculo/list',
  },
  {
    title: 'Relatórios',
    icon: 'pie-chart-outline',
    link: '',
  },
  {
    title: 'Configurações',
    icon: 'settings-outline',
    link: '/pages/configuracoes',
  }
];
