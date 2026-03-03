import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../models/db.js';

const SALT_ROUNDS = 10;

// POST /api/users/register
export const registerUser = async (req, res) => {
  const { name, email, password, role = 'cashier' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }

  const allowedRoles = ['admin', 'manager', 'cashier'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ error: `role must be one of: ${allowedRoles.join(', ')}` });
  }

  try {
    const exists = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, is_active, created_at`,
      [name, email, password_hash, role]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('registerUser error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/users/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND is_active = TRUE',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('loginUser error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/users  (admin/manager only)
export const listUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, role, is_active, created_at
       FROM users
       ORDER BY created_at DESC`
    );
    res.json({ users: result.rows });
  } catch (err) {
    console.error('listUsers error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/users/:id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, name, email, role, is_active, created_at
       FROM users WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('getUserById error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PATCH /api/users/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, role, is_active } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users
       SET name      = COALESCE($1, name),
           role      = COALESCE($2, role),
           is_active = COALESCE($3, is_active),
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, name, email, role, is_active, updated_at`,
      [name, role, is_active, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('updateUser error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
