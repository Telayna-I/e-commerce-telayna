export const products = [
    {
        id: 1,
        name: "Play Station 1",
        stock: 5,
        price: 100,
        img: 'https://sm.ign.com/ign_es/screenshot/default/playstation-one-original_f2b2.jpg',
        category: 'consolas'
    },

    {
        id: 2,
        name: "Play Station 2",
        stock: 5,
        price: 200,
        img: 'https://s1.eestatic.com/2018/09/03/actualidad/actualidad_335230079_130289803_1024x576.jpg',
        category: 'consolas'
    },

    {
        id: 3,
        name: "Play Station 3",
        stock: 5,
        price: 300,
        img: 'https://m.media-amazon.com/images/I/41+7ijf43jL._SX466_.jpg',
        category: 'consolas'
    },

    {
        id: 4,
        name: "Play Station 4",
        stock: 5,
        price: 400,
        img: 'https://gmedia.playstation.com/is/image/SIEPDC/ps4-pro-console-02-en-26oct18?$native--t$',
        category: 'consolas'
    },

    {
        id: 5,
        name: "Play Station 5",
        stock: 5,
        price: 500,
        img: 'https://i.blogs.es/86b11e/ps51/1366_2000.jpeg',
        category: 'consolas'
    },

    {
        id: 6,
        name: "MacBook Air",
        stock: 5,
        price: 1100,
        img: 'https://lamanzanamordida.net/app/uploads-lamanzanamordida.net/2020/02/apple-macbook-air-2018-problema-scheda-madre-1.jpg',
        category: 'computadoras'
    },

    {
        id: 7,
        name: "MacBook Pro",
        stock: 5,
        price: 1200,
        img: 'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP776/sp776-mbp15touch-space.jpeg',
        category: 'computadoras'
    },

    {
        id: 8,
        name: "MacBook Air M1",
        stock: 5,
        price: 1300,
        img: 'https://www.macstation.com.ar/img/productos/small/2205-2210-1.jpg',
        category: 'computadoras'
    },

    {
        id: 9,
        name: "MacBook Pro M1",
        stock: 5,
        price: 1400,
        img: 'https://www.macstation.com.ar/img/productos/small/2215-1.jpg',
        category: 'computadoras'
    },

    {
        id: 10,
        name: "Iphone X",
        stock: 5,
        price: 600,
        img: 'https://www.actualidadiphone.com/wp-content/uploads/2017/09/iPhone-X-caja.jpg',
        category: 'celulares'
    },
    {
        id: 11,
        name: "Iphone Xr",
        stock: 5,
        price: 700,
        img: 'https://i.blogs.es/8a9033/iphone-xr-analisis-applesfera-02/450_1000.jpg',
        category: 'celulares'
    },
    {
        id: 12,
        name: "Iphone 12 Pro",
        stock: 5,
        price: 800,
        img: 'https://d500.epimg.net/cincodias/imagenes/2020/10/16/smartphones/1602837957_938762_1602838003_noticia_normal.jpg',
        category: 'celulares'
    },
    {
        id: 13,
        name: "Iphone 12 Pro Max",
        stock: 5,
        price: 900,
        img: 'https://www.actualidadiphone.com/wp-content/uploads/2020/11/IPhone-12-Pro-Max-19-scaled.jpeg',
        category: 'celulares'
    }
    
];


export const getProducts = new Promise((resolve, reject) =>{
    setTimeout(()=>{
        resolve(products)
    },2000);
});