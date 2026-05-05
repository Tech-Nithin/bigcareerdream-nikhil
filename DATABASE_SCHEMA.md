# Database Schema Reference (Auto-Generated)

This document is a live reference of the Neon database structure.

### public.applied_jobs
```sql
CREATE TABLE public.applied_jobs (
  id bigint NOT NULL,
  client_id text NOT NULL,
  applied_at timestamp with time zone DEFAULT now(),
  job_id text,
  job_url text,
  title text,
  company text,
  company_image_url text,
  location_city text,
  location_state text,
  location_country text,
  location_display text,
  is_remote text,
  work_location text,
  job_type_label text,
  w2_c2c_type text,
  employment_type text,
  badge_job_type text,
  date_posted text,
  salary text,
  salary_min text,
  salary_max text,
  salary_interval text,
  experience text,
  skills text,
  job_url_external text,
  description text,
  tech_stack text,
  scraped_at text,
  CONSTRAINT applied_jobs_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.clients
```sql
CREATE TABLE public.clients (
  client_uuid uuid NOT NULL DEFAULT gen_random_uuid(),
  client_id text,
  client_name text,
  client_email text,
  client_phone text,
  client_gender text,
  client_country text,
  client_job_domain text,
  client_experience text,
  client_skills text,
  client_resume text,
  client_cover_letter text,
  client_portfolio text,
  client_github text,
  client_linkedin text,
  created_at timestamp with time zone DEFAULT now(),
  client_chosen_alternative_jobroles ARRAY DEFAULT '{}'::text[],
  client_expereince_rounded numeric,
  password_hash text,
  is_active boolean DEFAULT false,
  is_paid boolean DEFAULT false,
  updated_at timestamp with time zone,
  domain_changed_at timestamp with time zone,
  CONSTRAINT clients_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.dice_jobs
```sql
CREATE TABLE public.dice_jobs (
  id bigint NOT NULL DEFAULT nextval('dice_jobs_id_seq'::regclass),
  job_id text NOT NULL,
  title text,
  company text,
  company_image_url text,
  location_city text,
  location_state text,
  location_country text,
  is_remote boolean DEFAULT false,
  job_type text,
  employment_type text,
  w2_c2c_type text,
  date_posted text,
  scraped_at timestamp with time zone DEFAULT now(),
  salary text,
  salary_min numeric,
  salary_max numeric,
  salary_interval text,
  experience text,
  job_url_dice text,
  job_url_external text,
  skills text,
  description text,
  work_location text,
  CONSTRAINT dice_jobs_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.feedback
```sql
CREATE TABLE public.feedback (
  feedback_uuid uuid NOT NULL DEFAULT gen_random_uuid(),
  feedback_id text NOT NULL DEFAULT generate_feedback_id(),
  feedback_number bigint DEFAULT nextval('feedback_id_seq'::regclass),
  client_id text NOT NULL,
  email text NOT NULL,
  category text NOT NULL,
  custom_category text,
  rating integer,
  feedback_description text NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT feedback_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.greenhouse_lever_jobs
```sql
CREATE TABLE public.greenhouse_lever_jobs (
  id bigint NOT NULL DEFAULT nextval('greenhouse_lever_jobs_id_seq1'::regclass),
  greenhouse_internal_job_id text,
  job_url text,
  job_title text,
  company_name text,
  company_logo_url text,
  location_city text,
  location_country text,
  is_remote boolean DEFAULT false,
  workplace_type text,
  posted_at timestamp without time zone,
  salary_text text,
  salary_min numeric,
  salary_max numeric,
  salary_currency text,
  salary_interval text,
  experience_text text,
  experience_min numeric,
  experience_max numeric,
  skills ARRAY,
  description_plain text,
  platform text NOT NULL,
  platform_job_id text,
  requisition_id text,
  location_full text,
  location_state text,
  updated_at timestamp without time zone,
  scraped_at timestamp without time zone DEFAULT now(),
  description_html text,
  work_authorization text,
  work_auth_keywords ARRAY,
  greenhouse_language text,
  greenhouse_departments jsonb,
  greenhouse_offices jsonb,
  greenhouse_metadata jsonb,
  raw_data jsonb,
  processing_version text,
  created_at timestamp without time zone DEFAULT now(),
  db_updated_at timestamp without time zone DEFAULT now(),
  location_display text,
  tech_stack text,
  CONSTRAINT greenhouse_lever_jobs_pkey_new PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.greenhouse_lever_jobs_old
```sql
CREATE TABLE public.greenhouse_lever_jobs_old (
  id bigint NOT NULL DEFAULT nextval('greenhouse_lever_jobs_id_seq'::regclass),
  platform text NOT NULL,
  platform_job_id text,
  company_name text,
  job_title text,
  workplace_type text,
  requisition_id text,
  location_full text,
  location_city text,
  location_state text,
  location_country text,
  is_remote boolean DEFAULT false,
  posted_at timestamp without time zone,
  updated_at timestamp without time zone,
  scraped_at timestamp without time zone DEFAULT now(),
  job_url text,
  description_html text,
  description_plain text,
  salary_text text,
  salary_min numeric,
  salary_max numeric,
  salary_currency text,
  salary_interval text,
  experience_text text,
  experience_min numeric,
  experience_max numeric,
  skills ARRAY,
  work_authorization text,
  work_auth_keywords ARRAY,
  greenhouse_internal_job_id text,
  greenhouse_language text,
  greenhouse_departments jsonb,
  greenhouse_offices jsonb,
  greenhouse_metadata jsonb,
  raw_data jsonb,
  processing_version text,
  created_at timestamp without time zone DEFAULT now(),
  db_updated_at timestamp without time zone DEFAULT now(),
  company_logo_url text,
  CONSTRAINT greenhouse_lever_jobs_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.jobs
```sql
CREATE TABLE public.jobs (
  id bigint NOT NULL DEFAULT nextval('jobs_id_seq'::regclass),
  company text,
  platform text,
  job_title text,
  location text,
  job_link text,
  external_link text,
  description text,
  salary text,
  experience text,
  h1b text,
  scraped_at timestamp without time zone DEFAULT now(),
  CONSTRAINT jobs_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.leads
```sql
CREATE TABLE public.leads (
  id integer NOT NULL DEFAULT nextval('leads_id_seq'::regclass),
  first_name text NOT NULL,
  middle_name text,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  plan_name text NOT NULL,
  price real NOT NULL,
  verified_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  country_code text,
  CONSTRAINT leads_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.linkedin_jobs
```sql
CREATE TABLE public.linkedin_jobs (
  id bigint NOT NULL DEFAULT nextval('linkedin_jobs_id_seq'::regclass),
  job_id text NOT NULL,
  title text,
  company_name text,
  company_url text,
  company_logo text,
  location_city text,
  location_state text,
  location_country text,
  location_display text,
  description text,
  date_posted date,
  scraped_at timestamp with time zone DEFAULT now(),
  job_url text,
  apply_url text,
  job_type text,
  job_level text,
  company_industry text,
  job_function text,
  is_remote boolean DEFAULT false,
  is_easy_apply boolean DEFAULT false,
  compensation_min numeric,
  compensation_max numeric,
  compensation_currency text,
  compensation_interval text,
  emails text,
  search_keyword text,
  created_at timestamp with time zone DEFAULT now(),
  experience text,
  salary_text text,
  CONSTRAINT linkedin_jobs_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.resumes_data
```sql
CREATE TABLE public.resumes_data (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  client_id text NOT NULL,
  resume_id text NOT NULL,
  resume_url text,
  experience double precision,
  skills ARRAY,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT resumes_data_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.saved_jobs
```sql
CREATE TABLE public.saved_jobs (
  id bigint NOT NULL,
  client_id text NOT NULL,
  saved_at timestamp with time zone DEFAULT now(),
  job_id text,
  job_url text,
  title text,
  company text,
  company_image_url text,
  location_city text,
  location_state text,
  location_country text,
  location_display text,
  is_remote text,
  work_location text,
  job_type_label text,
  w2_c2c_type text,
  employment_type text,
  badge_job_type text,
  date_posted text,
  salary text,
  salary_min text,
  salary_max text,
  salary_interval text,
  experience text,
  skills text,
  job_url_external text,
  description text,
  tech_stack text,
  scraped_at text,
  CONSTRAINT saved_jobs_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.scraper_progress_repo1
```sql
CREATE TABLE public.scraper_progress_repo1 (
  id integer NOT NULL DEFAULT 1,
  last_index integer DEFAULT 0,
  CONSTRAINT scraper_progress_repo1_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.scraper_progress_repo2
```sql
CREATE TABLE public.scraper_progress_repo2 (
  id integer NOT NULL DEFAULT 1,
  last_index integer DEFAULT 0,
  CONSTRAINT scraper_progress_repo2_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.tickets
```sql
CREATE TABLE public.tickets (
  ticket_uuid uuid NOT NULL DEFAULT gen_random_uuid(),
  ticket_id text NOT NULL DEFAULT generate_ticket_id(),
  ticket_number bigint DEFAULT nextval('ticket_id_seq'::regclass),
  client_id text NOT NULL,
  email text NOT NULL,
  category text NOT NULL,
  issue_description text NOT NULL,
  picture_url text,
  created_at timestamp with time zone DEFAULT now(),
  assigned_to text,
  assigned_at timestamp with time zone,
  closed_at timestamp with time zone,
  service_response text,
  ticket_status text DEFAULT 'OPEN'::text,
  CONSTRAINT tickets_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.transactions
```sql
CREATE TABLE public.transactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id text NOT NULL,
  email text,
  phone_number text,
  first_name text,
  middle_name text,
  last_name text,
  plan_name text,
  amount numeric(10,2),
  currency text DEFAULT 'USD'::text,
  status text,
  terms_accepted boolean DEFAULT true,
  paypal_details jsonb,
  created_at timestamp with time zone DEFAULT now(),
  access_status text DEFAULT 'active'::text,
  start_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  end_date timestamp with time zone,
  subscription_cycle integer,
  c_id text DEFAULT ('C-'::text || lpad((nextval('transactions_cid_seq'::regclass))::text, 2, '0'::text)),
  CONSTRAINT transactions_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

### public.users
```sql
CREATE TABLE public.users (
  id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  email text NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT users_pkey PRIMARY KEY (...)
) TABLESPACE pg_default;
```

