import React from 'react'
import "./Cartitem.css"
import { Text, Box, Divider } from "@chakra-ui/react"
const Cartitems = ({ image_link, name, quantity, price }) => {
    return (
        <div className='cartitems'>
            <div>
                <img src={image_link} alt={name} />
            </div>
            <Box className='cartitemdet'>
                <Text fontSize={'xl'} color='black' fontWeight={'600'} textAlign='left'>{name}</Text>
                <Text marginTop='10px' fontSize={'18px'} textAlign='left' color='black' fontWeight={'600'}>{quantity} Items Left</Text>
                <Box marginTop='10px' display={'flex'} gap='10px'>
                    <button>Remove</button>
                    <Divider orientation='vertical' margin='auto'border='1px solid gray' h={'12px'} />
                    <button>Move to wishlist</button>
                </Box>
            </Box>
            <Text fontSize={'xl'} color='black' fontWeight={'600'}>₹{price * 75}</Text>
        </div>
    )
}

export default Cartitems