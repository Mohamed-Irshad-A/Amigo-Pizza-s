import pizza from '../data_sets/pizza_sub_menu.js';

const subMenuNavCode = pizza.map(item => `
        <div id="${item.id}">
            <div class="img-menu-nav">
                <img src="${item.src}" alt="${item.name}" class="nav-pic"/>
                <p >${item.name}</p>
            </div>
        </div>
    `).join('');

export default subMenuNavCode;