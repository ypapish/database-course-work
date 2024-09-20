import { hopeTheme } from 'vuepress-theme-hope';
import { enSidebar, uaSidebar } from './sidebar/index.js';

export default hopeTheme({
  iconAssets: 'fontawesome-with-brands',

  editLink: false,

  repo: 'serrhiy/database-course-work',

  docsDir: 'docs',

  footer: 'ECL 2.0 Licensed | Copyright © [2024] [Serhii Lytvynenko] ',

  displayFooter: true,

  plugins: {
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: 'Recommended',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommended',
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
    },
  },

  locales: {
    '/': { sidebar: enSidebar },
    '/ua/': { sidebar: uaSidebar },
  }
});
