var Medicine = require("../models/medicine");
// List of all medicines
exports.medicine_list = async function (req, res) {
try {
var data = await Medicine.find({});
res.send("The data is \n" + data);
 } catch (err) {
res.status(500);
res.send(`{"error": ${err}}`);
 }
};
// for a specific medicine.
exports.medicine_detail = async function (req, res) {
    console.log("detail"  + req.params.id)
    try {
        result = await Medicine.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};



// Handle medicine create on POST.
exports.medicine_create_post = async function (req, res) {
console.log(req.body);
let document = new Medicine();
// We are looking for a body, since POST does not have query parameters.
// Even though bodies can be in many different formats, we will be picky
// and require that it be a json object
// {"costumetype":"goat", "cost":12, "size":"large"}
document.type = req.body.type;
document.cost = req.body.cost;
document.name= req.body.name;
try {
let result = await document.save();
res.send(result);
 } catch (err) {
res.error(500, `{"error": ${err}}`);
 }
};
// Handle medicine delete form on DELETE.



// Handle medicine update form on PUT.
exports.medicine_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Medicine.findById( req.params.id)
        // Do updates of properties
        if(req.body.type) toUpdate.type = req.body.type;
        if(req.body.cost) toUpdate.cost = req.body.cost;
        if(req.body.name) toUpdate.name = req.body.name;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

exports.medicine_delete = async function(req, res) {
    console.log("delete "  + req.params.id)
    try {
        result = await Medicine.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.medicine_view_one_Page = async function(req, res) {
    console.log("single view for id "  + req.query.id)
    try{
        result = await Medicine.findById( req.query.id)
        res.render('medicinedetail', 
{ title: 'Medicine Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.medicine_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('medicinecreate', { title: 'Medicine Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
// Handle building the view for updating a costume.
// query provides the id
exports.medicine_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await Medicine.findById(req.query.id)
        res.render('medicineupdate', { title: 'Medicine Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
// Handle a delete one view with id from query
exports.medicine_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await Medicine.findById(req.query.id)
        res.render('medicinedelete', { title: 'Medicine Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};















