import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import MarkdownItPlantuml from 'markdown-it-plantuml';

export default defineUserConfig({
  base: '/database-course-work/',
  theme,
  extendsMarkdown: (md) => void md.use(MarkdownItPlantuml),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Media content analysis system',
      description: 'Coursework',
    },
    '/ua/': {
      lang: 'uk-UA',
      title: 'Система аналізу медіа-контенту',
      description: 'Курсова робота',
    },
  },
});
