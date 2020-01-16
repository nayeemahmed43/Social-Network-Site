

exports.createPostValidator = (req, res, next) =>{
    //const {check, validationerrors} = require("express-validator")
    //title
    req.check("title", "write a title").notEmpty();
    req.check("title","Title must be between 4 to 150 characters").isLength({
        min:4,
        max:150
    });
    //body
    req.check("body", "write a body").notEmpty();
    req.check("body","Body must be between 4 to 2000 characters").isLength({
        min:4,
        max:2000
    });

    //check for errors
    const errors = req.validationErrors();
    //if error exists, show the first one
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error:firstError});
    } 
    //proceed to next middleware
    next();

};

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check('newPassword', 'Password is required').notEmpty();
    req.check('newPassword')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 chars long')
        .matches(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
        .withMessage('must contain a number')
        .withMessage('Password must contain a number');

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};

exports.userSignupValidator = (req, res, next) => {
//Name check
    req.check("name", "Name is required").notEmpty();
//email check
    req.check("email","Email must be between 4 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min: 4,
        max: 2000
    })


    //check for password
    req.check("password", "Password is required").notEmpty();
    req.check('password')
    .isLength({min: 6})
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")

   
   
    //check for errors
    const errors = req.validationErrors();
    //if error exists, show the first one
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error:firstError});
    } 
    //proceed to next middleware
    next();
}