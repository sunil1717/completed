// controllers/bookingController.js
const BookingSlot = require("../models/BookingSlot");


const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");


dayjs.extend(utc);
dayjs.extend(timezone);

const ADELAIDE_TZ = "Australia/Adelaide";



const phases = ["morning", "lunch", "afternoon"];

// Book a slot (create if not exist, otherwise decrease)
const bookSlot = async (req, res) => {
  try {
    const { selectedDate, selectedTime } = req.body;

    if (!selectedDate || !selectedTime) {
      return res.status(400).json({ success: false, message: "Date and phase are required" });
    }

    // === FLEXIBLE BOOKING HANDLING ===
    if (selectedTime === "flexible") {
      // Randomize phases order
      const shuffledPhases = phases.sort(() => 0.5 - Math.random());
      let bookedPhase = null;

      for (const phase of shuffledPhases) {
        let slot = await BookingSlot.findOne({ date: selectedDate, phase });

        if (!slot) {
          // Create new slot if not exist
          slot = new BookingSlot({
            date: selectedDate,
            phase,
            availableSlots: 2, // default 3 - 1 (because booking this now)
          });
          await slot.save();
          bookedPhase = phase;
          break;
        }

        if (slot.availableSlots > 0) {
          slot.availableSlots -= 1;
          await slot.save();
          bookedPhase = phase;
          break;
        }

        // else: this phase exists but is full, continue loop
      }

      if (!bookedPhase) {
        return res.status(400).json({ success: false, message: "All slots are fully booked for this date" });
      }

      return res.json({ success: true, message: `Booked successfully in ${bookedPhase}`, date: selectedDate });
    }

    // === NORMAL BOOKING HANDLING ===
    let defaultAvailable = 0;
    if (["morning", "lunch", "afternoon"].includes(selectedTime)) {
      defaultAvailable = 3;
    } else {
      return res.status(400).json({ success: false, message: "Invalid phase" });
    }

    let slot = await BookingSlot.findOne({ date: selectedDate, phase: selectedTime });

    if (!slot) {
      slot = new BookingSlot({
        date: selectedDate,
        phase: selectedTime,
        availableSlots: defaultAvailable - 1, // create with 2 left
      });
      await slot.save();
    } else if (slot.availableSlots > 0) {
      slot.availableSlots -= 1;
      await slot.save();
    } else {
      return res.status(400).json({ success: false, message: "Slot is fully booked" });
    }

    return res.json({ success: true, message: "Booked successfully", date: selectedDate, phase: selectedTime });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





// Default capacity for phases
const defaultCapacity = {
  morning: 3,
  lunch: 3,
  afternoon: 3,
};

const checkAvailability = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required" });
    }



    const now = dayjs().tz(ADELAIDE_TZ);
    const selected = dayjs(date).tz(ADELAIDE_TZ);


    // Fetch all slots already created for that date
    const slots = await BookingSlot.find({ date });

    // Start with default availability
    const availability = { ...defaultCapacity };

    // Override with DB values if found
    slots.forEach((slot) => {
      if (slot.phase !== "flexible") {
        availability[slot.phase.toLowerCase()] = slot.availableSlots;
      }
    });


    // === AUTO CUTOFF RULES ===
    if (selected.isSame(now, "day")) {
      // Morning always disabled today
      await BookingSlot.updateOne(
        { date, phase: "morning" },
        { $set: { availableSlots: 0 } },
        { upsert: true }
      );
      availability.morning = 0;

      // Lunch disabled after 8AM
      if (now.hour() >= 8) {
        await BookingSlot.updateOne(
          { date, phase: "lunch" },
          { $set: { availableSlots: 0 } },
          { upsert: true }
        );
        availability.lunch = 0;
      }

      // Afternoon disabled after 11AM
      if (now.hour() >= 11) {
        await BookingSlot.updateOne(
          { date, phase: "afternoon" },
          { $set: { availableSlots: 0 } },
          { upsert: true }
        );
        availability.afternoon = 0;
      }
    }

    // Tomorrow morning disabled if it's after 9PM today
    if (selected.isSame(now.add(1, "day"), "day") && now.hour() >= 21) {
      await BookingSlot.updateOne(
        { date, phase: "morning" },
        { $set: { availableSlots: 0 } },
        { upsert: true }
      );
      availability.morning = 0;
    }

    // // Flexible = sum of others
    // availability.flexible =
    //   availability.morning + availability.lunch + availability.afternoon;

   

    // Calculate flexible dynamically
    availability["flexible"] =
      availability.morning + availability.lunch + availability.afternoon;

    res.status(200).json({
      success: true,
      date,
      availability,
    });

    
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {
  bookSlot,
  checkAvailability
};

