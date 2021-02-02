The following suggested values were added to your tsconfig.json. These values can be changed to fit your project's needs:

	- skipLibCheck was set to true
	- forceConsistentCasingInFileNames was set to true
	- noEmit was set to true
	- exclude was set to ['node_modules']

The following mandatory changes were made to your tsconfig.json:

	- isolatedModules was set to true (requirement for babel)
	- jsx was set to preserve (next.js implements its own optimized jsx transform)
