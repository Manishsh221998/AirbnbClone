const multer=require('multer')

const FILE_TYPE_MAP={
    "image/png":"png",
    "image/jpg":"jpg",
    "image/jpeg":"jpeg",
    "image/avif":"avif",
}

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        // console.log(file)
        const isValid=FILE_TYPE_MAP[file.mimetype]
        let uploadError=new Error("Invalid image type")
        if(isValid){
            uploadError=null
        }
        cb(uploadError,"uploads/propertyImages")
    },
    filename:function (req,file,cb){
        const fileName=file.originalname.split(" ").join("_")
        const extension=FILE_TYPE_MAP[file.mimetype]
        cb(null,`${fileName}-${Date.now()}.${extension}`)
    },
})

const mutileImages=multer({storage:storage}).array("images",6)
module.exports=mutileImages