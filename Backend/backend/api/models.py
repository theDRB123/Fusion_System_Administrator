# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'

class GlobalsDepartmentinfo(models.Model):
    name = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = 'globals_departmentinfo'


class GlobalsDesignation(models.Model):
    name = models.CharField(unique=True, max_length=50)
    full_name = models.CharField(max_length=100)
    type = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'globals_designation'


class GlobalsExtrainfo(models.Model):
    id = models.CharField(primary_key=True, max_length=50)
    title = models.CharField(max_length=20)
    sex = models.CharField(max_length=2)
    date_of_birth = models.DateField()
    user_status = models.CharField(max_length=50)
    address = models.TextField()
    phone_no = models.BigIntegerField(blank=True, null=True)
    user_type = models.CharField(max_length=20)
    profile_picture = models.CharField(max_length=100, blank=True, null=True)
    about_me = models.TextField()
    date_modified = models.DateTimeField(blank=True, null=True)
    department = models.ForeignKey(GlobalsDepartmentinfo, models.DO_NOTHING, blank=True, null=True)
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'globals_extrainfo'


class GlobalsFaculty(models.Model):
    id = models.OneToOneField(GlobalsExtrainfo, models.DO_NOTHING, primary_key=True)

    class Meta:
        managed = False
        db_table = 'globals_faculty'


class GlobalsFeedback(models.Model):
    rating = models.IntegerField()
    feedback = models.TextField()
    timestamp = models.DateTimeField()
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'globals_feedback'


class GlobalsHoldsdesignation(models.Model):
    held_at = models.DateTimeField()
    designation = models.ForeignKey(GlobalsDesignation, models.DO_NOTHING)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    working = models.ForeignKey(AuthUser, models.DO_NOTHING, related_name='globalsholdsdesignation_working_set')

    class Meta:
        managed = False
        db_table = 'globals_holdsdesignation'
        unique_together = (('user', 'designation'), ('working', 'designation'),)


class GlobalsIssue(models.Model):
    report_type = models.CharField(max_length=63)
    module = models.CharField(max_length=63)
    closed = models.BooleanField()
    text = models.TextField()
    title = models.CharField(max_length=255)
    timestamp = models.DateTimeField()
    added_on = models.DateTimeField()
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'globals_issue'


class GlobalsIssueImages(models.Model):
    issue = models.ForeignKey(GlobalsIssue, models.DO_NOTHING)
    issueimage = models.ForeignKey('GlobalsIssueimage', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'globals_issue_images'
        unique_together = (('issue', 'issueimage'),)


class GlobalsIssueSupport(models.Model):
    issue = models.ForeignKey(GlobalsIssue, models.DO_NOTHING)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'globals_issue_support'
        unique_together = (('issue', 'user'),)


class GlobalsIssueimage(models.Model):
    image = models.CharField(max_length=100)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'globals_issueimage'


class GlobalsModuleaccess(models.Model):
    designation = models.CharField(max_length=155)
    program_and_curriculum = models.BooleanField()
    course_registration = models.BooleanField()
    course_management = models.BooleanField()
    other_academics = models.BooleanField()
    spacs = models.BooleanField()
    department = models.BooleanField()
    examinations = models.BooleanField()
    hr = models.BooleanField()
    iwd = models.BooleanField()
    complaint_management = models.BooleanField()
    fts = models.BooleanField()
    purchase_and_store = models.BooleanField()
    rspc = models.BooleanField()
    hostel_management = models.BooleanField()
    mess_management = models.BooleanField()
    gymkhana = models.BooleanField()
    placement_cell = models.BooleanField()
    visitor_hostel = models.BooleanField()
    phc = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'globals_moduleaccess'


class GlobalsStaff(models.Model):
    id = models.OneToOneField(GlobalsExtrainfo, models.DO_NOTHING, primary_key=True)

    class Meta:
        managed = False
        db_table = 'globals_staff'
