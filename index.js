var express = require("express");
var cors = require("cors");
require("dotenv").config();
var app = express();
app.use(cors({ origin: "*" })); // For FCC testing purposes only
app.use("/public", express.static(process.cwd() + "/public"));

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .type("application/json")
        .json({ error: "No file uploaded" });
    }

    res.status(200).type("application/json").json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
    });
  });
});

const port = process.env.PORT || 3000;
app.listen(port);
