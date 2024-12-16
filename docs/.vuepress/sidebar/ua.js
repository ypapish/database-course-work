import { sidebar } from 'vuepress-theme-hope';

export const uaSidebar = sidebar({
  '/': [
    '',
    {
      text: 'Вступ',
      prefix: 'ua/intro/',
      link: 'ua/intro/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Розроблення загальних вимог до системи',
      prefix: 'ua/requirements/',
      link: 'ua/requirements/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Розроблення вимог до функціональної системи',
      prefix: 'ua/use cases/',
      link: 'ua/use cases/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Проєктування інформаційного забезпечення',
      prefix: 'ua/design/',
      link: 'ua/design/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Реалізація інформаційного та програмного забезпечення',
      prefix: 'ua/software/',
      link: 'ua/software/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Тестування процездатності системи',
      prefix: 'ua/test/',
      link: 'ua/test/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Висновки',
      prefix: 'ua/conclusion/',
      link: 'ua/conclusion/',
      children: 'structure',
      collapsible: true,
    },
  ],
});
