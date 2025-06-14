node -e "let pkg=require('./package.json'); pkg.scripts.postinstall=''; require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));" 
