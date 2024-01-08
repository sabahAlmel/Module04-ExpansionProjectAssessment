// ex1
function bubbleSort(arr, N) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return array;
}
let array = [1, 3, 6, 7, 9, 2];

console.log(bubbleSort(array, array.length));

//ex2
function binarySearch(array, element) {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (element == array[mid]) {
      return mid;
    } else if (element < array[mid]) {
      end = mid - 1;
    } else if (element > array[mid]) {
      start = mid + 1;
    }
  }
  return -1;
}
let array2 = [1, 2, 3, 4, 5, 6, 7];
console.log(binarySearch(array2, 5));

// ex3
function createNode(value) {
  let next = null;
  return value, next;
}

function createLinkedList() {
  let head = null;
  return head;
}
function add(list, value) {
  let node = createNode(value);
  let current;
  if (list.head == null) {
    list.head = node;
  } else {
    current = list.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }
}
function printList(list) {
  let current = list.head;
  while (current) {
    console.log(current.value);
    current = current.next;
  }
}
function search(list, value) {
  let current = list.head;
  let result;
  while (current) {
    if (current.value == value) {
      result = current.value;
      return result;
    }
    current = current.next;
  }
  return null;
}
const myLinkedList = createLinkedList();

myLinkedList = addNode(myLinkedList, 3);
myLinkedList = addNode(myLinkedList, 7);
myLinkedList = addNode(myLinkedList, 10);

printList(myLinkedList);
let y = search(myLinkedList, 10);
console.log(y);
