const API_URL = "https://dummyjson.com/products";

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const product = await response.json();
    return product;
}