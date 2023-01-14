// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const visit = require('unist-util-visit')

const clearStrongSpace = () => {
  return (root) => {
    visit(root, (item) => {
      if (item.type === 'paragraph') {
        // @ts-ignore
        const children = item.children
        children.forEach((item, i) => {
          if (item.type === 'strong') {
            const next = children[i + 1]
            const s = item.children[0].value
            if (s) {
              const last = s.slice(s.length - 1)
              if (
                next &&
                next.type === 'text' &&
                ['，', '。', '？', '！', '〉'].includes(last) &&
                next.value.startsWith(' ')
              ) {
                next.value = next.value.trim()
              }
            }
          }
        })
      }
    })
    return root
  }
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '珀耳塞福涅的华尔兹',
  tagline: `小焰在无数次的失败轮回中越发绝望…… 绑架小圆并将她锁在地下室，直到魔女之夜结束，这听起来并不疯狂。`,
  url: 'https://persephone-s-waltz.liuli.moe',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'logo.jpeg',
  trailingSlash: false,
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        target: isServer ? 'node12' : 'es2017',
      },
    }),
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'liuli-moe', // Usually your GitHub org/user name.
  projectName: 'persephone-s-waltz', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'books',
          path: 'books',
          // sidebarItemsGenerator() {
          //   return [{ type: 'autogenerated', dirName: '.' }]
          // },
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/liuli-moe/persephone-s-waltz/edit/master',
          remarkPlugins: [clearStrongSpace],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-F20H7RT1RM',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '珀耳塞福涅的华尔兹',
        logo: {
          alt: '珀耳塞福涅的华尔兹',
          src: 'logo.jpeg',
        },
        items: [
          {
            type: 'doc',
            docId: '你在开玩笑吧？',
            position: 'left',
            label: '阅读',
          },
          {
            href: 'https://github.com/liuli-moe/persephone-s-waltz',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '小说',
            items: [
              {
                label: '原作官网',
                href: 'https://archiveofourown.org/works/577310',
              },
            ],
          },
          {
            title: '社区',
          },
          {
            title: '更多',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/liuli-moe/persephone-s-waltz',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} rxliuli, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  // themes: [
  //   [
  //     require.resolve('@easyops-cn/docusaurus-search-local'),
  //     {
  //       // ... Your options.
  //       // `hashed` is recommended as long-term-cache of index file is possible.
  //       hashed: true,
  //       // For Docs using Chinese, The `language` is recommended to set to:
  //       // ```
  //       language: ['en', 'zh'],
  //       // ```
  //       indexDocs: true,
  //       indexBlog: false,
  //       docsRouteBasePath: 'books',
  //       docsDir: 'books',
  //     },
  //   ],
  // ],
}

module.exports = config
