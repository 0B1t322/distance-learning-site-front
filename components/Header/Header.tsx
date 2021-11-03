import {HStack, Image, Box, Text, Link} from '@chakra-ui/react'

import headerStyles from "./Header.module.css"

export const Header = () => {

    function href(): string  {
        return "/"
    }

    return (
        <div className={headerStyles.mobileNav}>
        <Box bg="telegram.500">
            <Box p={1}>
                <HStack>
                    <Image 
                        src="https://online-edu.mirea.ru/pluginfile.php?file=%2F1%2Fcore_admin%2Flogocompact%2F300x300%2F1635634741%2FMIREA_Gerb_Colour.png"
                        objectFit="cover"
                        boxSize="40px"
                    />
                    <Link href={href()}>
                        <Text fontSize="md" as="samp">Сайт дистационного обучения РТУ МИРЭА</Text>
                    </Link>
                </HStack>
            </Box>
        </Box>
        </div>
    )
}