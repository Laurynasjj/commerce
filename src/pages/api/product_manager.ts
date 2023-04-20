// ALL OF THIS NEEDS TO BE CONVERTED TO API CALLS FROM THE CLIENT SIDE CUZ RN WE LEAKING API KEYS UNGABUNGA
// https://www.smashingmagazine.com/2021/12/protect-api-key-production-nextjs-api-route/
// Admin shit
function addProduct(productName: string, productPrice: string, productDescription: string, productImageBase64: string)
{

  let productToAdd =
  { product: {
      name: productName,
      price: productPrice,
      description: productDescription
    }
  };

  let assetObject =
  {
    filename: crypto.randomUUID() + ".jpg",
    contents: productImageBase64.split(",")[1]
  }
  const url = new URL(
    "https://api.chec.io/v1/products"
  );
  //console.log(productImageBase64);
  const assetsUrl = new URL("https://api.chec.io/v1/assets");

  const assetId = "";
  const headers = {
    "X-Authorization": process.env.NEXT_PUBLIC_COMMERCEJS_DEPLOYMENT_URL || "OOPS",
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  const assetHeaders = {
    "X-Authorization": process.env.NEXT_PUBLIC_COMMERCEJS_DEPLOYMENT_URL || "OOPS",
    "Content-Type": "application/json",
  };

  return (fetch(assetsUrl, {
    method: "POST",
    headers: assetHeaders,
    body: JSON.stringify(assetObject)
  })
  .then(response => response.json())
  .then(data => {
    //console.log(data);
    let assetId = data["id"];
    let productId = "?";
    return (fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(productToAdd)
    })
      .then(response => response.json())
      .then((data) =>
      {
        //console.log(data);
        productId = data["id"];
        console.log("PRODUCT ID: " + productId);
        console.log("ASSET ID: " + assetId);
      })
      .then( () => {
        let assetSetUrl = new URL("https://api.chec.io/v1/products/"+ productId + "/assets");
        return (fetch(assetSetUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(
            {
              assets: {
                0: {
                  id: assetId
                }
              }
            }
            )
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => productExists(productId)));
      })
      .then( (resp) => resp))
  })
  .then(resp => resp))
  ;
}

function productExists(productId: string)
{
  const url = new URL("https://api.chec.io/v1/products/" + productId);
  const headers = {
    "X-Authorization": process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY || "OOPS",
    "Accept": "application/json",
    "Content-Type": "application/json",
  };
  return (fetch (url, {
    method: "GET",
    headers: headers,
  })
  .then(response => response.status === 200))
}

// MOVED TO productExists.ts
/*export async function productExistsByPermalink(permalink: string)
{
  const url = new URL("https://api.chec.io/v1/products/" + permalink + "?type=permalink");
  const headers = {
    "X-Authorization": process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY || "OOPS",
    "Accept": "application/json",
    "Content-Type": "application/json",
  };
  return (fetch (url, {
    method: "GET",
    headers: headers,
  })
  .then(response => response.status === 200))
}*/

// Get product info (to be moved to something else, this shit preset project is getting the boot anyway)

export async function getAllProducts()
{
  console.log("GETTING ALL PRODUCTS: ");
  const url = new URL("https://api.chec.io/v1/products");
  const headers = {
    "X-Authorization": process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY || "OOPS",
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  return await (fetch(url, {
    method: "GET",
    headers: headers,
})
    .then(response => response.json())
    .then(data => data));

}


// Ecommerce functions (to be moved to something else, this shit preset project is getting the boot anyway)

function getCart()
{

}

function addToCart()
{

}

function checkout()
{

}
export default addProduct;
