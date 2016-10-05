function el(name, parent){
  parent = parent || document;
  if(name[0] === "#") return parent.getElementById(name.substr(1));
  if(name[0] === ".") return parent.getElementsByClassName(name.substr(1));
  return parent.getElementsByTagName(name);
}
