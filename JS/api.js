const API_URL = "https://dummyjson.com/products";


/****************** get Products (Ahmed) ******************/
export async function getProducts() {

    const response = await fetch(`${API_URL}?limit=0`);

    const data = await response.json();

    return data.products;
}


/****************** get products by id (Kareem & Ahmed) ******************/
export async function getProductById(id) {

    const response = await fetch(`${API_URL}/${id}`);

    const product = await response.json();

    return product;
}


/****************** get products by category (Ahmed) ******************/
export async function getProductByCategory(category) {

    const response = await fetch(
        `${API_URL}/category/${category}?limit=0`
    );

    const data = await response.json();

    return data.products;
}


/****************** get All categories (Mohamed) ******************/
export async function getAllCategories() {

    const response = await fetch(`${API_URL}/categories`);

    const data = await response.json();

    return data.map(ele => ele.name);
}


/****************** Search (Mohamed) ******************/
export async function searchAboutProduct(item) {

    const response = await fetch(`${API_URL}/search?q=${item}`);

    const data = await response.json();

    return data.products;
}


/****************** offers (Ahmmed) ******************/
export async function getOfferProducts() {

    const products = await getProducts();

    const result = products.filter(
        ele => ele.discountPercentage > 0
    );

    return result;
}


/****************** Best seller (addition => Aseel) ******************/
export async function getBestSeller() {

    const products = await getProducts();

    products.sort((a, b) => b.rating - a.rating);

    return products.slice(0, 10);
}