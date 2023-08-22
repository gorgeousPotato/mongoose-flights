const Flight = require("../models/flight");
const Ticket = require("../models/ticket")

module.exports = {
  new: newTicket,
  create,
};

function newTicket(req,res) {
  const flightId = req.params.id;
  res.render("tickets/new", {
    title: "Add ticket",
    flightId,
    errorMsg: "",
  });
}

async function create(req,res) {
  const newTicket = req.body;
  newTicket.flight = req.params.id;
  try {
    await Ticket.create(newTicket);
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/flights/${req.params.id}`);
}