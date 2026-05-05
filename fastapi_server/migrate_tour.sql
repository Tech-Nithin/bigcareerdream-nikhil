DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='clients' AND column_name='has_seen_tour') THEN
        ALTER TABLE public.clients ADD COLUMN has_seen_tour BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

UPDATE public.clients SET has_seen_tour = FALSE WHERE has_seen_tour IS NULL;
