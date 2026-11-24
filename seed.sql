-- Inserts the made-up starting records, but only while the table is empty,
-- so running this file twice does not create duplicates.
INSERT INTO records (title, category, description, status)
SELECT v.title, v.category, v.description, v.status
FROM (VALUES
  ('Broken classroom light', 'Electrical', 'The light in Room B12 does not switch on.', 'Pending'),
  ('Leaking tap in hostel block A', 'Plumbing', 'The tap in the second floor bathroom drips all day and wastes water.', 'In progress'),
  ('Broken lecture hall chairs', 'Furniture', 'Three chairs in Lecture Hall 2 have broken backs and are unsafe to use.', 'Pending'),
  ('Flickering corridor lights', 'Electrical', 'Lights in the Engineering block corridor flicker during the evening.', 'Completed'),
  ('Blocked toilet in library', 'Plumbing', 'The ground floor toilet in the library is blocked and overflowing.', 'In progress'),
  ('Cracked laboratory bench', 'Furniture', 'A bench in the Physics lab has a long crack along the top.', 'Pending'),
  ('Dead socket in computer lab', 'Electrical', 'Two power sockets in Computer Lab 1 give no power to the desks.', 'Pending'),
  ('Door handle missing', 'Furniture', 'The door handle of Room C4 fell off and the door cannot be locked.', 'Completed'),
  ('Burst pipe near cafeteria', 'Plumbing', 'Water is flowing from a pipe behind the cafeteria onto the walkway.', 'In progress')
) AS v(title, category, description, status)
WHERE NOT EXISTS (SELECT 1 FROM records);
