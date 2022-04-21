const { Router } = require("express")
const express = require("express")
const app = express()
const PORT = 1112
const router = Router()
const cors = require("cors")
const mongoose = require('mongoose');

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(router)


async function go() {
    await mongoose.connect("mongodb://localhost/mevn")
    const Schema = mongoose.Schema;
    
    const Todo = new Schema({
        name: {
            type: String,
            minlength: 3
        },
        chk: {
            type: Boolean,
            default: false
        }
      });
      const TodoModel = mongoose.model("Todos", Todo)








    router.post("/create", async(req, res) => {
        const name = req.body.name
        console.log(name)

        await TodoModel.create({name})
        let all = await TodoModel.find()
        res.status(200).json(all)
    })


    router.get("/todos", async(req, res) => {
        let all = await TodoModel.find()
        res.status(200).json(all)
    })

    router.delete("/todos", async(req, res) => {
        let id = req.body.id
        await TodoModel.deleteOne({_id: id})
        console.log(id)
        res.status(200).json()
    })

    router.put("/todos", async(req, res) => {
        let id = req.body.id
        await TodoModel.findOneAndUpdate({_id: id}, {chk: true})
        console.log(id)
        res.status(200).json()
    })
    
    app.listen(PORT, () => {
        console.log("2121")
    })
}

go()




