module.exports = {
	configureWebpack: {
		entry: ['babel-polyfill', './src/main.js'],
		optimization: {
			splitChunks: {
				chunks: 'all'
			}
		},
		module: {
			rules: [
				{
					test: /\.sass$/,
					use: [
						{
							loader: 'sass-resources-loader',
							options: {
								resources: [
									'./src/sass/_variables.sass',
									'./src/sass/_mixins.sass'
								]
							}
						}
					]
				}
			]
		}
	},

	lintOnSave: undefined
};
