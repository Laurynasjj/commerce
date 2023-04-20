import { Card, Container, NextUIProvider, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

const Navbar = () => {
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
                            HEADER
                        </Text>
                    </Card.Body>
                </Card>

            </Container>
        </NextUIProvider>
    ) : null;
};

export default Navbar;
