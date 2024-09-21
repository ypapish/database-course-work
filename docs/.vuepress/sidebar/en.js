import { sidebar } from 'vuepress-theme-hope';

export const enSidebar = sidebar({
  '/': [
    '',
    {
      text: 'Intro',
      prefix: 'intro/',
      link: 'intro/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Development of general requirements to the system',
      prefix: 'requirements',
      link: 'requirements/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Developing requirements for a functional system',
      prefix: 'use cases/',
      link: 'use cases/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Design of information support',
      prefix: 'design/',
      link: 'design/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Implementation of information and software',
      prefix: 'software/',
      link: 'software/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Testing the system performance',
      prefix: 'test/',
      link: 'test/',
      children: 'structure',
      collapsible: true,
    },
    {
      text: 'Conclusion',
      prefix: 'conclusion/',
      link: 'conclusion/',
      children: 'structure',
      collapsible: true,
    },
  ],
});
