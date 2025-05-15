const{render}=require('ejs')
class ChartController{
    async chart(req,res) {
        try {
            res.render('chart',{
                title:'Chart',
                title: req.cookies.adminName,
        role:req.cookies.adminRole,
        image:req.cookies.adminImg
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=new ChartController()