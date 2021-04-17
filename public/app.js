const toPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency',
        minimumFractionDigits: false
    }).format(price);
}


document.querySelectorAll('.price').forEach(node => {
    node.textContent = toPrice(node.textContent);
})


const card = document.querySelector('#card')

if(card) {
    card.addEventListener('click', (e) => {
        if(e.target && e.target.classList.contains('delete-card')) {
            const id = e.target.dataset.id;
                fetch(`/card/remove/${id}`, {
                    method: 'delete'
                }).then(res => res.json())
                .then(res => {
                    if(res.courses.length) {
                        const html = res.courses.map(item => {
                            return `
                            <tr>
                                <td>${item.title}</td>
                                <td>${item.count}x</td>
                                <td>
                                    <button class="btn btn-small red darken-1 delete-card" data-id=${item.id}>Удалить</button>
                                </td>
                            
                
                             </tr>
                            `
                        })

                        card.querySelector('tbody').innerHTML = html;
                        card.querySelector('.price').textContent = toPrice(res.price);
                    } else {
                        card.innerHTML = '<h3>В корзине пусто</h3>'
                    }
                })
        }
    })
}

