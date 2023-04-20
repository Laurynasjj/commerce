export default async function productExists(req: { query: { productId: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { data: boolean; }): void; new(): any; }; }; }) {
    const {
        query: { productId },
    } = req;
    console.log("Permalink: " + productId);
    const response = await productExistsByPermalink(productId);
    res.status(200).json({
        data: response,
    });
}
export async function productExistsByPermalink(permalink: string) {
    
    const url = new URL("https://api.chec.io/v1/products/" + permalink + "?type=permalink");
    const headers = {
        "X-Authorization": process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY || "OOPS",
        "Accept": "application/json",
        "Content-Type": "application/json",
    };
    return (fetch(url, {
        method: "GET",
        headers: headers,
    })
        .then(response => response.status === 200))
}