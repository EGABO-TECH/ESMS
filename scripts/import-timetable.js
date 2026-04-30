require('dotenv').config();
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const { createClient } = require('@supabase/supabase-js');

// Note: To run this script, you will need to install 'xlsx', '@supabase/supabase-js', and 'dotenv'
// npm install xlsx @supabase/supabase-js dotenv

const FILE_PATH = path.join(__dirname, '../Teaching Timetable Jan-May 2026-Students Copy(16022026)-3-1.xlsx');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function seedDatabase(courses, timetableSessions) {
  console.log('\nSeeding Supabase...');

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Error: Supabase credentials missing. Please check your .env file.');
    return;
  }

  // 1. Seed Courses
  console.log('Inserting courses...');
  const { error: coursesErr } = await supabase
    .from('courses')
    .upsert(Array.from(courses.values()), { onConflict: 'code' });
    
  if (coursesErr) {
    console.error('Error seeding courses:', coursesErr.message);
  } else {
    console.log('✅ Courses seeded successfully!');
  }

  // 2. Seed Timetable Sessions
  console.log('Inserting timetable sessions...');
  const { error: sessionsErr } = await supabase
    .from('timetable_sessions')
    .insert(timetableSessions);
    
  if (sessionsErr) {
    console.error('Error seeding timetable:', sessionsErr.message);
  } else {
    console.log('✅ Timetable sessions seeded successfully!');
  }
}

function parseTimetable() {
  console.log('Loading Excel file...');
  let workbook;
  try {
    workbook = xlsx.readFile(FILE_PATH);
  } catch (error) {
    console.error('Error reading Excel file. Ensure the file name is correct and exists in the root directory.');
    return;
  }
  
  const sheetName = 'Combined-All';
  const sheet = workbook.Sheets[sheetName];
  
  if (!sheet) {
    console.error(`Sheet "${sheetName}" not found!`);
    return;
  }

  // Parse the sheet starting from the header row (which is row 3, index 2)
  const data = xlsx.utils.sheet_to_json(sheet, { range: 2 });
  
  const programs = new Set();
  const courses = new Map();
  const timetableSessions = [];

  data.forEach((row, index) => {
    // Skip empty or invalid rows
    if (!row.Day || !row.Time || !row.Prog || !row.Code || !row.Module) {
      return; 
    }

    // 1. Extract Base Programs
    const progsStr = String(row.Prog);
    const splitProgs = progsStr.split(',');
    splitProgs.forEach(p => {
      const baseProg = p.replace(/[-\d\s]+$/, '').trim();
      if (baseProg) {
        programs.add(baseProg);
      }
    });

    // 2. Extract Courses/Modules
    const courseCode = String(row.Code).trim();
    const courseName = String(row.Module).trim();
    const faculty = row.Faculty ? String(row.Faculty).trim() : 'General';
    
    if (!courses.has(courseCode)) {
      courses.set(courseCode, {
        code: courseCode,
        name: courseName,
        faculty: faculty
      });
    }

    // 3. Extract Timetable Sessions
    timetableSessions.push({
      day: String(row.Day).trim(),
      time: String(row.Time).trim(),
      course_code: courseCode,
      programs: progsStr.trim(),
      faculty: faculty,
      room: row.Room ? String(row.Room).trim() : 'TBA'
    });
  });

  console.log(`\n✅ Successfully parsed timetable!`);
  console.log(`- Found ${programs.size} unique base programs.`);
  console.log(`- Found ${courses.size} unique courses/modules.`);
  console.log(`- Found ${timetableSessions.length} total timetable sessions.`);

  // Write outputs to JSON files
  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  fs.writeFileSync(path.join(outputDir, 'programs.json'), JSON.stringify(Array.from(programs), null, 2));
  fs.writeFileSync(path.join(outputDir, 'courses.json'), JSON.stringify(Array.from(courses.values()), null, 2));
  fs.writeFileSync(path.join(outputDir, 'timetable.json'), JSON.stringify(timetableSessions, null, 2));

  console.log(`\n📁 Data exported to /scripts/output/`);

  // Run database seeding
  seedDatabase(courses, timetableSessions);
}

parseTimetable();
