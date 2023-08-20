const Flight = require("../models/flight");

module.exports = {
  index,
  new: newFlight,
  create,
};

async function index(req, res) {
  if (req.query.sorted === 'on') {
    res.render("flights/index", {
      flights: await Flight.find({}).sort({ departs: 1 }),
      title: "All flights",
      checked: "checked",
    });
  } else {
    res.render("flights/index", {
      flights: await Flight.find({}),
      title: "All flights",
      checked: "",
    });
  }
}

function newFlight(req, res) {
  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departs;
  // Format the date for the value attribute of the input
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  departsDate += `-${dt.getDate().toString().padStart(2, "0")}T${dt
    .toTimeString()
    .slice(0, 5)}`;
  res.render("flights/new", {
    departsDate,
    title: "Add flight",
    errorMsg: "",
  });
}

async function create(req, res) {
  console.log(req.body);
  try {
    await Flight.create(req.body);
    res.redirect("/flights");
  } catch (err) {
    console.log(err);
    res.render("flights/new", {
      title: "Add flight",
      errorMsg: err.message,
    });
  }
}
