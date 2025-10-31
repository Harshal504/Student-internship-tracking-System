-- ============================================================
--  DATABASE: Internship Management System
--  DESCRIPTION: Complete schema, triggers, and DML sample data
-- ============================================================

-- Optional: Create and use a database
CREATE DATABASE IF NOT EXISTS internship_portal;
USE internship_portal;

-- ------------------------------------------------------------
-- DROP EXISTING TABLES (in dependency order)
-- ------------------------------------------------------------
DROP TABLE IF EXISTS STUDENT_SKILLS;
DROP TABLE IF EXISTS APPLICATION;
DROP TABLE IF EXISTS INTERNSHIP;
DROP TABLE IF EXISTS SKILLS;
DROP TABLE IF EXISTS STUDENT;
DROP TABLE IF EXISTS COMPANY;
DROP TABLE IF EXISTS SUPERVISOR;

-- ------------------------------------------------------------
-- TABLE: SUPERVISOR
-- ------------------------------------------------------------
CREATE TABLE SUPERVISOR (
    supervisor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- ------------------------------------------------------------
-- TABLE: STUDENT
-- ------------------------------------------------------------
CREATE TABLE STUDENT (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    supervisor_id INT,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    resume_url VARCHAR(255),
    education VARCHAR(255),
    FOREIGN KEY (supervisor_id) REFERENCES SUPERVISOR(supervisor_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- ------------------------------------------------------------
-- TABLE: SKILLS
-- ------------------------------------------------------------
CREATE TABLE SKILLS (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE
);

-- ------------------------------------------------------------
-- TABLE: STUDENT_SKILLS (Many-to-Many)
-- ------------------------------------------------------------
CREATE TABLE STUDENT_SKILLS (
    student_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (student_id, skill_id),
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES SKILLS(skill_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ------------------------------------------------------------
-- TABLE: COMPANY
-- ------------------------------------------------------------
CREATE TABLE COMPANY (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tech_domain VARCHAR(100)
);

-- ------------------------------------------------------------
-- TABLE: INTERNSHIP
-- ------------------------------------------------------------
CREATE TABLE INTERNSHIP (
    internship_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    post_date DATETIME DEFAULT NULL,
    status ENUM('Open', 'Closed') DEFAULT 'Open',
    FOREIGN KEY (company_id) REFERENCES COMPANY(company_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ------------------------------------------------------------
-- TABLE: APPLICATION
-- ------------------------------------------------------------
CREATE TABLE APPLICATION (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    internship_id INT NOT NULL,
    company_id INT NOT NULL,
    status ENUM('Applied', 'Reviewed', 'Approved', 'Rejected', 'started_internship', 'completed_internship') DEFAULT 'Applied',
    applied_at DATETIME DEFAULT NULL,
    status_updated_at DATETIME DEFAULT NULL,
    FOREIGN KEY (student_id) REFERENCES STUDENT(student_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (internship_id) REFERENCES INTERNSHIP(internship_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (company_id) REFERENCES COMPANY(company_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ------------------------------------------------------------
-- TRIGGERS
-- ------------------------------------------------------------

-- Trigger for INTERNSHIP.post_date
DELIMITER $$
CREATE TRIGGER trg_internship_postdate
BEFORE INSERT ON INTERNSHIP
FOR EACH ROW
BEGIN
    IF NEW.post_date IS NULL THEN
        SET NEW.post_date = NOW();
    END IF;
END$$
DELIMITER ;

-- Trigger for APPLICATION.applied_at
DELIMITER $$
CREATE TRIGGER trg_application_appliedat
BEFORE INSERT ON APPLICATION
FOR EACH ROW
BEGIN
    IF NEW.applied_at IS NULL THEN
        SET NEW.applied_at = NOW();
    END IF;
END$$
DELIMITER ;

-- Trigger for APPLICATION.status_updated_at (on update)
DELIMITER $$
CREATE TRIGGER trg_application_status_update
BEFORE UPDATE ON APPLICATION
FOR EACH ROW
BEGIN
    IF NEW.status <> OLD.status THEN
        SET NEW.status_updated_at = NOW();
    END IF;
END$$
DELIMITER ;

-- ------------------------------------------------------------
-- DML: INSERT SAMPLE DATA
-- ------------------------------------------------------------

-- SUPERVISORS
INSERT INTO SUPERVISOR (name, phone, email, password)
VALUES
('Dr. Rajesh Mehta', '9876543210', 'rajesh.mehta@univ.in', 'raj123'),
('Dr. Anjali Nair', '9898989898', 'anjali.nair@univ.in', 'anj456'),
('Dr. Prakash Iyer', '9123456789', 'prakash.iyer@univ.in', 'prak789');

-- STUDENTS (10 rows)
INSERT INTO STUDENT (supervisor_id, name, phone, email, password, resume_url, education)
VALUES
(1, 'Amit Sharma', '9876500001', 'amit.sharma@student.in', 'amitpwd', 'resume_amit.pdf', 'B.Tech Computer Science'),
(1, 'Priya Patel', '9876500002', 'priya.patel@student.in', 'priyapwd', 'resume_priya.pdf', 'B.Sc Information Technology'),
(2, 'Rohit Kumar', '9876500003', 'rohit.kumar@student.in', 'rohitpwd', 'resume_rohit.pdf', 'M.Sc Data Science'),
(2, 'Sneha Reddy', '9876500004', 'sneha.reddy@student.in', 'snehapwd', NULL, 'B.Tech Electronics'),
(3, 'Arjun Singh', '9876500005', 'arjun.singh@student.in', 'arjunpwd', 'resume_arjun.pdf', 'BCA'),
(3, 'Meera Das', '9876500006', 'meera.das@student.in', 'meerpwd', 'resume_meera.pdf', 'B.Sc Computer Applications'),
(1, 'Vikram Joshi', '9876500007', 'vikram.joshi@student.in', 'vikrampwd', 'resume_vikram.pdf', 'B.Tech AI & ML'),
(2, 'Divya Pillai', '9876500008', 'divya.pillai@student.in', 'divyapwd', NULL, 'MBA IT Management'),
(3, 'Sanjay Verma', '9876500009', 'sanjay.verma@student.in', 'sanjaypwd', 'resume_sanjay.pdf', 'MCA'),
(1, 'Kavita Menon', '9876500010', 'kavita.menon@student.in', 'kavitapwd', 'resume_kavita.pdf', 'B.Tech Information Systems');

-- SKILLS
INSERT INTO SKILLS (skill_name)
VALUES
('Python'),
('Java'),
('SQL'),
('C++'),
('Machine Learning'),
('Data Analysis'),
('HTML/CSS'),
('ReactJS'),
('Cloud Computing'),
('Cybersecurity');

-- STUDENT-SKILLS MAPPING
INSERT INTO STUDENT_SKILLS (student_id, skill_id)
VALUES
(1, 1), (1, 3), (1, 5),
(2, 1), (2, 2), (2, 3),
(3, 1), (3, 6), (3, 9),
(4, 2), (4, 4),
(5, 1), (5, 2), (5, 8),
(6, 3), (6, 7), (6, 8),
(7, 1), (7, 5), (7, 9),
(8, 6), (8, 9), (8, 10),
(9, 1), (9, 3), (9, 4),
(10, 2), (10, 3), (10, 10);

-- COMPANIES
INSERT INTO COMPANY (name, email, password, tech_domain)
VALUES
('Infosys', 'hr@infosys.com', 'infopass', 'IT Services'),
('TCS', 'jobs@tcs.com', 'tcspass', 'Consulting'),
('Wipro', 'careers@wipro.com', 'wipropass', 'Cloud Solutions'),
('HCL Tech', 'talent@hcl.com', 'hclpass', 'Software Development'),
('Zoho Corp', 'jobs@zoho.com', 'zoho123', 'SaaS Applications');

-- INTERNSHIPS
INSERT INTO INTERNSHIP (company_id, title, status)
VALUES
(1, 'Software Developer Intern', 'Open'),
(2, 'Data Analyst Intern', 'Open'),
(3, 'Cloud Engineer Intern', 'Open'),
(4, 'Java Developer Intern', 'Closed'),
(5, 'Web Development Intern', 'Open'),
(1, 'Machine Learning Intern', 'Open'),
(2, 'Cybersecurity Analyst Intern', 'Closed');

-- APPLICATIONS
INSERT INTO APPLICATION (student_id, internship_id, company_id, status)
VALUES
(1, 1, 1, 'Applied'),
(2, 2, 2, 'Reviewed'),
(3, 6, 1, 'Approved'),
(4, 3, 3, 'Rejected'),
(5, 4, 4, 'Applied'),
(6, 5, 5, 'Applied'),
(7, 1, 1, 'Reviewed'),
(8, 6, 1, 'Approved'),
(9, 2, 2, 'Started_internship'),
(10, 7, 2, 'Completed_internship');



-- ------------------------------------------------------------
-- VIEW: Student Application Summary
-- ------------------------------------------------------------
CREATE OR REPLACE VIEW vw_student_application_summary AS
SELECT 
    s.student_id,
    s.name AS student_name,
    s.email AS student_email,
    s.education,
    c.name AS company_name,
    c.tech_domain,
    i.title AS internship_title,
    a.status,
    a.applied_at,
    a.status_updated_at
FROM APPLICATION a
JOIN STUDENT s ON a.student_id = s.student_id
JOIN INTERNSHIP i ON a.internship_id = i.internship_id
JOIN COMPANY c ON a.company_id = c.company_id;



SELECT * FROM vw_student_application_summary;

-- ============================================================
-- END OF FILE
-- ============================================================
