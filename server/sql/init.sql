-- Run this in phpMyAdmin (XAMPP) or MySQL client

CREATE DATABASE IF NOT EXISTS stride
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE stride;

-- USERS
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('customer','admin') NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  meta VARCHAR(255) NOT NULL,
  price_cents INT NOT NULL,
  image_url TEXT NOT NULL,
  image_alt VARCHAR(255) NOT NULL,
  category_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE SET NULL
);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  status ENUM('pending','paid','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  total_cents INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price_cents INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_order_items_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE RESTRICT
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reviews_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_reviews_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- REFRESH TOKENS (optional, for logout/revoke)
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  revoked_at DATETIME NULL,
  CONSTRAINT fk_refresh_tokens_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- OAuth accounts (Google, etc.) → maps external subject to users.id
CREATE TABLE IF NOT EXISTS oauth_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  provider VARCHAR(32) NOT NULL,
  provider_sub VARCHAR(191) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY ux_oauth_provider_sub (provider, provider_sub),
  CONSTRAINT fk_oauth_accounts_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

-- Tài khoản mẫu (mật khẩu tất cả: Test123 — bcrypt 10 rounds)
INSERT IGNORE INTO users (id, email, password_hash, full_name, role) VALUES
  (
    1,
    'admin@stride.test',
    '$2b$10$mNm9VBq3K4vTSyf82tpeluL.H1bfEEfjPw46.hLr13ZvEnwarnPH.',
    'Admin User',
    'admin'
  ),
  (
    2,
    'user1@stride.test',
    '$2b$10$mNm9VBq3K4vTSyf82tpeluL.H1bfEEfjPw46.hLr13ZvEnwarnPH.',
    'User One',
    'customer'
  ),
  (
    3,
    'user2@stride.test',
    '$2b$10$mNm9VBq3K4vTSyf82tpeluL.H1bfEEfjPw46.hLr13ZvEnwarnPH.',
    'User Two',
    'customer'
  );

-- SEED (idempotent)
INSERT IGNORE INTO categories (id, slug, name) VALUES
  (1, 'footwear', 'FOOTWEAR'),
  (2, 'apparel', 'APPAREL'),
  (3, 'accessories', 'ACCESSORIES');

INSERT IGNORE INTO products (slug, name, meta, price_cents, image_url, image_alt, category_id)
VALUES
  ('stride-carbon-x1', 'STRIDE CARBON X1', 'Running / Performance', 24000,
   'https://lh3.googleusercontent.com/aida-public/AB6AXuC_tf4fKRdXRbL_OXT70zfTdHhwVhJ2bLvJX-SxzU9Y_CF-SND8MTUzIow8aB4stplErGTrdHg5i5Z-0Pl5YZPisD4EJfOrhFQKgGX7BL7EyZpDRBK8S5vRj3e5jwLNU0gcezohcxLCM40SWOH_yfLw1_xp7WByIBZPsXQFsBjojkiNXKSMt7TceZBByVevZg5cIdF0lrMKrqdmP33zs1uobBBoDzsgcrl-WRt7RMn1tGzk9bd0oUv3TO5VnDPze4J3jHwKp-8KIYwa',
   'STRIDE CARBON X1 hero image', 1),
  ('apex-x-runner-pro', 'APEX-X RUNNER PRO', 'Running / Performance', 18000,
   'https://lh3.googleusercontent.com/aida-public/AB6AXuBqszd5cnYhreLgs9fD6Yn1cSNDEMnAg1rA46vU0ZO7SfRQSY07m336gYYkyKhao6_jrgdwKrxfNiT944wSzmeq5XiUZStUKlYH8bNCzSQrl-IYQsRKklelLruamX4F4Xp2DAFrBX4-nXjBvIQS2FtRsFyOVDkMr_tM7Ku60eT08y-Jn8w6NrLSfiaC-9CNUEUyxA5G8KXxDxzw5fdZ-HOi7v5MHYcSt_n4eA9dEeTrFboxP1zprZx-ZSRZHnkC4OEKovPOnvQbfja4',
   'APEX-X RUNNER PRO', 1),
  ('stride-tech-tee', 'STRIDE TECH TEE', 'Training / Apparel', 4500,
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDlU-bQTjCC8468VYZ0boFSH_gt3QgVFog8jopbQrtbD9lR4zt6WeIVsxFJ2q4BKZEzfIdcq_SmaQH1knwKxLweHEL5G_OFWOi7ugeXcd4Qtewv8fHMAgW0nZAncUMALpax0FNe_FlptpfFcdnfnvlFpZ-r0M8mBi6qJKx0yBJm8mes1Q2p3nEXX2RGFSDWI7bLlr7N1qblc4R6_Nm0vdNkuSl1ek08xdt-__cQVjhVTzs4Ta2myObzgzLNZSMztDw5R747zqjM1d7T',
   'STRIDE TECH TEE', 2),
  ('pace-setter-shorts', 'PACE-SETTER SHORTS', 'Training / Apparel', 6000,
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCDpZPiD9JPIqhascvrXYM_Wt06VKNrnAWUpAqguGvpYcLexJuVKQ2PzoRDU6eaewZ1FW1tRelidiSeFeHopieGchmudskM8p7gnSQIBF2eMK8NdNLQ_rVfdZSwXXjeUnrhawPRku9QUJMLtobvX2oTI1mgMD5C-QbDZ5xEqd908Q1zJ_A8FvWjJPSqcTv1QZH3M4BkHlLWydP9MLZyiMyA6XC-vf1spXRYWyxBKHdv2rNDRmqktkJEPNgjEO12Q5Nl5p8Y3bgWfG47',
   'PACE-SETTER SHORTS', 2);

