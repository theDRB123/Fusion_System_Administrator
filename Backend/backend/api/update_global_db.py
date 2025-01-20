from django.http import JsonResponse
from django.db import connection
from rest_framework.decorators import api_view

@api_view(['GET'])
def update_globals_db(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                ALTER TABLE globals_designation
                ADD COLUMN IF NOT EXISTS basic BOOLEAN NOT NULL DEFAULT FALSE;
            """)

            cursor.execute("""
                ALTER TABLE globals_designation
                ADD COLUMN IF NOT EXISTS category VARCHAR(20) NULL;
            """)

            cursor.execute("""
                DROP SEQUENCE IF EXISTS globals_moduleaccess_id_seq CASCADE;
            """)
                
            cursor.execute("""
                CREATE SEQUENCE globals_moduleaccess_id_seq;
            """)
                
            cursor.execute("""
                ALTER TABLE globals_moduleaccess
                ALTER COLUMN id SET DEFAULT NEXTVAL('globals_moduleaccess_id_seq');
            """)
                
            cursor.execute("""
                SELECT SETVAL('globals_moduleaccess_id_seq', COALESCE(MAX(id), 1))
                FROM globals_moduleaccess;
            """)

            cursor.execute("""
                DROP SEQUENCE IF EXISTS globals_holdsdesignation_id_seq CASCADE;
            """)
                
            cursor.execute("""
                CREATE SEQUENCE globals_holdsdesignation_id_seq;
            """)
                
            cursor.execute("""
                ALTER TABLE globals_holdsdesignation
                ALTER COLUMN id SET DEFAULT NEXTVAL('globals_holdsdesignation_id_seq');
            """)
                
            cursor.execute("""
                SELECT SETVAL('globals_holdsdesignation_id_seq', COALESCE(MAX(id), 1))
                FROM globals_holdsdesignation;
            """)

            cursor.execute("""
                DROP TRIGGER IF EXISTS check_basic_designation ON globals_holdsdesignation;
            """)
                
            cursor.execute("""
                DROP FUNCTION IF EXISTS enforce_single_basic_designation();
            """)
                
            cursor.execute("""
                CREATE OR REPLACE FUNCTION enforce_single_basic_designation()
                RETURNS TRIGGER AS $$
                    BEGIN
                        IF NEW.designation_id IS NOT NULL AND (
                        SELECT basic 
                        FROM globals_designation 
                        WHERE id = NEW.designation_id
                    ) = TRUE THEN
                        IF (
                            SELECT COUNT(*) 
                            FROM globals_holdsdesignation h 
                            JOIN globals_designation d 
                            ON h.designation_id = d.id
                            WHERE h.user_id = NEW.user_id AND d.basic = TRUE
                    ) > 0 THEN
                            RAISE EXCEPTION 'A user can only have one basic designation.';
                        END IF;
                    END IF;

                    RETURN NEW;
                END;
                $$ LANGUAGE plpgsql;
            """)
                
            cursor.execute("""
                CREATE TRIGGER check_basic_designation
                BEFORE INSERT OR UPDATE ON globals_holdsdesignation
                FOR EACH ROW
                EXECUTE FUNCTION enforce_single_basic_designation();
            """)

            cursor.execute("""
                UPDATE globals_designation
                SET basic = TRUE
                WHERE name IN ('Professor', 'Associate Professor', 'Assistant Professor', 'student');
            """)

            cursor.execute("""
                UPDATE globals_designation
                SET category = CASE
                    WHEN name IN ('Professor', 'Associate Professor', 'Assistant Professor', 
                                'HOD (CSE)', 'HOD (ECE)', 'HOD (ME)', 'HOD (Design)', 
                                'HOD (NS)', 'HOD (Liberal Arts)')
                    THEN 'faculty'
                    WHEN name IN ('student', 'co-ordinator', 'co co-ordinator')
                    THEN 'student'
                    ELSE category
                END
                WHERE name IS NOT NULL;
            """)


        return JsonResponse({"success": True, "message": "Database updates completed successfully."})
    except Exception as e:
        return JsonResponse({"success": False, "error": str(e)})    
