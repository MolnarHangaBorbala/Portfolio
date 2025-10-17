const contextMenu = document.getElementById('context-menu');

document.addEventListener('contextmenu', e => {
    e.preventDefault();
    const { clientX: mouseX, clientY: mouseY } = e;

    const { innerWidth, innerHeight } = window;
    const menuWidth = 180, menuHeight = 200;
    const posX = mouseX + menuWidth > innerWidth ? innerWidth - menuWidth - 10 : mouseX;
    const posY = mouseY + menuHeight > innerHeight ? innerHeight - menuHeight - 10 : mouseY;

    contextMenu.style.left = `${posX}px`;
    contextMenu.style.top = `${posY}px`;
    contextMenu.style.display = 'flex';
});

document.addEventListener('click', () => {
    contextMenu.style.display = 'none';
});