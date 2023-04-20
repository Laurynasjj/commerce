'use client';
import type { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next'
import { Button, Card, Checkbox, Container, Input, NextUIProvider, Row, Spacer, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next'
import { productExistsByPermalink } from '../api/productExists';

const getData = async(productPermalink : string) => {
    //setProductChecked(true);
    //console.log("Product ID: " + productPermalink);
    return await (fetch("/api/productExists?productId="+ productPermalink)
    .then(response => response.json())
    .then(data => data.data as boolean))
  }

function ProductPage  ({productResults} : InferGetStaticPropsType<typeof getStaticProps>) {

    //console.log(productResults);
    const router = useRouter()
    const [productId, setProductId] = useState("-1");
    
    //console.log(productId);
    const [doesProductExist, setProductExists] = useState(productResults.exists);
    const [productHasBeenChecked, setProductChecked] = useState(false);
    //productExistsByPermalink(productId).then(res => setProductExists(res)); // THIS IS BAD, NEED TO CHANGE TO API SHIT
    /*useEffect(() => {
        console.log(((router.query.product as string[])|| ["-1"])[0])
        setProductId(((router.query.product as string[])|| ["-1"])[0]);
      }, [])*/

    /*if (!productHasBeenChecked)
    {
        console.log("ProductID: " + productId);
        if (productId === "-1")
        {
            setProductId(((router.query.product as string[])|| ["-1"])[0]);
        }
        getData(productId).then(res => { console.log(res); setProductExists(res)});
    }*/
    if (doesProductExist)
        return <>
                <Text>
                    Product exists! {productResults.id}
                </Text>
        </>
    else
    {
        return <>
            <Text>Invalid product ID!</Text>
        </>
    }
}

type ProductAPIResults = {
    exists: boolean
    id: string
}
export const getStaticProps : GetStaticProps<{ productResults: ProductAPIResults }>= async (context : any) => {

    const product = context.params.product;   

    //const data = await getData(product);

    const data = await productExistsByPermalink(product); // Maybe I can do this here since getStaticProps only runs server side
    const productResults : ProductAPIResults = { exists : data, id : product};


    return {
        props: { productResults }
    }
}

export const getStaticPaths: GetStaticPaths<{ product: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export default ProductPage;
