import "@babel/polyfill";
"use strict";
// insert
class BinaryNode {
    constructor(value) {
        this.__value = value;
        this.__leftNode = null;
        this.__rightNode = null;
    }

    get value() {
        return this.__value;
    }
    
    set value(value) {
        this.__value = value;
    }

    get leftNode() {
        return this.__leftNode;
    }

    set leftNode(leftNode) {
        this.__leftNode = leftNode;
    }

    get rightNode() {
        return this.__rightNode;
    }

    set rightNode(rightNode) {
        this.__rightNode=rightNode;
    }
}

// 노드 조작함수
const getData = (currentNode) => currentNode.value;
const getLeftSubTree = (currentNode) => currentNode.leftNode
const getRightSubTree = (currentNode) => currentNode.rightNode
const makeLeftSubTree = (parentNode, newNode) => parentNode.leftNode = newNode
const makeRightSubTree = (parentNode, newNode) => parentNode.rightNode = newNode
// 부모노드 오른쪽 자식 노드에 노드를 넣는다
const changeRightSubTree = (parentNode, subNode) => parentNode.rightNode = subNode;
// 부모노드 왼쪽 자식 노드에 노드를 넣는다
const changeLeftSubTree = (parentNode, subNode) => parentNode.leftNode = subNode;
// 서브 노드 삭제
const removeRightTree = (parentNode) => parentNode.rightNode = null;
const removeLeftTree = (parentNode) => parentNode.leftNode = null;
// 노드에 값 넣기
const setData = (node, value) => node.value = value;


/**
 *  insert, search, remove
 */

// insert
const treeInsert = (rootNode, value) => {
      let parentNode = null;
      let currentNode = rootNode;
      let newNode = new BinaryNode(value);

    //   newNode가 추가될 위치 찾기
      while(currentNode != null) {
          if(value == getData(currentNode)) {
              return;
          }
          parentNode = currentNode;
          if(getData(currentNode) > value) {
              currentNode = getLeftSubTree(currentNode);
          }else {
              currentNode = getRightSubTree(currentNode);
          }
      }
      
    //   newNode가 root노드가 아닌경우
      if(parentNode != null) {
          if(value < getData(parentNode)) {
            makeLeftSubTree(parentNode, newNode);
          }else {
            makeRightSubTree(parentNode, newNode);
          }
      }else {   // newNode가 root 노드인 경우
        rootNode = newNode;
      }
      return rootNode;
};

const treeSearch = (rootNode, targetValue) => {
    let currentNode = rootNode;
    let currentValue = null;
    
    while(currentNode != null) {
        currentValue = getData(currentNode);
 
        if(targetValue == currentValue) {
            return currentNode;
        }else if(targetValue < currentValue) {
            currentNode = getLeftSubTree(currentNode);
        }else {
            currentNode = getRightSubTree(currentNode);           
        }
    }
    return null;
}


// delete case 
// 0. 삭제 할 노드가 root 노드인가? 아닌가?
// 1. 삭제 할 노드가 0개의 자식노드 소유
// 2. 삭제 할 노드가 2개의 자식노드 소유
// 3. 삭제 할 노드가 1개의 자식노드 소유

// 트리에서 target값을 갖는 노드 제거
const treeRemove = (rootNode, target) => {
    let parentVroot = new BinaryNode(); // 가상 루트노드
    let parentNode = parentVroot; // 부모노드
    let currentNode = rootNode;   // 현재 노드
    let deleteNode;  // 삭제 노드
    changeRightSubTree(parentVroot, {...rootNode});
    
    // 삭제 대상 노드를 탐색
    // 현재 노드가 존재하고, 현재 노드의 데이터가 목표값가 일치하지 않으면 계속 탐색 진행
    while(currentNode != null && getData(currentNode) != target) {
        parentNode = currentNode;
        if(target < getData(currentNode)) {
            currentNode = getLeftSubTree(currentNode);
        }else {
            currentNode = getRightSubTree(currentNode);
        }
    }

    if(currentNode == null){    // 삭제 할 노드가 존재하지 않음
        return null;
    }

    deleteNode = currentNode;   // 삭제 할 노드
    
    // 1.  삭제 할 노드가 말단 노드인 경우
    if(getLeftSubTree(deleteNode) == null && getRightSubTree(deleteNode) == null) { 
        if(getLeftSubTree(parentNode) == deleteNode) {
            removeLeftTree(parentNode);
        }else {
            removeRightTree(parentNode);
        }
    
    // 2.  삭제 대상이 하나의 자식 노드를 갖고 있을 때
    }else if(getLeftSubTree(deleteNode) == null || getRightSubTree(deleteNode) == null){
        let descendantNode; // 삭제 할 대상의 자식 노드
        
        if(getLeftSubTree(deleteNode) != null) {
            descendantNode = getLeftSubTree(deleteNode);
        }else {
            descendantNode = getRightSubTree(deleteNode);
        }
        
        if(getLeftSubTree(parentNode) == deleteNode) {
            changeLeftSubTree(parentNode, descendantNode);
        }else {
            changeRightSubTree(parentNode, descendantNode);
        }
   
        // 3. 두 개의 자식 노드를 모두 갖는 경우
    }else {
        
        let mNode = getRightSubTree(deleteNode); // 삭제 할 노드 자리를 대체 할 노드 가리킴
        let mpNode = deleteNode; // 대체 할 노드의 부모 노드
        let deleteData;

        // 삭제 대상의 노드를 찾기
        while(getLeftSubTree(mNode) != null) {
            mpNode = mNode;
            mNode = getLeftSubTree(mNode);
        }

        // 대체 노드에 저장된 값을 삭제할 노드에 대입
        deleteData = getData(deleteNode); // 대입전 삭제할 노드 데이터 백업
        setData(deleteNode, getData(mNode));
        
        // 대체 노드의 부모 노드와 자식 노드를 연결
        if(getLeftSubTree(mpNode) == mNode) {
            changeLeftSubTree(mpNode, getRightSubTree(mNode));
        }else {
            changeRightSubTree(mpNode, getRightSubTree(mNode));
        }

        deleteNode = mNode;
        setData(deleteNode, deleteData);    // 백업 데이터 복원
    }

    // 삭제된 노드가 루트 노드인 경우에 대한 추가적인 처리
    if(getRightSubTree(parentVroot) != rootNode) {
        rootNode = getRightSubTree(parentVroot);
    }

    // return deleteNode; // 삭제 대상 반환
    return deleteNode; // 삭제 대상 반환
}

/**
 * 바이너리 트리 크래스
 * 트리에 대한 insert, search, remove, get rootnode 역할을 담당함
 */
class TakBinaryTree {
    constructor() {
        this.__rootNode = null;
    }
    
    get rootNode() {
        return {...this.__rootNode}
    }

    insert = (value) => {
        this.__rootNode = treeInsert(this.__rootNode, value);
    }

    search = (value) => {
        return {...treeSearch(this.__rootNode, value)};
    }

    remove = (value) => {
        return {...treeRemove(this.__rootNode, value)};
    }
}

export default TakBinaryTree;