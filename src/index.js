const appNode = document.querySelector('#app');
const baseUrl = 'https://platzi-avo.vercel.app';

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat('en-EN', {
    style: "currency",
    currency: "USD",
  }).format(price);

  return newPrice;
}

async function  getAvocado(){
  const response = await fetch(`${baseUrl}/api/avo`);
  const data = await response.json();
  return data.data;
}

async function renderAvocado(){
  const avocados = await getAvocado();
  const items = [];
  avocados.forEach(avocado=>{
    // Imagen
    const image = document.createElement('img');
    image.src = `${baseUrl}${avocado.image}`;
    image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
    // Nombre
    const title = document.createElement('h2');
    title.textContent = avocado.name;
    title.className = "text-lg font-bold";
    // Price
    const price = document.createElement('div');
    price.className = "text-gray-600"
    price.textContent = formatPrice(avocado.price);
     // Creamos un contenedor el título y el precio
    const priceAndTitle = document.createElement("div")
    priceAndTitle.className = "text-center flex flex-col justify-center md:text-left";
    priceAndTitle.appendChild(title);
    priceAndTitle.appendChild(price);
    // Contenedor
    const container = document.createElement('div');
    container.className = "md:flex bg-white rounded-lg p-6 w-80 hover:bg-gray-300";
    container.append(image, priceAndTitle);
    items.push(container);
  })
  appNode.append(...items);
}

renderAvocado();