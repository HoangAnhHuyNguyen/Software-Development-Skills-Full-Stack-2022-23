const express = require("express")
// const router = express.Router();
const studentModel = require('../src/student/studentModel');
const cors = require('cors');
const app = express();

const corsOption = {
    origin: '*',
    methods: ['DELETE', 'PUT', 'POST'],
    // credentials: true,
    preflightContinue: true,
}

// app.use(cors(corsOption));

app.use(cors(corsOption));

// add records
app.post('/students/create', async(req,res)=>{

    const student = new studentModel(req.body)
    try{
            await student.save();
            res.send(student);
    }
    catch(error)
    {
        res.status(400).send(error);
    }



});

// view records
app.get('/students', cors(corsOption), async(req,res)=>{

    try{
            const students = await studentModel.find({});
            // res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.send(students);
    }
    catch(error)
    {
        res.status(400).send(error);
    
    }
});


// find records


app.get('/students/:id', cors(corsOption), async(req,res)=>{

    try{
            const _id = req.params.id;
            const students = await studentModel.findById({_id});

            if(!students)
            {
                return res.status(404).send();
            }
    }
    catch(error)
    {
        res.status(400).send(error);
    
    }

});


//update records
app.put('/students/update/:id', cors(corsOption), async(req,res)=>{

    try{
            const _id = req.params.id;
            const body = req.body;
            const updatestudents = await studentModel.findByIdAndUpdate(_id,body,{new:true});
            if(!updatestudents)
            {
                return res.status(404).send();
            }

    }
    catch(error)
    {
        res.status(400).send(error);
    
    }


});


//delete records
app.delete('/students/delete/:id', async(req,res)=>{

    try{
            const _id = req.params.id;
            const deletestudents = await studentModel.findByIdAndDelete(_id);
            res.send("Deleted");

            if(!deletestudents)
            {
                res.status(404).send();
            }
    }
    catch(error)
    {
        res.status(400).send(error);
    
    }

});




module.exports = app;
