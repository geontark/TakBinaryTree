import TakBinaryTree from "./BinaryTree";

"use strict";

console.log(`--- insert start ---`);
let bTree = new TakBinaryTree();
bTree.insert(3);
bTree.insert(1);
bTree.insert(5);
console.log(bTree.rootNode);

console.log(`--- search start ---`);
console.log(bTree.search(3));

console.log(`--- remoe start ---`);
console.log(bTree.remove(1));
console.log(bTree.rootNode);
