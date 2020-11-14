const product = document.querySelectorAll('.card');
const $ = e => document.querySelector(e);

const produtos = [];

const ejects = {
    adicionar() {
        product.forEach(elem => {
            // elementos do card 
            const data = {
                imagem: elem.children[0].children[0].children[0].src,
                name: elem.children[1].children[0].innerHTML,
                price: elem.dataset.price,
                description: []
            }

            // montando o array de descrição 
            const desc = () => {
                const dados = elem.children[1].children[1];
                const lista = dados.childElementCount;

                for(let i = 0; i < lista; i++) {
                    data.description.push(dados.children[i].innerHTML)
                }
            }
            
            desc()

            // Funcao abrir modal 
            // Botao para visualizar os dados
            const buttonVisualizar = elem.children[2];

            buttonVisualizar.addEventListener('click', () => {
                $(".modal").classList.add('active__modal')
                $("#modal__image").src = data.imagem;
                $("#modal__name").innerHTML = data.name;

                const price = data.price;
                $(".modal__price").innerHTML = "R$" + price;

                $(".modal__list").innerHTML = "";

                data.description.forEach(elem => {
                    const li = document.createElement('li')
                    li.innerHTML = elem;
                    $(".modal__list").appendChild(li)
                })

            })


            // fechar modal
            $(".modal__close i").addEventListener('click', () => {
                $(".modal").classList.remove('active__modal')
                $('.modal .modal__count .count__length p').innerHTML = 1;
            }) 
        })
    },

    update() {
        $('#quant').classList.remove("animate-quant")

        const dadosModal = {
            name: $('.modal #modal__name').innerHTML,
            quant: $('.modal .modal__count .count__length p').innerHTML,
            total: 0,
        }

        const priceFormat = $('.modal .modal__price').innerHTML.replace('$', '').replace('R', '')
        const price = parseInt(priceFormat);
        const valor = parseInt(dadosModal.quant);

        const calculateTotal = valor * price;
        dadosModal.total = calculateTotal;

        produtos.push(dadosModal)

        $('.cart__list .cart__products').innerHTML = "";
                    
        produtos.forEach(elem => {     
                const tr = document.createElement('tr');
                const tdName = document.createElement('td');
                const tdQuant = document.createElement('td'); 
                const tdTotal = document.createElement('td');
                const tdIcon = document.createElement('td');
                const i = document.createElement('i');
                i.classList.add('fas','fa-trash-alt');

                tdName.innerHTML = elem.name;
                tdQuant.innerHTML = elem.quant;
                tdTotal.innerHTML = "R$"+elem.total;
                tdIcon.append(i)

                tr.append(tdName)
                tr.append(tdQuant)
                tr.append(tdTotal)
                tr.append(tdIcon)

                $('.cart__list .cart__products').appendChild(tr)
        })

        let tt = 0;

        produtos.forEach(elem => {
            tt = tt + elem.total;
        })

        $('.total .number').innerHTML = "R$" + tt;
        ejects.removeItem()
    },

    addCart() {
        $(".modal button").addEventListener("click", () => {
            const imagem = new Image()
            imagem.src = $("#modal__image").src;
            imagem.classList.add('animate-cart');

            $("#image__conteiner").appendChild(imagem);

            setTimeout(() => {
                $("#image__conteiner").removeChild(imagem);
                $('#quant').innerHTML = produtos.length + 1;
                $('#quant').classList.add("animate-quant");

                setTimeout(ejects.update, 100)
            }, 2000)
        })
    },

    cartToggle() {
        $('.fa-shopping-cart').addEventListener('click', () => {
            $('.cart__list').classList.toggle('cart__toggle');
        })
    },

    lengthProdut() {
        $('.fa-minus').addEventListener('click', () => {
            const convertInt = $('.count__length p').innerHTML;

            if(convertInt <= 1) {
                $('.count__length p').innerHTML = 1;
            } else {
                $('.count__length p').innerHTML--;
            }
            
        })

        $('.fa-plus').addEventListener('click', () => {
            $('.count__length p').innerHTML++; 
        })
    },

    removeItem() {
        const itemsCart = document.querySelectorAll('.cart__products tr');
        

        itemsCart.forEach((item, index) => {
            const button = item.children[3].children[0];
            
            button.addEventListener('click', () => {
                console.log(index)
                produtos.splice(index, 1)
                console.log(produtos)
            })
        })        
    },

    pagar() {
        $('#pagar').addEventListener('click', () => {
            const number = $('.number').innerHTML;
            window.open(`pagar.html?${number}`)
        })
    }
}

ejects.adicionar()
ejects.addCart()
ejects.cartToggle()
ejects.lengthProdut()
ejects.pagar()
