-- ─────────────────────────────────────────────────────────────
-- SCHEMA: public
-- ─────────────────────────────────────────────────────────────

-- Table: public.applied_jobs
CREATE TABLE public."applied_jobs" (
    "id" BIGINT NOT NULL,
    "client_id" TEXT NOT NULL,
    "applied_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    "job_id" TEXT,
    "job_url" TEXT,
    "title" TEXT,
    "company" TEXT,
    "company_image_url" TEXT,
    "location_city" TEXT,
    "location_state" TEXT,
    "location_country" TEXT,
    "location_display" TEXT,
    "is_remote" TEXT,
    "work_location" TEXT,
    "job_type_label" TEXT,
    "w2_c2c_type" TEXT,
    "employment_type" TEXT,
    "badge_job_type" TEXT,
    "date_posted" TEXT,
    "salary" TEXT,
    "salary_min" TEXT,
    "salary_max" TEXT,
    "salary_interval" TEXT,
    "experience" TEXT,
    "skills" TEXT,
    "job_url_external" TEXT,
    "description" TEXT,
    "tech_stack" TEXT,
    "scraped_at" TEXT
);

-- Table: public.clients
CREATE TABLE public."clients" (
    "client_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "client_id" TEXT,
    "client_name" TEXT,
    "client_email" TEXT,
    "client_phone" TEXT,
    "client_gender" TEXT,
    "client_country" TEXT,
    "client_job_domain" TEXT,
    "client_experience" TEXT,
    "client_skills" TEXT,
    "client_resume" TEXT,
    "client_cover_letter" TEXT,
    "client_portfolio" TEXT,
    "client_github" TEXT,
    "client_linkedin" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    "client_chosen_alternative_jobroles" ARRAY DEFAULT '{}'::text[],
    "client_expereince_rounded" NUMERIC,
    "password_hash" TEXT,
    "is_active" BOOLEAN DEFAULT false,
    "is_paid" BOOLEAN DEFAULT false,
    "updated_at" TIMESTAMP WITH TIME ZONE,
    "domain_changed_at" TIMESTAMP WITH TIME ZONE
);

-- Table: public.dice_job_links
CREATE TABLE public."dice_job_links" (
    "job_id" CHARACTER VARYING(255) NOT NULL,
    "job_url" TEXT NOT NULL,
    "job_url_external" TEXT,
    "title" TEXT,
    "company" TEXT,
    "company_image_url" TEXT,
    "location_city" TEXT,
    "location_state" TEXT,
    "location_country" TEXT,
    "location_display" TEXT,
    "is_remote" TEXT,
    "work_location" TEXT,
    "job_type_label" TEXT,
    "w2_c2c_type" TEXT,
    "employment_type" TEXT,
    "badge_job_type" TEXT,
    "date_posted" TEXT,
    "salary" TEXT,
    "salary_min" NUMERIC,
    "salary_max" NUMERIC,
    "salary_interval" TEXT,
    "experience" TEXT,
    "skills" TEXT,
    "tech_stack" TEXT,
    "description" TEXT,
    "scraped_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: public.dice_jobs
CREATE TABLE public."dice_jobs" (
    "id" BIGINT NOT NULL DEFAULT nextval('dice_jobs_id_seq'::regclass),
    "job_id" TEXT NOT NULL,
    "title" TEXT,
    "company" TEXT,
    "company_image_url" TEXT,
    "location_city" TEXT,
    "location_state" TEXT,
    "location_country" TEXT,
    "is_remote" BOOLEAN DEFAULT false,
    "job_type" TEXT,
    "employment_type" TEXT,
    "w2_c2c_type" TEXT,
    "date_posted" TEXT,
    "scraped_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    "salary" TEXT,
    "salary_min" NUMERIC,
    "salary_max" NUMERIC,
    "salary_interval" TEXT,
    "experience" TEXT,
    "job_url_dice" TEXT,
    "job_url_external" TEXT,
    "skills" TEXT,
    "description" TEXT,
    "work_location" TEXT
);

-- Table: public.feedback
CREATE TABLE public."feedback" (
    "feedback_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "feedback_id" TEXT NOT NULL DEFAULT generate_feedback_id(),
    "feedback_number" BIGINT DEFAULT nextval('feedback_id_seq'::regclass),
    "client_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "custom_category" TEXT,
    "rating" INTEGER,
    "feedback_description" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: public.greenhouse_lever_jobs
CREATE TABLE public."greenhouse_lever_jobs" (
    "id" BIGINT NOT NULL DEFAULT nextval('greenhouse_lever_jobs_id_seq1'::regclass),
    "greenhouse_internal_job_id" TEXT,
    "job_url" TEXT,
    "job_title" TEXT,
    "company_name" TEXT,
    "company_logo_url" TEXT,
    "location_city" TEXT,
    "location_country" TEXT,
    "is_remote" BOOLEAN DEFAULT false,
    "workplace_type" TEXT,
    "posted_at" TIMESTAMP WITHOUT TIME ZONE,
    "salary_text" TEXT,
    "salary_min" NUMERIC,
    "salary_max" NUMERIC,
    "salary_currency" TEXT,
    "salary_interval" TEXT,
    "experience_text" TEXT,
    "experience_min" NUMERIC,
    "experience_max" NUMERIC,
    "skills" ARRAY,
    "description_plain" TEXT,
    "platform" TEXT NOT NULL,
    "platform_job_id" TEXT,
    "requisition_id" TEXT,
    "location_full" TEXT,
    "location_state" TEXT,
    "updated_at" TIMESTAMP WITHOUT TIME ZONE,
    "scraped_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    "description_html" TEXT,
    "work_authorization" TEXT,
    "work_auth_keywords" ARRAY,
    "greenhouse_language" TEXT,
    "greenhouse_departments" JSONB,
    "greenhouse_offices" JSONB,
    "greenhouse_metadata" JSONB,
    "raw_data" JSONB,
    "processing_version" TEXT,
    "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    "db_updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    "location_display" TEXT,
    "tech_stack" TEXT,
    "cleaned_job_title" TEXT,
    "main_domain" TEXT
);

-- Table: public.greenhouse_lever_jobs_old
CREATE TABLE public."greenhouse_lever_jobs_old" (
    "id" BIGINT NOT NULL DEFAULT nextval('greenhouse_lever_jobs_id_seq'::regclass),
    "platform" TEXT NOT NULL,
    "platform_job_id" TEXT,
    "company_name" TEXT,
    "job_title" TEXT,
    "workplace_type" TEXT,
    "requisition_id" TEXT,
    "location_full" TEXT,
    "location_city" TEXT,
    "location_state" TEXT,
    "location_country" TEXT,
    "is_remote" BOOLEAN DEFAULT false,
    "posted_at" TIMESTAMP WITHOUT TIME ZONE,
    "updated_at" TIMESTAMP WITHOUT TIME ZONE,
    "scraped_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    "job_url" TEXT,
    "description_html" TEXT,
    "description_plain" TEXT,
    "salary_text" TEXT,
    "salary_min" NUMERIC,
    "salary_max" NUMERIC,
    "salary_currency" TEXT,
    "salary_interval" TEXT,
    "experience_text" TEXT,
    "experience_min" NUMERIC,
    "experience_max" NUMERIC,
    "skills" ARRAY,
    "work_authorization" TEXT,
    "work_auth_keywords" ARRAY,
    "greenhouse_internal_job_id" TEXT,
    "greenhouse_language" TEXT,
    "greenhouse_departments" JSONB,
    "greenhouse_offices" JSONB,
    "greenhouse_metadata" JSONB,
    "raw_data" JSONB,
    "processing_version" TEXT,
    "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    "db_updated_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    "company_logo_url" TEXT
);

-- Table: public.jobs
CREATE TABLE public."jobs" (
    "id" BIGINT NOT NULL DEFAULT nextval('jobs_id_seq'::regclass),
    "company" TEXT,
    "platform" TEXT,
    "job_title" TEXT,
    "location" TEXT,
    "job_link" TEXT,
    "external_link" TEXT,
    "description" TEXT,
    "salary" TEXT,
    "experience" TEXT,
    "h1b" TEXT,
    "scraped_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

-- Table: public.leads
CREATE TABLE public."leads" (
    "id" INTEGER NOT NULL DEFAULT nextval('leads_id_seq'::regclass),
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "plan_name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "verified_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "country_code" TEXT,
    "otp_sent" BOOLEAN DEFAULT false,
    "otp_verified" BOOLEAN DEFAULT false,
    "paypal_clicked" BOOLEAN DEFAULT false,
    "payment_done" BOOLEAN DEFAULT false,
    "payment_done_at" TIMESTAMP WITH TIME ZONE,
    "country" TEXT,
    "form_submitted_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: public.linkedin_jobs
CREATE TABLE public."linkedin_jobs" (
    "id" BIGINT NOT NULL DEFAULT nextval('linkedin_jobs_id_seq'::regclass),
    "job_id" TEXT NOT NULL,
    "title" TEXT,
    "company_name" TEXT,
    "company_url" TEXT,
    "company_logo" TEXT,
    "location_city" TEXT,
    "location_state" TEXT,
    "location_country" TEXT,
    "location_display" TEXT,
    "description" TEXT,
    "date_posted" DATE,
    "scraped_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    "job_url" TEXT,
    "apply_url" TEXT,
    "job_type" TEXT,
    "job_level" TEXT,
    "company_industry" TEXT,
    "job_function" TEXT,
    "is_remote" BOOLEAN DEFAULT false,
    "is_easy_apply" BOOLEAN DEFAULT false,
    "compensation_min" NUMERIC,
    "compensation_max" NUMERIC,
    "compensation_currency" TEXT,
    "compensation_interval" TEXT,
    "emails" TEXT,
    "search_keyword" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    "experience" TEXT,
    "salary_text" TEXT
);

-- Table: public.resumes_data
CREATE TABLE public."resumes_data" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "client_id" TEXT NOT NULL,
    "resume_id" TEXT NOT NULL,
    "resume_url" TEXT,
    "experience" DOUBLE PRECISION,
    "skills" ARRAY,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table: public.saved_jobs
CREATE TABLE public."saved_jobs" (
    "id" BIGINT NOT NULL,
    "client_id" TEXT NOT NULL,
    "saved_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    "job_id" TEXT,
    "job_url" TEXT,
    "title" TEXT,
    "company" TEXT,
    "company_image_url" TEXT,
    "location_city" TEXT,
    "location_state" TEXT,
    "location_country" TEXT,
    "location_display" TEXT,
    "is_remote" TEXT,
    "work_location" TEXT,
    "job_type_label" TEXT,
    "w2_c2c_type" TEXT,
    "employment_type" TEXT,
    "badge_job_type" TEXT,
    "date_posted" TEXT,
    "salary" TEXT,
    "salary_min" TEXT,
    "salary_max" TEXT,
    "salary_interval" TEXT,
    "experience" TEXT,
    "skills" TEXT,
    "job_url_external" TEXT,
    "description" TEXT,
    "tech_stack" TEXT,
    "scraped_at" TEXT
);

-- Table: public.scraper_progress_repo1
CREATE TABLE public."scraper_progress_repo1" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "last_index" INTEGER DEFAULT 0
);

-- Table: public.scraper_progress_repo2
CREATE TABLE public."scraper_progress_repo2" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "last_index" INTEGER DEFAULT 0
);

-- Table: public.tickets
CREATE TABLE public."tickets" (
    "ticket_uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ticket_id" TEXT NOT NULL DEFAULT generate_ticket_id(),
    "ticket_number" BIGINT DEFAULT nextval('ticket_id_seq'::regclass),
    "client_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "issue_description" TEXT NOT NULL,
    "picture_url" TEXT,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    "assigned_to" TEXT,
    "assigned_at" TIMESTAMP WITH TIME ZONE,
    "closed_at" TIMESTAMP WITH TIME ZONE,
    "service_response" TEXT,
    "ticket_status" TEXT DEFAULT 'OPEN'::text
);

-- Table: public.transactions
CREATE TABLE public."transactions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" TEXT NOT NULL,
    "email" TEXT,
    "phone_number" TEXT,
    "first_name" TEXT,
    "middle_name" TEXT,
    "last_name" TEXT,
    "plan_name" TEXT,
    "amount" NUMERIC,
    "currency" TEXT DEFAULT 'USD'::text,
    "status" TEXT,
    "terms_accepted" BOOLEAN DEFAULT true,
    "paypal_details" JSONB,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    "access_status" TEXT DEFAULT 'active'::text,
    "start_date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP WITH TIME ZONE,
    "subscription_cycle" INTEGER,
    "c_id" TEXT DEFAULT ('C-'::text || lpad((nextval('transactions_cid_seq'::regclass))::text, 2, '0'::text))
);

-- Table: public.users
CREATE TABLE public."users" (
    "id" INTEGER NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: public.workday_icims
CREATE TABLE public."workday_icims" (
    "id" BIGINT NOT NULL,
    "domain" TEXT,
    "role_searched" TEXT,
    "source_ats" TEXT,
    "company" TEXT,
    "job_id" TEXT,
    "title" TEXT,
    "job_url" TEXT,
    "description" TEXT,
    "location" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "department" TEXT,
    "job_category" TEXT,
    "employment_type" TEXT,
    "time_type" TEXT,
    "posted_date" TEXT,
    "salary" TEXT,
    "experience_level" TEXT,
    "company_logo" TEXT,
    "remote_eligible" TEXT,
    "scraped_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────
-- SCHEMA: neon_auth
-- ─────────────────────────────────────────────────────────────

-- Table: neon_auth.account
CREATE TABLE neon_auth."account" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP WITH TIME ZONE,
    "refreshTokenExpiresAt" TIMESTAMP WITH TIME ZONE,
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Table: neon_auth.invitation
CREATE TABLE neon_auth."invitation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT NOT NULL,
    "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inviterId" UUID NOT NULL
);

-- Table: neon_auth.jwks
CREATE TABLE neon_auth."jwks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "expiresAt" TIMESTAMP WITH TIME ZONE
);

-- Table: neon_auth.member
CREATE TABLE neon_auth."member" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organizationId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Table: neon_auth.organization
CREATE TABLE neon_auth."organization" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "metadata" TEXT
);

-- Table: neon_auth.project_config
CREATE TABLE neon_auth."project_config" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "endpoint_id" TEXT NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trusted_origins" JSONB NOT NULL,
    "social_providers" JSONB NOT NULL,
    "email_provider" JSONB,
    "email_and_password" JSONB,
    "allow_localhost" BOOLEAN NOT NULL,
    "plugin_configs" JSONB,
    "webhook_config" JSONB
);

-- Table: neon_auth.session
CREATE TABLE neon_auth."session" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" UUID NOT NULL,
    "impersonatedBy" TEXT,
    "activeOrganizationId" TEXT
);

-- Table: neon_auth.user
CREATE TABLE neon_auth."user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT,
    "banned" BOOLEAN,
    "banReason" TEXT,
    "banExpires" TIMESTAMP WITH TIME ZONE
);

-- Table: neon_auth.verification
CREATE TABLE neon_auth."verification" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
