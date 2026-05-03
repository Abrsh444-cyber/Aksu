-- Allow public read access to library buckets so the Library page can list and download files
CREATE POLICY "Public can list memhrus files"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'memhrus');

CREATE POLICY "Public can list english files"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'english');