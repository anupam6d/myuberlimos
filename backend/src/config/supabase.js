const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://yuzvjslwkvpqgxzosyhg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1enZqc2x3a3ZwcWd4em9zeWhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzQ3NzcsImV4cCI6MjA2MjExMDc3N30.egoaoR80RHRVz40dJOBpSZd0K7kD6oBlnHPvBOJnI8M';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
