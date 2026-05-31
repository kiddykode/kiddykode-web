import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Parse .env file
const envPath = path.resolve(process.cwd(), '.env');
const envConfig = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
const env: Record<string, string> = {};

envConfig.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env['SUPABASE_URL'] || process.env.SUPABASE_URL;
const supabaseServiceKey = env['SUPABASE_SERVICE_ROLE_KEY'] || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('Connecting to Supabase...');

  // 1. Get or create program
  let programId: string;
  const { data: programs, error: progError } = await supabase
    .from('certificate_programs')
    .select('id, name')
    .eq('slug', 'explorer-live-c03')
    .limit(1);

  if (progError) {
    console.error('Error fetching program:', progError);
    process.exit(1);
  }

  if (programs && programs.length > 0) {
    programId = programs[0].id;
    console.log(`Found existing program: ${programs[0].name} (${programId})`);
  } else {
    console.log('Program explorer-live-c03 not found, inserting it...');
    const { data: newProg, error: insertProgError } = await supabase
      .from('certificate_programs')
      .insert({
        name: 'Explorer Live — Cohort 03',
        slug: 'explorer-live-c03',
        level: 'Beginner',
        active: true
      })
      .select()
      .single();

    if (insertProgError) {
      console.error('Error inserting program:', insertProgError);
      process.exit(1);
    }
    programId = newProg.id;
    console.log(`Created program: ${newProg.name} (${programId})`);
  }

  // 2. Insert sample certificate
  const publicToken = 'sample-explorer-live';

  // Delete existing one if exists to avoid unique constraint violations
  await supabase
    .from('certificates')
    .delete()
    .eq('public_token', publicToken);

  console.log('Inserting sample certificate...');
  const { data: cert, error: certError } = await supabase
    .from('certificates')
    .insert({
      public_token: publicToken,
      recipient_name: 'Jane Doe',
      recipient_email: 'jane.doe@example.com',
      program_id: programId,
      course_title: 'Explorer Live: Frontend Web Development',
      cohort_name: 'Cohort 03',
      level: 'Beginner',
      issued_at: new Date().toISOString(),
      status: 'valid',
      metadata: {
        instructor_name: 'Dedoatus Bijengsi',
        director_name: 'Chiella Harriet',
        grade: 'A+',
        score: '95%'
      }
    })
    .select()
    .single();

  if (certError) {
    console.error('Error inserting certificate:', certError);
    process.exit(1);
  }

  console.log('\n==================================================');
  console.log('✅ Sample Certificate Successfully Created!');
  console.log('==================================================');
  console.log(`Recipient:       ${cert.recipient_name}`);
  console.log(`Course Title:    ${cert.course_title}`);
  console.log(`Certificate No:  ${cert.certificate_number}`);
  console.log(`Public Token:    ${cert.public_token}`);
  console.log('\nVerification Link:');
  console.log(`👉 http://localhost:3000/en/verify/${cert.public_token}`);
  console.log('==================================================\n');
}

main();
