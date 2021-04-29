let express = require("express");
let app = express();
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createPool } = require("mariadb");
const pool = require("./db");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split(".")[1];
      console.log(req.body)
      cb(
        null,
        Math.round(Math.random() * 10000) + "." + ext
      );
    },
  });
  const upload = multer({ storage: storage });

const corsMiddleware = cors({
    credentials: true,
    origin: ["*", "http://localhost:8080"],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
});
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/post/:value", async (req, res) => {
    let conn = await pool.getConnection();
    const value = req.params.value;
    const rows = await conn.query(`SELECT * FROM share WHERE value=${value}`);
    conn.release();
    res.status(200).json(rows);
});

app.post("/api/post",upload.any('image'), async (req, res) => {
    let conn = await pool.getConnection();
    const data = req.body;
    
    const rows =
        await conn.query("INSERT INTO share(name, text, value, image) value (?,?,?,?)", [
            data.name,
            data.text,
            data.value,
            req.files[0].filename
        ]);
    
    conn.release();
    console.log(data);
    console.log("success");
    res.status(201).json(rows);
});

app.delete("/api/post/:id", async(req, res) => {
    let conn = await pool.getConnection();
    const textid = req.params.id;
    await conn.query(`DELETE FROM share where textid = ?`,[textid])
    res.status(201).json({ success: true });
})

app.put("/api/post/:id", async(req,res) => {
  let conn = await pool.getConnection();
  const textid = req.params.id;
  const data = req.body;
  await conn.query(`UPDATE share set text= ? where textid = ?`, [data.text,textid])
  console.log("success");
  res.status(201).json({ success: true });
})

app.use("/image", express.static("uploads"));

app.listen(5000, () => {
    console.log("Start server at port 5000");
})