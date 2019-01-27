export const createElement = (className?: string): HTMLElement => {
  let currentNode = document.getElementById('hyper-modal-portal-id');
  if (!currentNode) {
    currentNode = document.createElement('div');
    currentNode.setAttribute('id', 'hyper-modal-portal-id');
    if (className) {
      currentNode.classList.add(className);
    }
    document.body.appendChild(currentNode);
  }
  return currentNode;
}
