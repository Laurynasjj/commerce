import type { GetStaticPropsContext, NextPage } from 'next'
import { Button, Card, Checkbox, Container, Input, NextUIProvider, Row, Spacer, Text } from '@nextui-org/react'
import addProduct, { getAllProducts } from './api/product_manager'
import { useState } from 'react'

getAllProducts();

const AdminPanel : NextPage = () => {

    const toBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const [imageFile, setFile] = useState("");
    const [isValidImage, setIsValidImage] = useState(false);
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        if (e.target.files[0].size <= 2097152) {
            toBase64(e.target.files[0]).then(result => { setFile("" + result); /*console.log(result)*/ });
            setIsValidImage(true);
        }
        else {
            alert("Image is too big!");
            setIsValidImage(false);
        }

        ;
    };
    const [nameValue, setNameValue] = useState("NADA");
    const [priceValue, setPriceValue] = useState("1.00");
    const [descriptionValue, setDescriptionValue] = useState("Some random product description");
    return (
        <NextUIProvider>
        <div>
                <Container
                    display="flex"
                    alignItems="center"
                    justify="center"
                    css={{ minHeight: '100vh' }}
                >
                    <Card css={{ mw: '420px', p: '20px' }}>
                        <Text
                            size={24}
                            weight="bold"
                            css={{
                                as: 'center',
                                mb: '20px',
                            }}
                        >
                            Add a Product
                        </Text>
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Product Name"
                            onChange={e => setNameValue(e.target.value)}
                        />
                        <Spacer y={1} />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Description"
                            onChange={e => setDescriptionValue(e.target.value)}
                        />
                        <Spacer y={1} />
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Price (€)"
                            onChange={e => setPriceValue(e.target.value)}
                        />
                        <Spacer y={1} />
                        <input type="file" name="images" accept="image/*" onChange={onFileChange} />
                        <Spacer y={1} />
                        <Button onPress={async () => {
                            if (isValidImage) {
                                var result = await addProduct(nameValue, priceValue, descriptionValue, imageFile);
                                if (result) {
                                    alert("Product was successfully added!");
                                }
                            }
                            else
                                alert("Image is not valid!");
                        }}>Add</Button>
                    </Card>
                </Container>
            </div>
        </NextUIProvider>

    )
}

export default AdminPanel;
