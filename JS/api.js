const API_URL = "https://dummyjson.com/products";

/****************** get Products (Ahmed) ******************/
export async function getProducts(){
    const response=await fetch(`${API_URL}?limit=0`);
    const data=await response.json();
    return data.products;
}
// console.log(getProducts());


/****************** get products by id  (Kareem & Ahmed) ******************/
export async function getProductById(id) {
    const response=await fetch(`${API_URL}/${id}`);
    const product=await response.json();
    return product; 
}
//console.log(getProductById(20));

/****************** get products by category (Ahmed) ******************/
export async function getProductByCategory(category) {
    const response=await fetch(`${API_URL}/category/${category}?limit=0`);
    const data=await response.json();
    return data.products;
    
}
//console.log(getProductByCategory("beauty"));

// OR حل اخر بالفلتر 
// export async function getProductByCategory(x) {
// const products=await getProducts();
// const result=products.filter(ele=>{return ele.category===x});
// return result;
// }
// console.log(getProductByCategory("beauty"));



/****************** get All categories (Mohamed) ******************/
export async function getAllCategories() {
    const response=await fetch(`${API_URL}/categories`);
    const data=await response.json();
    return data.map(ele=>ele.slug);
    
}
//  console.log(getAllCategories());


/****************** Search (Mohamed) ******************/
export async function searchAboutProduct(item) {
    const response=await fetch(`${API_URL}/search?q=${item}`);
    const data=await response.json();
    return data.products;
}
// console.log(searchAboutProduct("iphone"));
//لاحظ هندل حته انه لو مفيش منتج من النوع اللي سرش عنه ده يطلعله انه مفيش حاجه بالاسم ده وكده 👈👈


/****************** offers (Ahmmed) ******************/
export async function getOfferProducts() {
const products=await getProducts();
const result=products.filter(ele=>{return ele.discountPercentage>20});
return result;
}
// console.log(getOfferProducts());

/****************** Best seller ( addition=>Aseel ) ******************/
export async function getBestSeller(){
    const products=await getProducts();
    products.sort((a,b)=>b.rating-a.rating)
    return products.slice(0,10);
}
//  console.log(getBestSeller());

