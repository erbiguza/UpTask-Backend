import { pool } from "../index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { capitalizeFirstLetter } from "../config/globalFunctions.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const signup = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const fname = capitalizeFirstLetter(first_name);
    const lname = capitalizeFirstLetter(last_name);
    try {
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Min password length is 8",
            });
        }

        const checkemail = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email],
        );
        if (checkemail.rows.length !== 0) {
            return res.status(400).json({
                message: "Email already registered!",
            });
        }

        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);

        const result = await pool.query(
            "INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
            [fname, lname, email, hashedPass],
        );

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);

        const id = user.rows[0].id;

        const token = createToken(id);
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: process.env.JWT_COOKIE_MAX_AGE,
        });

        res.status(200).json({
            message: "User successfully registered!",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields required",
            });
        }
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);

        if (user.rows.length === 0) {
            return res.status(404).json({
                message: "Email is not registered",
            });
        }

        const hashedPass = user.rows[0].password;

        const match = await bcrypt.compare(password, hashedPass);

        if (!match) {
            return res.status(401).json({
                message: "Wrong password!",
            });
        } else {
            const id = user.rows[0].id;
            const token = createToken(id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: process.env.JWT_COOKIE_MAX_AGE,
            });

            res.status(200).json({
                message: "User logged in",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const logout = async (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
    res.status(200).json({
        message: "Logged Out!",
    });
};

const getUser = async (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.status(200).json({});
            } else {
                const user = await pool.query(
                    "SELECT * FROM users WHERE id = $1",
                    [decodedToken.id],
                );

                const { first_name, last_name, email } = user.rows[0];

                res.status(200).json({
                    first_name,
                    last_name,
                    email,
                });
            }
        });
    } else {
        res.status(200).json({});
    }
};

export { signup, login, logout, getUser };
