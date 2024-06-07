const express = require("express");
const { teams, players } = require("./model/index");
require("./model/index");

const app = express();
app.use(express.json());
app.post("/teamdata", async (req, res) => {
  const { name, data } = req.body;
  const teamDatas = await teams.create({
    name: name,
  });
  if (teamDatas && teamDatas.id) {
    data.map(async (data) => {
      await players.create({
        name: data.name,
        address: data.address,
        playerId: data.playerId,
        age: data.age,
        teamId: teamDatas.id,
      });
    });
  }

  res.status(200).json({
    message: "data posted successfully",
  });
});
app.get("/teamdata/:id", async (req, res) => {
  const id = req.params.id;
  const data = await teams.findAll({
    where: {
      id: id,
    },
    include: [
      {
        model: players,
        attributes: ["name", "playerId", "address"],
      },
    ],
  });
  res.status(200).json({
    message: data,
  });
});
app.listen(3000, () => {
  console.log("server has started at port no.3000");
});
