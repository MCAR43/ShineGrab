{
  stat dist
} || {
  mkdir dist
}
zip dist/$npm_package_name.zip -r build public node_modules/react-scripts/scripts package.json package-lock.json


