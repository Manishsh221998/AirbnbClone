const { render } = require('ejs');
const Admin = require('../../../model/admin');
const bcrypt = require('bcryptjs');
const { sendLoginEmail } = require('../../../helper/emailVerify');
const createToken = require('../../../helper/AdminToken/CreateToken');

class RegisterController {
    // ============ Register view ================
    async register(req, res) {
        try {
            res.render('register', {
                title: 'Register',
            });
        } catch (error) {
            console.log(error);
        }
    }

    // ============= Create Register ==============
    async registerCreate(req, res) {
        try {
            const { role, name, email, phone, password } = req.body;

            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                req.flash('error', 'Email already exists');
                return res.redirect('/register');
            }

            const admin = new Admin({
                role,
                name,
                email,
                phone,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            });

            if (req.file) {
                admin.image = req.file.path;
            }

            await admin.save();

            if (role === "admin") {
                req.flash('error', 'This is Admin credential. Registration not allowed');
                return res.redirect('/register');
            }

            await sendLoginEmail(email, password, name);

            req.flash('success', 'User registered successfully and email sent');
            return res.redirect('/login');

        } catch (err) {
            console.log(err);
            req.flash('error', 'Something went wrong during registration');
            res.redirect('/register');
        }
    }

    // =================== Login view ========================
    async login(req, res) {
        try {
            res.render('login', {
                title: 'Login',
            });
        } catch (error) {
            console.log(error);
        }
    }

    // ================= Login Create =====================
    async loginCreate(req, res) {
        try {
            const { email, password } = req.body;

            if (!(email && password)) {
                req.flash('error', 'All input is required');
                return res.redirect('/login');
            }

            const admin = await Admin.findOne({ email });

            if (admin && await bcrypt.compare(password, admin.password)) {
                const tokendata = await createToken({
                    id: admin._id,
                    name: admin?.name,
                    email: admin?.email,
                });

                if (tokendata) {
                    res.cookie('adminToken', tokendata);
                    res.cookie('adminName', admin.name);
                    res.cookie('adminRole', admin.role);
                    res.cookie('adminImg', admin.image || '');
                    res.cookie('email', admin.email);

                    req.flash('success', 'Login successful');
                    return res.redirect('/');
                }
            }

            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');

        } catch (err) {
            console.log(err);
            req.flash('error', 'Error during login');
            return res.redirect('/login');
        }
    }

    // ============= Logout ===============
    async logout(req, res) {
        try {
            res.clearCookie('adminToken');
            res.clearCookie('adminName');
            res.clearCookie('adminRole');
            res.clearCookie('adminImg');
            res.clearCookie('email');
            req.flash('success', 'Logged out successfully');
            return res.redirect('/login');
        } catch (err) {
            console.log(err);
        }
    }

    // =========== CheckAuth ================
    async CheckAuth(req, res, next) {
        try {
            if (req.user) {
                next();
            } else {
                req.flash('error', 'Please log in first');
                res.redirect('/login');
            }
        } catch (err) {
            console.log(err);
        }
    }

    // =========== Top bar ==================
    async topbar(req, res) {
        try {
            res.render('topbar', {
                title: req.cookies.adminName,
                image: req.cookies.adminImg,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new RegisterController();
