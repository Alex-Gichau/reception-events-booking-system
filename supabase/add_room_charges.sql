-- Migration to add charge ranges to rooms
ALTER TABLE rooms ADD COLUMN min_price NUMERIC DEFAULT 0;
ALTER TABLE rooms ADD COLUMN max_price NUMERIC DEFAULT 0;

-- Optional: Update existing rooms with a default range if needed
-- UPDATE rooms SET min_price = 1000, max_price = 5000 WHERE min_price = 0;
