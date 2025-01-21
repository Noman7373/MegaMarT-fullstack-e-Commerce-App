import Stripe from "../DB/stripe.js";

export const getOrderProduct = async (lineItems, userId) => {
  const productList = [];
  if (lineItems?.data?.length) {
    for (let item of lineItems.data) {
      const products = await Stripe.products.retrieve(item.price.product);

      const Payload = {
        userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: products.metadata.productId,
        product_details: {
          name: products?.name || "Unknown Product",
          image: products?.image || "No Image Available",
        },
        paymentId: products.payment_intent,
        payment_status: products.payment_status,
        delivery_address: products.metadata.addressId,
        subTotalAmount: products.amount_total,
        totalAmount,
      };
    }
  }
};
