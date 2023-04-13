export { setPrefix, prefixClass };

// default className prefix
let Prefix = "de-seri-";

function setPrefix(p: string) {
  Prefix = p;
}

function prefixClass(name: string | Array<string | boolean>) {
  if (Array.isArray(name)) {
    return name
      .filter((i) => i)
      .map((i) => Prefix + i)
      .join(" ");
  } else {
    return Prefix + name;
  }
}
