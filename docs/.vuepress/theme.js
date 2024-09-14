import { hopeTheme } from 'vuepress-theme-hope';
import sidebar from './sidebar.js';

export default hopeTheme({
  hostname: 'https://vuepress-theme-hope-docs-demo.netlify.app',

  iconAssets: 'fontawesome-with-brands',

  editLink: false,

  repo: 'serrhiy/database-course-work',

  docsDir: 'docs',

  sidebar,

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
});
