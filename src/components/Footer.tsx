import { Card, Container, NextUIProvider, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

const Footer = () => {
    const { pathname } = useRouter();

    const pagesWithoutNavbar = ["/auth"];

    const renderNavbar = !pagesWithoutNavbar.includes(pathname);

    return renderNavbar ? (
        <NextUIProvider>
            <Container
                display="flex"
                alignItems="center"
                justify="center"
                css={{ minHeight: '100vh' }}
            >
                <Card css={{ h: "$30", $$cardColor: 'black' }}>
                    <Card.Body style={{ textAlign: "center" }}>
                        <Text h6 size={15} color="white" css={{ mt: 0 }}>
                            <p>Projektas - &quot;Kursinis darbas&quot;</p>
                            <small>Rekomenduojamos parduotuves</small>
                            <a href="http://skytech.lt"><h4>skytech</h4></a>
                            <a href="http://novastar.lt"><h4>Novastar</h4></a>
                            <a href="http://senukai.lt"><h4>Senukai</h4></a>
                        </Text>
                    </Card.Body>
                </Card>

            </Container>
        </NextUIProvider>
    ) : null;
};

export default Footer;
