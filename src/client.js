import { createClient } from '@supabase/supabase-js'

const URL = 'https://pynfjjnhfktsjrvuhwbg.supabase.co'

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bmZqam5oZmt0c2pydnVod2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5NDIxMTYsImV4cCI6MjA3MDUxODExNn0.3GIwM_aUjzf2DuNU9_c2ilZaCtSZ2iKFsM-8kwNV0S0'

export const supabase = createClient(URL, API_KEY)