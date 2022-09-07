const fs = require("fs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	let database = getDb();
	res.json(database);
});
router.post("/", (req, res) => {
	let database = getDb();
	req.body.id = newId(database);
	database.push(req.body);
	setDb(database);
	res.send("Saved.");
});
router.delete("/:note", (req, res) => {
	let database = getDb();
	let ids = database.map(e => e.id);
	let deleteIndex = ids.indexOf(parseInt(req.params.note));
	database.splice(deleteIndex, 1);
	setDb(database);
	res.send("Deleted.");
});






const getDb = () => JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
const setDb = (db) => fs.writeFileSync("./db/db.json", JSON.stringify(db, null, 4));

function newId(db) {
	let ids = db.map(e => e.id);

	if (ids.length > 0)
		return Math.max(...ids) + 1;
	else
		return 1;
}

module.exports = router;