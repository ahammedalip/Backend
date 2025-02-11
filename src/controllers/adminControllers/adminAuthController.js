import Admin from "../../model/admin.js"
import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs"

export const signup = async (req, res) => {

    console.log('coming here', req.body)
    const { name, email, password } = req.body;
    try {
        const exists = await Admin.findOne({ email })
        if (exists) {
            return res.status(400).json({ message: "Admin already exists with this email" });
        }

        // hashing password
        const hashedPass = bcryptjs.hashSync(password, 2)
        // Create a new admin
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPass,
        });

        // Save to database
        await newAdmin.save();

        return res.status(201).json({ success: true, message: "Admin registered successfully" });

    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ success: true, message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    console.log('coming hree')
    const { email, password } = req.body

    try {
        const isAdmin = await Admin.findOne({ email })
        console.log(`is admin ${isAdmin}`)
        if (!isAdmin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

          // Compare hashed password
          const isPasswordValid = await bcryptjs.compare(password, isAdmin.password);
          if (!isPasswordValid) {
              return res.status(400).json({ message: "Invalid credentials" });
          }
  
        const token = jwt.sign({ id: isAdmin._id.toString(), role: 'Admin', username: isAdmin.email }, process.env.JWT_SECRET || '', { expiresIn: '24h' });
        res.status(200).json({ success: true, message: 'Admin logged in successfully', token: token });
    } catch (error) {
        console.log(`Error at admin login ${error}`)
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


