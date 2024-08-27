const User = require('../models/auth');
const axios = require('axios');

const AddCartRemove = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { userId } = req.body;

        
        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ msg: 'User not found' });
        }

      
        const productResponse = await axios.get(`http://localhost:7000/api/Prod/cart/${cartId}`);
        const productData = productResponse.data;
        const product = productData.Products[0];

        if (!product) {
            console.error('Product not found');
            return res.status(404).json({ msg: 'Product not found' });
        }

        console.log('Product fetched from API:', product);

        
        const isCart = user.Cart.some((item) => item.cartId.toString() === cartId);
        if (!isCart) {
            
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        Cart: {
                            cartId: product._id,
                            Photo: product.Photo1,
                            Price: product.Price,
                            PrevPrice: product.PrevPrice,
                            Description: product.Description
                        }
                    }
                },
                { new: true } 
            );

            console.log('Product added to cart:', updatedUser.Cart);

            return res.status(201).json({
                message: 'Product added to cart',
                updatedCart: updatedUser.Cart
            });
        } else {
            
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $pull: {
                        Cart: {
                            cartId: cartId
                        }
                    }
                },
                { new: true } 
            );

            console.log('Product removed from cart:', updatedUser.Cart);

            return res.status(201).json({
                message: 'Product removed from cart',
                updatedCart: updatedUser.Cart
            });
        }
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ msg: 'Server error' });
    }
};

const history = async(req,res)=>
{
    try
    {
        const {userId} = req.params;
        const {prods} = req.body;
        console.log(prods)
        const user = User.findById(userId);
        if(!user)
        {
            return res.status(404).json({msg:"User not found"});
        }
       const updatedHistory =  await User.findByIdAndUpdate(userId,{
            $push:{
                History:{
                    ProdId:prods._id,
                    Price:prods.Price,
                    Description:prods.Description,
                    Photo:prods.Photo1
                }
            }
        
        },
    {
        new:true
    })
    console.log(updatedHistory.History)
    return res.status(201).json(updatedHistory);

    }
    catch(err)
    {
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

module.exports = { AddCartRemove,history };
