import { defineUserConfig } from 'vuepress';
import theme from './theme.js';
import MarkdownItPlantuml from 'markdown-it-plantuml';

export default defineUserConfig({
  base: '/database-course-work/',
  lang: 'en-US',
  title: 'Система аналізу медіа-контенту',
  description: 'Курсова робота',
  theme,
  extendsMarkdown: (md) => {
    md.use(MarkdownItPlantuml);
  },
});
