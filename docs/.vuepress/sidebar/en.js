import { sidebar } from 'vuepress-theme-hope';

export const enSidebar = sidebar({
  '/': [
    '',
    {
      text: 'Вступ',
      prefix: 'intro/',
      link: 'intro/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Розроблення загальних вимог до системи',
      prefix: 'requirements',
      link: 'requirements/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Розроблення вимог до функціональної системи',
      prefix: 'use cases/',
      link: 'use cases/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Проєктування інформаційного забезпечення',
      prefix: 'design/',
      link: 'design/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Реалізація інформаційного та програмного забезпечення',
      prefix: 'software/',
      link: 'software/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Тестування процездатності системи',
      prefix: 'test/',
      link: 'test/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Висновки',
      prefix: 'conclusion/',
      link: 'conclusion/',
      children: 'structure',
      collapsible: true,
    },
  ],
});
