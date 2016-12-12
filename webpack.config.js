var path = require( 'path' );

module.exports = [
	{
		name: 'admin',
		entry: './assets/js/src/admin.js',
		output: {
			path: path.join( __dirname, 'assets/js' ),
			filename: 'admin.js'
		},
		module: {
			preLoaders: [
				{
					test: path.join( __dirname, 'assets/js/src' ),
					loader: 'jshint-loader'
				}
			],
			loaders: [
				{
					test: path.join( __dirname, 'assets/js/src' ),
					loader: 'babel-loader'
				}
			]
		}
	}
];
