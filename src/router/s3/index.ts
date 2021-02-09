import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import express, {Router} from 'express'
import {AsyncHandler} from '@src/utils'
import {Container} from 'typedi'
import S3Service from "@src/service/s3Service";

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: '<s3-bucket-name>',
    acl: 'public-read',
    key: function(req, file, cb){
      cb(null, Date.now() + '.' + file.originalname.split('.').pop()); // 이름 설정
    }
  })
});


const router = Router()

router.post(
  '/upload',
  AsyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const s3Service = Container.get(S3Service);


    res.json({
      result: 'success',
      data: null
    })
  })
)


export default router