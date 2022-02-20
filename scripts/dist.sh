{
  stat dist
} || {
  mkdir dist
}
zip dist/$npm_package_name.zip -r build public package.json package-lock.json


