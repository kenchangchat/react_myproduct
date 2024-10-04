let Path = require('path');
let Multer = require('multer');
let randomString = require('randomstring');

exports.setFileUploadDirectory = function(path){
    if(typeof path === 'string'){
        Multer.fileUploadDir = path;
    }
};

exports.uploadFile = function(destPath,filename){
    let storageOpts = {};
    if(typeof destPath === 'string'){
        storageOpts.destination = function (req, file, cb) {
            cb(null, Path.resolve(((Multer.fileUploadDir)? Multer.fileUploadDir : '')+destPath))
        };
    }

    storageOpts.filename= function (req, file, cb) {

        let fileExtension = '';
        if(file && typeof file.originalname === 'string' && file.originalname.lastIndexOf('.') != -1){
            fileExtension = file.originalname.substr(file.originalname.lastIndexOf('.'));
        }
        // cb(null, file.fieldname + '_' + randomString.generate({ length: 8, charset: 'alphanumeric' })+(fileExtension?fileExtension:''))
        cb(null, filename +(fileExtension?fileExtension:''))
    };

    return Multer({
        storage : Multer.diskStorage(storageOpts),
        limits: {
            fileSize: 1024 * 1024 * 1024,
            fieldSize: 1024 * 1024 * 1024,
        },
    });
};
exports.uploadFile2 = function(destPath){
    let storageOpts = {};
    if(typeof destPath === 'string'){
        storageOpts.destination = function (req, file, cb) {
            cb(null, Path.resolve(((Multer.fileUploadDir)? Multer.fileUploadDir : '')+destPath))
        };
    }

    storageOpts.filename= function (req, file, cb) {

        let fileExtension = '';
        if(file && typeof file.originalname === 'string' && file.originalname.lastIndexOf('.') != -1){
            fileExtension = file.originalname.substr(file.originalname.lastIndexOf('.'));
        }
        cb(null, file.fieldname + '_' + randomString.generate({ length: 8, charset: 'alphanumeric' })+(fileExtension?fileExtension:''))
    };

    return Multer({
        storage : Multer.diskStorage(storageOpts),
        limits: {
            fileSize: 1024 * 1024 * 1024,
            fieldSize: 1024 * 1024 * 1024,
        },
    });
};