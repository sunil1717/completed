const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const BookingSlot = require("../models/BookingSlot");
const Booking = require("../models/Booking");
const Tyreall = require("../models/Tyreall");


// ✅ Setup transporter (example: Gmail, better use custom domain SMTP in production)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password
  },
});


//helper function for generate order id
function generateOrderId() {
  const timestamp = Date.now().toString(36); // base36 -> shorter unique part
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${timestamp}-${randomStr}`;
}


// Confirm booking endpoint
router.post("/confirm", async (req, res) => {
  const booking = req.body; // this is your bookingPayload from frontend
  const {
    cart,
    form,
    formNew,
    formData,
    selectedTyres,
    selectedDate,
    selectedTime,
    total,
    finalAmount,
    appliedCoupon,
  } = booking;

  const orderId = generateOrderId();

  try {
    // -----------------------
    // 1. Email to Shopkeeper
    // -----------------------
    const shopkeeperMail = {
      from: process.env.EMAIL_USER,
      to: process.env.SHOPKEEPER_EMAIL, // shopkeeper email
      subject: `🛒 New Order from ${form.firstName}`,
      html: `
        <h2>New Booking Received</h2>
        <p><b>Name:</b> ${form.firstName} ${form.lastName}</p>
        <p><b>Email:</b> ${form.email}</p>
        <p><b>Phone:</b> ${form.phone}</p>
        <p><b>Address:</b> ${formNew.address}</p>
        <p><b>suburb:</b> ${formNew.suburb}</p>
        <p><b>Postcode:</b> ${formNew.postcode}</p>

        <p><b>Date:</b> ${selectedDate}</p>
        <p><b>Time:</b> ${selectedTime}</p>
        <p><b>Vehicle No:</b> ${formData.vehicleDetails}</p>
        <p><b>State:</b> ${formData.state}</p>
        <p><b>Colour:</b> ${formData.colour}</p>
        <p><b>Make:</b> ${formData.make}</p>
        <p><b>Model:</b> ${formData.model}</p>
        <p><b>Coupon Applied:</b> ${appliedCoupon || "None"}</p>
        <p><b>Total:</b> $${total}</p>
        <p><b>Final Amount:</b> $${finalAmount || total}</p>
        <h3>Items:</h3>
        <ul>
          ${cart
          .map(
            (item) =>
              `<li>${item.brand}-${item.model} (${item.width} /${item.profile}R${item.rimSize}) - Qty: ${item.quantity
              } - $${item.price * item.quantity}</li>`
          )
          .join("")}
        </ul>
        <h3>Selected Tyres To be Replaced:</h3>
        <ul>
            ${selectedTyres ? selectedTyres.map((tyre) => `<li>${tyre}</li>`).join("") : "None"
        }

        </ul>
      `,
    };

    await transporter.sendMail(shopkeeperMail);

    // -----------------------
    // 2. Confirmation to User
    // -----------------------
    const userMail = {
      from: process.env.EMAIL_USER,
      to: form.email,
      subject: "✅ Order Confirmation - Thank you!",
      html: `
        <h2>Hi ${form.firstName},</h2>
        <p>Thank you for your booking. Here are your order details:</p>
        <p><b> your Order ID:</b> ${orderId}</p>
        <p><b>Date:</b> ${selectedDate}</p>
        <p><b>Time:</b> ${selectedTime}</p>
        <p><b>Address:</b> ${formNew.address}</p>
         <p><b>suburb:</b> ${formNew.suburb}</p>
        <p><b>Postcode:</b> ${formNew.postcode}</p>

        <p><b>Vehicle No:</b> ${formData.vehicleDetails}</p>
        <p><b>State:</b> ${formData.state}</p>
        <p><b>Colour:</b> ${formData.colour}</p>
        <p><b>Make:</b> ${formData.make}</p>
        <p><b>Model:</b> ${formData.model}</p>
         <h3>Selected Tyres To be Replaced:</h3>
        <ul>
            ${selectedTyres ? selectedTyres.map((tyre) => `<li>${tyre}</li>`).join("") : "None"
        }

        </ul>
        <h3>Items:</h3>
        <ul>
          ${cart
          .map(
            (item) =>
              `<li>${item.brand} ${item.model} (${item.width}/${item.profile}R${item.rimSize}) - Qty: ${item.quantity
              } - $${item.price * item.quantity}</li>`
          )
          .join("")}
        </ul>
        <p><b>Total:</b> $${total}</p>
        <p><b>Final Paid Amount:</b> $${finalAmount || total}</p>
        <br/>
        <p>We will contact you soon!</p>
      `,
    };

    await transporter.sendMail(userMail);



    //--------------------------------------------------------------------------------------------
    //3-Creat Booking Sloat ---------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------

    if (!selectedDate || !selectedTime) {
      return res
        .status(400)
        .json({ success: false, message: "Date and phase are required" });
    }

    // Determine default availability based on phase
    let defaultAvailable = 0;
    if (["morning", "lunch", "afternoon"].includes(selectedTime)) {
      defaultAvailable = 3;
    } else if (selectedTime === "flexible") {
      defaultAvailable = 1;
    } else {
      return res.status(400).json({ success: false, message: "Invalid phase" });
    }

    // Atomically find slot or create if missing, and decrement availableSlots
    const slot = await BookingSlot.findOneAndUpdate(
      { date: selectedDate, phase: selectedTime }, // search criteria
      { $inc: { availableSlots: -1 } },           // decrement slots
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // If slot was just created (upserted), initialize availableSlots properly
    if (slot.availableSlots < 0) {
      slot.availableSlots = defaultAvailable - 1;
      await slot.save();
    }

    // Check if fully booked after decrement
    if (slot.availableSlots < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Slot is fully booked" });
    }



    ////////////////////////////////////////////////////////////////////////////

    // Save booking in DB
const newBooking = new Booking({
  orderId,
  customer: {
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phone: form.phone,
  },
  address: {
    address: formNew.address,
    suburb: formNew.suburb,
    postcode: formNew.postcode,
  },
  vehicle: {
    vehicleDetails: formData.vehicleDetails,
    state: formData.state,
    colour: formData.colour,
    make: formData.make,
    model: formData.model,
  },
  cart,
  selectedTyres,
  selectedDate,
  selectedTime,
  appliedCoupon,
  total,
  finalAmount,
  status: "pending", // default
});

await newBooking.save();


// STOCK UPDATE LOGIC HERE
for (const item of cart) {
  try {
    // Force quantity into a number
    const orderedQty = Number(item.quantity);

    const tyre = await Tyreall.findOne({
      Brand: item.brand,
      Model: item.model,
      SIZE: `${item.width}/${item.profile}R${item.rimSize}`, // adjust if SIZE format differs
    });

    if (tyre) {
      const currentStock = parseInt(tyre["In Stock"], 10) || 0;
      const newStock = currentStock - orderedQty;

      // Save back as string (your schema uses String type)
      tyre["In Stock"] = String(newStock >= 0 ? newStock : 0);
      await tyre.save();

      console.log(`✅ Stock updated for ${item.brand} ${item.model}: ${currentStock} → ${tyre["In Stock"]}`);
    } else {
      console.warn(`⚠️ Tyre not found in DB: ${item.brand} ${item.model} ${item.width}/${item.profile}R${item.rimSize}`);
    }
  } catch (err) {
    console.error(`❌ Failed to update stock for ${item.brand} ${item.model}`, err);
  }
}




    // Return success
    res.status(200).json({
      success: true,
      message: `Slot booked for ${selectedDate} (${selectedTime})`,
      booking: newBooking,
      data: slot,
    });





  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send emails" });
  }
});

module.exports = router;
