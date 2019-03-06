module.exports = {
  // fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
  all: false,

  // Add asset Information
  assets: true,

  // Sort assets by a field
  // You can reverse the sort with `!field`.
  // Some possible values: 'id' (default), 'name', 'size', 'chunks', 'failed', 'issuer'
  // For a complete list of fields see the bottom of the page
  // assetsSort: "field",

  // Add build date and time information
  builtAt: false,

  // Add information about cached (not built) modules
  cached: false,

  // Show cached assets (setting this to `false` only shows emitted files)
  cachedAssets: false,

  // Add children information
  children: false,

  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: false,

  // Add namedChunkGroups information
  chunkGroups: false,

  // Add built modules information to chunk information
  chunkModules: false,

  // Add the origins of chunks and chunk merging info
  chunkOrigins: false,

  // Sort the chunks by a field
  // You can reverse the sort with `!field`. Default is `id`.
  // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
  // For a complete list of fields see the bottom of the page
  // chunksSort: "field",

  // Context directory for request shortening
  // context: "../src/",

  // `webpack --colors` equivalent
  colors: true,

  // Display the distance from the entry point for each module
  depth: false,

  // Display the entry points with the corresponding bundles
  entrypoints: false,

  // Add --env information
  env: true,

  // Add errors
  errors: true,

  // Add details to errors (like resolving log)
  errorDetails: true,

  // Exclude assets from being displayed in stats
  // This can be done with a String, a RegExp, a Function getting the assets name
  // and returning a boolean or an Array of the above.
  // excludeAssets: "filter" | /filter/ | (assetName) => true | false | ["filter"] | [/filter/] | [(assetName) => true|false],

  // Exclude modules from being displayed in stats
  // This can be done with a String, a RegExp, a Function getting the modules source
  // and returning a boolean or an Array of the above.
  // excludeModules: "filter" | /filter/ | (moduleSource) => true | false | ["filter"] | [/filter/] | [(moduleSource) => true|false],

  // See excludeModules
  // exclude: "filter" | /filter/ | (moduleSource) => true | false | ["filter"] | [/filter/] | [(moduleSource) => true|false],

  // Add the hash of the compilation
  hash: false,

  // Set the maximum number of modules to be shown
  maxModules: 15,

  // Add built modules information
  modules: false,

  // Sort the modules by a field
  // You can reverse the sort with `!field`. Default is `id`.
  // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
  // For a complete list of fields see the bottom of the page
  // modulesSort: "field",

  // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
  moduleTrace: true,

  // Show performance hint when file size exceeds `performance.maxAssetSize`
  performance: true,

  // Show the exports of the modules
  providedExports: true,

  // Add public path information
  publicPath: false,

  // Add information about the reasons why modules are included
  reasons: true,

  // Add the source code of modules
  source: false,

  // Add timing information
  timings: true,

  // Show which exports of a module are used
  usedExports: false,

  // Add webpack version information
  version: false,

  // Add warnings
  warnings: true

  // Filter warnings to be shown (since webpack 2.4.0),
  // can be a String, Regexp, a function getting the warning and returning a boolean
  // or an Array of a combination of the above. First match wins.
  // warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => true|false
};
