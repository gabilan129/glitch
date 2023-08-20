import express from "express"
const router = express.Router()

router.get("/",(req,res)=>{
    res.render("index",{})
})
router.get("/msg",(req,res)=>{
    res.render("mensaje",{})
})


export default router