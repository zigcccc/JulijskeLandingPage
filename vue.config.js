module.exports = {
	// baseUrl: '/julijske-alpe/',
	configureWebpack: {
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
	}
};
