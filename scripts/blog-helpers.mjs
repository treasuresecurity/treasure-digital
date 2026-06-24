/** @typedef {import('@portabletext/types').PortableTextBlock} PortableTextBlock */

/** @param {string} text @param {string} key */
export function p(text, key) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
  };
}

/** @param {string} text @param {string} key */
export function h2(text, key) {
  return { ...p(text, key), style: "h2" };
}

/** @param {string} text @param {string} key */
export function h3(text, key) {
  return { ...p(text, key), style: "h3" };
}

/** @param {string} text @param {string} key */
export function quote(text, key) {
  return { ...p(text, key), style: "blockquote" };
}

/** @param {PortableTextBlock[]} blocks */
export function body(blocks) {
  return blocks;
}
