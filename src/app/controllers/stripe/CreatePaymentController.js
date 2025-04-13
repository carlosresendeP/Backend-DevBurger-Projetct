import Stripe from "stripe";
import * as yup from 'yup'
import 'dotenv/config.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        return acc + current.price * current.quantity;
    }, 0);
    return total;
}


const CreatePaymentController = async (req, res) => {

    const schema = yup.object({
        products: yup.array().required().of(yup.object({
            id: yup.number().required(),
            quantity: yup.number().required(),
            price: yup.number().required(),
        })),
    })

    try {
        await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
        return res.status(400).json({ error: error.errors })
    }

    const { products } = req.body;

    const amount = calculateOrderAmount(products);


    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount, //é p mesmo ja feito acima
        currency: "brl",

        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.json({
        clientSecret: paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    });
}

export default CreatePaymentController;
