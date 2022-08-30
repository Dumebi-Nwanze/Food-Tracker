const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const FoodModel = require("./models/Food.js");

app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://mernstack:mernstack@merncrud.wikvvfw.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("error in connection");
    } else {
      console.log("mongodb is connected");
    }
  }
);
app.post("/insert", (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({
    foodName: foodName,
    daysSinceIAte: days,
  });
  try {
    food.save();
    res.send(`${food.foodName} ${food.daysSinceIAte}`);
    res.end();
  } catch (e) {
    console.log(e);
  }
});

app.get("/read", (req, res) => {
  FoodModel.find({}, (error, result) => {
    if (error) {
      res.send(error);
    }
    res.send(result);
  });
});

app.put("/update", (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;
  try {
    FoodModel.findByIdAndUpdate(
      id,
      {
        foodName: newFoodName,
      },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});
app.listen(3001, () => {
  console.log("Server running on port 3001....");
});
