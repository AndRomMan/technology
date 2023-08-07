// ======================================== Parent
function findParentElement(element) {
  // elem.closest('div');
  // parentElement = node.parentElement
  return element.parentElement;
}

// ближайший родитель подходящий под селектор
function findParentElement(elementArray) {
  let parentArray = [];
  elementArray.forEach((element) => {
    parentArray.push(element.closest('ul'));
  });
