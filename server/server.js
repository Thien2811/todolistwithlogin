import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.end("Thiens ToDo");
});

app.post("/addtask", (req, res) => {


    fs.readFile('todos.json', 'utf-8',  (err, data) => {
        if(err) {
            req.body.id = 0;
            const taskanfang = JSON.stringify({tasks: [req.body]});
            fs.writeFile('todos.json', taskanfang, err => {
                if(err) console.log(err);
            })
              res.status(200).json({id: 0});

        } else {
            const dataObj = JSON.parse(data)
            const sorted = dataObj.tasks.map(el => el.id).sort((a, b) => a-b);
            const highest = sorted[sorted.length-1];
            if(!highest && highest != 0){
                req.body.id = 0;
            } else {
            req.body.id = +highest+1;
            }
            dataObj.tasks.push(req.body);

            const dataOut = JSON.stringify(dataObj);
            fs.writeFile("todos.json", dataOut, (err) => {
                if (err) {
                  console.error(err);
                }
              });
              res.status(200).json({id: highest + 1});
        }
    });


});

app.get("/gettasks", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      res.status(404).end();
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.delete("/deletetask/:taskid", (req,res) => {
    const taskid = req.params.taskid;
    fs.readFile('todos.json', 'utf-8',  (err, data) => {
        
            const dataObj = JSON.parse(data)
            const index = dataObj.tasks.findIndex(el => el.id == taskid)
            dataObj.tasks.splice(index, 1)
            const dataOut = JSON.stringify(dataObj);
            fs.writeFile("todos.json", dataOut, (err) => {
                if (err) {
                  console.error(err);
                }
              });
              res.status(200).end();
        }
    );


});

app.listen(3000, () => {
  console.log("Server gestartet");
});
