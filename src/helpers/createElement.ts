export const createElement = (className?: string): HTMLElement => {
    let currentNode = document.getElementById('hyper-modal-portal-id')
    if (!currentNode) {
        currentNode = document.createElement('div')
        currentNode.setAttribute('id', 'hyper-modal-portal-id')
        document.body.appendChild(currentNode)
    }
    if (className && !currentNode.classList.contains(className)) {
        currentNode.classList.add(className)
    }
    return currentNode
}
