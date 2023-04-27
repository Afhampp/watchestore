const admindb = require("../model/adminmodel");
const userdb = require("../model/usermodel");
const orderdb = require("../model/ordermodel");

const bcrypt = require("bcrypt");

const securedPassword = async (password) => {
  const hashedpassword = await bcrypt.hash(password, 10);
  return hashedpassword;
};
const getadminlogin = (req, res) => {
  try {
    res.render("admin/adminlogin");
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};
const postadmin = async (req, res) => {
  try {
    const admicheck = await admindb.findOne({ admin: req.body.admin });

    if (admicheck) {
      const passwordcheck = await admindb.findOne({
        password: req.body.password,
      });
      if (passwordcheck) {
        req.session.admin_id = admicheck._id;
        res.redirect("/admin/home");
      } else {
        res.render("admin/adminlogin", { passmessage: "Invalid password" });
      }
    } else {
      res.render("admin/adminlogin", { emailmessage: "Invalid email" });
    }
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};
const dashboard = async (req, res) => {
  try {
    const id = req.session.admin_id;
    const from=req.query.datefrom
    const to=req.query.dateto
    console.log(from,to)
    const userdata = await userdb.find().countDocuments();
    const admin = await admindb.findOne({ _id: id });
    if(from && to){
      console.log("kerii")
      const fr=new Date(req.query.datefrom)
      const t=new Date(req.query.dateto)
      const sales = await orderdb.find({ is_complete: true, date: { $gte: fr, $lte: t } }).sort({ date: -1 });
      const totalsales = await orderdb.find({ is_complete: true }).countDocuments()
    
      const totalcod = await orderdb.find({$and:[{ is_complete: true },{paymentmethod:"Cash On Delivery"}]}).countDocuments()
      const totalonline = await orderdb.find({$and:[{ is_complete: true },{paymentmethod:"online payment"}]}).countDocuments()
      const salestotal = sales.reduce((total, value) => {
        return total + value.totalprice;
      }, 0);
      res.render("admin/admindashbord", {
        adminheadlink: true,
        adminheader: true,
        admin,
        sales,
        salestotal,
        userdata,
        totalsales,
        totalcod,
        totalonline,
        adminfooter: true,
      });
    }
    else if(from){
      console.log("kerii fromik")
      const fr=new Date(req.query.datefrom)
      console.log(fr)
      const sales = await orderdb.find({ is_complete: true, date: { $gte: fr } }).sort({ date: -1 });
      console.log(sales)
      const totalsales = await orderdb.find({ is_complete: true }).countDocuments()
    
      const totalcod = await orderdb.find({$and:[{ is_complete: true },{paymentmethod:"Cash On Delivery"}]}).countDocuments()
      const totalonline = await orderdb.find({$and:[{ is_complete: true },{paymentmethod:"online payment"}]}).countDocuments()
      const salestotal = sales.reduce((total, value) => {
        return total + value.totalprice;
      }, 0);
      res.render("admin/admindashbord", {
        adminheadlink: true,
        adminheader: true,
        admin,
        sales,
        salestotal,
        userdata,
        totalsales,
        totalcod,
        totalonline,
        adminfooter: true,
      });
    }
    else if(to){
      console.log("kerii toik")
      const t=new Date(req.query.dateto)
      console.log(t)
      const sales = await orderdb.find({ is_complete: true, date: { $lte: t } }).sort({ date: -1 });
      const totalsales = await orderdb.find({ is_complete: true }).countDocuments()
    
      const totalcod = await orderdb.find({$and:[{ is_complete: true },{paymentmethod:"Cash On Delivery"}]}).countDocuments()
      const totalonline = await orderdb.find({$and:[{ is_complete: true },{paymentmethod:"online payment"}]}).countDocuments()
      const salestotal = sales.reduce((total, value) => {
        return total + value.totalprice;
      }, 0);
      res.render("admin/admindashbord", {
        adminheadlink: true,
        adminheader: true,
        admin,
        sales,
        salestotal,
        userdata,
        totalsales,
        totalcod,
        totalonline,
        adminfooter: true,
      }, function(err, html) {
          if (err) {
              console.log(err);
              return res.status(500).send('Error rendering view');
          }
          res.send(html);
      }
      );
      
    }
    else{
      console.log("ithikaaa")
      const sales = await orderdb.find({ is_complete: true }).sort({ date: -1 });
  
    const totalsales = await orderdb.find({ is_complete: true }).countDocuments()
    
    const totalcod = await orderdb.find({$and:[{ is_complete: true },{paymentmethod:"Cash On Delivery"}]}).countDocuments()
    const totalonline = await orderdb.find({$and:[{ is_complete: true },{paymentmethod:"online payment"}]}).countDocuments()
    const salestotal = sales.reduce((total, value) => {
      return total + value.totalprice;
    }, 0);
    res.render("admin/admindashbord", {
      adminheadlink: true,
      adminheader: true,
      admin,
      sales,
      salestotal,
      userdata,
      totalsales,
      totalcod,
      totalonline,
      adminfooter: true,
    });
    }
    
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};
const blockuser = async (req, res) => {
  try {
    const userdata = await userdb.findOne({ _id: req.query.id });
    if (userdata) {
      await userdb.updateOne({ _id: userdata }, { $set: { is_blocked: true } });
      res.redirect("/admin/table");
    }
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};
const unblockuser = async (req, res) => {
  try {
    const userdata = await userdb.findOne({ _id: req.query.id });
    if (userdata) {
      await userdb.updateOne(
        { _id: userdata },
        { $set: { is_blocked: false } }
      );
      res.redirect("/admin/table");
    }
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};
const tabledata = async (req, res) => {
  try {
    const userinfo = await userdb.find();
    if (userinfo) {
      res.render("admin/adminusertable", {
        adminheadlink: true,
        adminheader: true,
        userinfo,
        adminfooter: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};

const getlogout = (req, res) => {
  try {
    req.session.admin_id = false;
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.render("error");
  }
};

module.exports = {
  getadminlogin,
  postadmin,
  dashboard,
  blockuser,
  unblockuser,
  tabledata,

  getlogout,
};
