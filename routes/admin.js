var express = require('express');
const nocache = require('nocache');
var adcontroller=require('../controller/adminController')
var authadmin=require('../middleware/adminauth')
var adminuploads=require('../middleware/upload')
var categoriescontroller=require('../controller/categeriosController')
var productcontroller=require('../controller/productController')
var bannercontroller=require('../controller/bannerController')
var ordercontroller=require('../controller/ordercontroller')
var coupeanController=require('../controller/coupenController')
var router = express.Router();


/* GET admin page. */
router.get('/',nocache(),authadmin.islogout,adcontroller.getadminlogin)
router.post('/login',adcontroller.postadmin)
router.get('/home',adcontroller.dashboard)
router.get('/logout',adcontroller.getlogout)



/* GET viewuser page. */
router.get('/table',adcontroller.tabledata)
router.get('/block',adcontroller.blockuser)
router.get('/unblock',adcontroller.unblockuser)



/* categerios */
router.get('/categories',categoriescontroller.getcategories)
router.get('/addcategories',categoriescontroller.showadd)
router.post('/add',categoriescontroller.addcategories)
router.get('/edit',categoriescontroller.editcat)
router.post('/updatecat',categoriescontroller.uploadcat)
router.get('/list',categoriescontroller.list)
router.get('/unlist',categoriescontroller.unlist)





/* products */
router.get('/addproduct',productcontroller.addproduct)
router.post('/postproduct',adminuploads.array('file',4),productcontroller.postproduct)
router.get('/showproduct',productcontroller.getproduct)
router.get('/editpage',productcontroller.editproductpage)
router.post('/editproduct',adminuploads.array('file',4),productcontroller.editproduct)
router.delete('/deletepro',productcontroller.productdelete)
router.get('/listpro',productcontroller.list)
router.get('/unlistpro',productcontroller.unlist)
router.delete('/deleteimage',productcontroller.imagedelete)
router.post('/addimage',productcontroller.addimage)


/* banner */
router.get('/getbannerpage',bannercontroller.getbannertable)
router.get('/geteditbanner',bannercontroller.geteditbanner)
router.post('/posteditbanner',adminuploads.single('file'),bannercontroller.posteditbanner)
router.get('/getaddbanner',bannercontroller.getaddbanner)
router.post('/postaddbanner',adminuploads.single('file'),bannercontroller.postaddbanner)


/* order */
router.get('/getorderpage',ordercontroller.getorder)
router.get('/view',ordercontroller.getorderitem)
router.get('/cancel',ordercontroller.cancelled)
router.get('/cancelitem',ordercontroller.cancelleditem)
router.get('/complete',ordercontroller.complete)
router.get('/shipping',ordercontroller.shipping)
router.get('/accept',ordercontroller.accpetreturn)
router.get('/decline',ordercontroller.decline)




/* coupen */
router.get('/getcoupen',coupeanController.coupenpage)
router.get('/addcoupen',coupeanController.getaddpage)
router.post('/postcoupen',coupeanController.postcoupen)
router.get('/active',coupeanController.activate)
router.get('/deactive',coupeanController.deactivate)
router.get('/editcoupen',coupeanController.geteditcoupen)
router.post('/updatecoupen',coupeanController.updatecoupean)
router.get('/deletecoupen',coupeanController.deletecoupen)




module.exports = router;
