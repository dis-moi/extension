module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-image/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"extensions":[".mdx"],"defaultLayouts":{},"gatsbyRemarkPlugins":[],"lessBabel":false,"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/Users/antoinewolff/localhost/extension/src/app/websiteLMEL"},
    },{
      plugin: require('../node_modules/gatsby-plugin-layout/gatsby-browser.js'),
      options: {"plugins":[],"component":"/Users/antoinewolff/localhost/extension/src/app/websiteLMEL/src/components/Layout.tsx"},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/images/gatsby-icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"4e6ece843ad7f757b5366ef8abf66adc"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
