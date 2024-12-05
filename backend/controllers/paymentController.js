import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { amount, paymentMethod, transactionId, status } = req.body;

    // Save the payment details in the database
    const payment = await prisma.payment.create({
      data: {
        amount,
        paymentMethod,
        transactionId,
        status: status || 'Pending', // Default to 'Pending' if not provided
      },
    });

    res.status(201).json({
      message: 'Payment created successfully',
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create payment',
      error: error.message,
    });
  }
};

// Get payment status by transaction ID
export const getPaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch payment details by transaction ID
    const payment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return res.status(404).json({
        message: 'Payment not found',
      });
    }

    res.status(200).json({
      message: 'Payment found',
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch payment status',
      error: error.message,
    });
  }
};
