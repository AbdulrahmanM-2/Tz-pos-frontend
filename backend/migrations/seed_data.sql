-- TZ POS System - Seed Data
-- Sample data for development and testing
-- Passwords are bcrypt hashes of: admin123, manager123, cashier123

INSERT INTO users (name, email, password_hash, role) VALUES
  ('Admin User',    'admin@postz.co.tz',   '$2b$10$X9eK1z2mQv8pLHNaT3OuYOWqKjN5GmLUsTvxRcDpIhFyAeWb6r0YG', 'admin'),
  ('Grace Mwangi',  'grace@postz.co.tz',   '$2b$10$X9eK1z2mQv8pLHNaT3OuYOMnJkL4FnKUsTvxRcDpIhFyAeWb6r0YG', 'manager'),
  ('John Kimani',   'john@postz.co.tz',    '$2b$10$X9eK1z2mQv8pLHNaT3OuYOQpRsT6HoMUsTvxRcDpIhFyAeWb6r0YG', 'cashier'),
  ('Amina Hassan',  'amina@postz.co.tz',   '$2b$10$X9eK1z2mQv8pLHNaT3OuYOQpRsT6HoMUsTvxRcDpIhFyAeWb6r0YG', 'cashier')
ON CONFLICT (email) DO NOTHING;

INSERT INTO products (name, sku, price, stock, category) VALUES
  ('Unga Sembe 2kg',      'PRD-001', 3500.00,  200, 'Groceries'),
  ('Mchele Zambia 5kg',   'PRD-002', 12000.00, 150, 'Groceries'),
  ('Mafuta ya Kula 1L',   'PRD-003', 5500.00,  100, 'Groceries'),
  ('Sukari 1kg',          'PRD-004', 2800.00,  300, 'Groceries'),
  ('Sabuni ya Nguo 400g', 'PRD-005', 1500.00,  250, 'Cleaning'),
  ('Sabuni ya Mwili',     'PRD-006', 2000.00,  180, 'Toiletries'),
  ('Dawa ya Meno',        'PRD-007', 1800.00,  120, 'Toiletries'),
  ('Mkate wa Sliced',     'PRD-008', 2500.00,   80, 'Bakery'),
  ('Maziwa 500ml',        'PRD-009', 1200.00,  200, 'Dairy'),
  ('Maji Baridi 1.5L',    'PRD-010', 1000.00,  500, 'Beverages'),
  ('Soda Coca-Cola 500ml','PRD-011', 1500.00,  300, 'Beverages'),
  ('Chips 100g',          'PRD-012', 800.00,   150, 'Snacks')
ON CONFLICT (sku) DO NOTHING;

INSERT INTO customers (name, phone, email) VALUES
  ('Juma Mwalimu',    '+255712345678', 'juma@gmail.com'),
  ('Fatuma Said',     '+255723456789', NULL),
  ('Peter Ochieng',   '+255734567890', 'peter@yahoo.com'),
  ('Zawadi Nguyen',   '+255745678901', NULL),
  ('Hassan Ibrahim',  '+255756789012', 'hassan@gmail.com')
ON CONFLICT (phone) DO NOTHING;
