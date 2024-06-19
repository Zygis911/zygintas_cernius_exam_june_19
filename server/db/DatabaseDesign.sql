-- Define roles for staff members and customers
CREATE TYPE ROLE AS ENUM ('stylist', 'receptionist', 'admin', 'customer');

-- Table to store information about users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ROLE NOT NULL DEFAULT 'customer',
    registered_on DATE NOT NULL
);

-- Table to store information about services
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration INTERVAL NOT NULL,
    created_on DATE NOT NULL
);

-- Define statuses for appointments
CREATE TYPE APPOINTMENT_STATUS AS ENUM ('scheduled', 'completed', 'cancelled');

-- Table to store information about appointments
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    status APPOINTMENT_STATUS NOT NULL DEFAULT 'scheduled',
    created_on DATE NOT NULL,
    -- CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    -- CONSTRAINT fk_service FOREIGN KEY(service_id) REFERENCES services(id)
);

-- Table to store service ratings by users
CREATE TABLE service_ratings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    rated_on DATE NOT NULL,
    CONSTRAINT fk_user_rating FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_service_rating FOREIGN KEY(service_id) REFERENCES services(id)
);

-- Now, we will alter the table to remove the constraints and make other changes

-- Step 1: Remove Foreign Key Constraints
ALTER TABLE appointments DROP CONSTRAINT fk_user;
ALTER TABLE appointments DROP CONSTRAINT fk_service;

-- Step 2: Drop Foreign Key Columns
ALTER TABLE appointments DROP COLUMN user_id;
ALTER TABLE appointments DROP COLUMN service_id;

-- Step 3: Add the simplified columns
ALTER TABLE appointments ADD COLUMN name VARCHAR(255) NOT NULL;
ALTER TABLE appointments ADD COLUMN description TEXT NOT NULL;

-- Step 4: Optionally, you can drop the created_on column if not needed
ALTER TABLE appointments DROP COLUMN created_on;

-- Final structure after modifications
-- New table structure is similar to code 1