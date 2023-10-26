import { Router } from "express";

const routerViews = Router();

routerViews.get('/', (req, res)=>{
    res.render('index',{})
});

export default routerViews;