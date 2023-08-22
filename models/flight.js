const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
  },
  arrival: {
    type: Date,
  },
})

const flightSchema = new Schema(
  {
    airline: {
      type: String,
      enum: ["American", "Southwest", "United"],
    },
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
      default: "DEN",
    },
    flightNo: {
      type: Number,
      min: 10,
      max: 9999,
    },
    departs: {
      type: Date,
      default: () => Date.now() + 365 * 24 * 60 * 60 * 1000,
    },
    destinations: [destinationSchema],
    tickets: [{
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);
