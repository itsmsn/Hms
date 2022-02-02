const { response } = require('express');
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const patientm = mongoose.model('hms');
const patients = new patientm;


router.get('/', (req, res) => {
    console.log(req.body);
    res.render('addOrupdate');
    viewTitle: "Add / Update Patient";
    //res.json('sample text');
})

router.post('/', (req, res) => {
    if (req.body._id == '') {
        console.log(req.body);
        addPatient(req, res);
    }
    else if (req.body._id != '') {
        console.log(req.body);
        updatePatient(req, res);
    }
    else {
        console.log(req.body);
        search(req,res);
    }
});

router.post('/list',(req,res)=>{
    search(req,res);
})


/*function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}*/

function updatePatient(req, res) {
    patientm.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect("/patient/list");
        }
        else {
            console.log('error in updating the patient');
        }
    }).lean()
}



function addPatient(req, res) {
    var patient = new patientm();
    patient.firstname = req.body.firstname;
    patient.lastname = req.body.lastname;
    patient.prescription = req.body.prescription;
    $push: {prescription: req.body.prescription};
    patient.cnumber = req.body.cnumber;
    patient.visits = req.body.visits;
    ++patient.visits;
    patient.save((err, doc) => {
        if (!err) {
            console.log('data saved');
            res.redirect('patient/list');
        }
        else {
            console.log('error in data insertion !');
        }
    });
};


function search(req, res) {
    patientm.find({ cnumber: req.body.cnumber }, (err, doc) => {
        if (!err) {
             res.redirect('search');
            //res.render('search', { viewTitle: `Search Results For ${req.body.cnumber}`, patient: doc });
        }
        else {
            console.log('error in searching patients');
        }
    }).lean();
}


router.get('/list', (req, res) => {
    patientm.find((err, doc) => {
        if (!err) {
            res.render("list", {
                list: doc
            });
        }
        else {
            console.log('error in retriving patients list');
        }
    }).lean()
});


router.get('/delete/:id', (req, res) => {
    patientm.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/patient/list');
        }
        else {
            console.log('error in deleting the patient');
        }
    }).lean();
});

router.get( '/search', (req, res) => {
    console.log(req.query);
    patientm.find({ cnumber: req.query.Search }, (err, doc) => {
        if (!err) {
            res.render('search', { viewTitle: `Search Results For ${req.query.Search}`, i: doc });
            //console.log(doc[0]);
        }
        else {
            console.log('error in searching patients');
        }
    }).lean();
});



router.get('/:id', (req, res) => {
    patientm.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('addOrupdate', { viewTitle: 'Update Patient Record', patient: doc });
        }
        else {
            console.log('error in Retriving the patient');
        }

    }).lean();
});

router.get('/previous/:id',(req,res)=>{
    patientm.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('previous', { viewTitle: '=====Add Another Patient Record=====', patient: doc });
            viewTitle: 'Previous Prescription';
        }
        else {
            console.log('error in updating the patient prescription');
        }
    }).lean();
});

router.post('/previous/:id',(req,res)=>{
    console.log(req.body);
    patientm.findOneAndUpdate({ _id: req.body._id }, {$push: {prescription: req.body.prescription}}, (err, doc) => {
        if (!err) {
            res.redirect("/patient/list");
        }
        else {
            console.log('error in updating the patient');
        }
    }).lean()
})




module.exports = router;