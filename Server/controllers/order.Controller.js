import orderModels from "../models/orderModels.js";
import userModel from "../models/userModel.js";

const PaymentByCashController = (req, res) => {
  try {
    const userId = req.userId; // Auth Middleware

    const { itemsList, totalAmount, delivery_address_Id, subTotalAmount } =
      req.body;

    //  userId:
    //     orderId:
    //     productId:
    //     product_details: {
    //         name  ; "",
    //         image : "",
    //     }
    //     paymentId:
    //     payment_status:
    //     delivery_address:
    //     subTotalAmount:
    //     totalAmount:

    //     invoice_receipt:
  } catch (error) {
    return res(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { PaymentByCashController };
