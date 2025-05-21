const transporter = require("../config/emailConfig");

const sendBookingMail = async (bookedData, email, Booking_ID) => {
  // Calculate number of nights
  const checkInDate = new Date(bookedData.check_in);
  const checkOutDate = new Date(bookedData.check_out);
  const timeDifference = checkOutDate - checkInDate;
  const numberOfNights = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const numberOfDays = numberOfNights + 1; // Typically, days = nights + 1

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Booking Confirmation #" + Booking_ID,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background-color: #2a3f54; padding: 20px; color: white; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Booking Confirmation</h1>
        </div>
        
        <div style="padding: 20px;">
          <p>Dear, ${bookedData.userName},</p>
          
          <p>Thank you for your booking with CloudBnB. Your reservation has been confirmed and we're preparing for your stay.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3 style="margin-top: 0;">Booking Details</h3>
            <p><strong>Booking ID:</strong> #${Booking_ID}</p>
            <p><strong>Property:</strong> ${bookedData.title}</p>
            <p><strong>Check-in:</strong> ${bookedData.check_in}</p>
            <p><strong>Check-out:</strong> ${bookedData.check_out}</p>
            <p><strong>Duration:</strong> ${numberOfNights} nights / ${numberOfDays} days</p>
            <p><strong>Guests:</strong></p>
            <ul style="margin-top: 0;">
              <li>Adults: ${bookedData.guests.adults}</li>
              <li>Children: ${bookedData.guests.children}</li>
              <li>Infants: ${bookedData.guests.infants}</li>
              <li>Pets: ${bookedData.guests.pets}</li>
            </ul>
            <p><strong>Total Price:</strong> ₹${bookedData.totalPrice}</p>
            <p><strong>Booking Date:</strong> ${new Date(bookedData.createdAt).toLocaleString()}</p>
          </div>
          
          <p>We've sent this confirmation to ${email}. Please keep this information for your records.</p>
          
          <p>If you have any questions about your booking or need to make changes, please contact our customer service team.</p>
          
          <p>We look forward to welcoming you!</p>
          
          <p>Best regards,<br>The CloudBnB Team</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #666;">
          <p>Thank you for choosing CloudBnB</p>
          <p>© ${new Date().getFullYear()} CloudBnB. All rights reserved.</p>
        </div>
      </div>
    `,
  });
};

module.exports = sendBookingMail;