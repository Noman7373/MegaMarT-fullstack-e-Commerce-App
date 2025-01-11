import stripe from "stripe";

const stripe = stripe(process.env.SITRIPE_SECRET_KEY); // Create a new Stripe instance with your secret key
