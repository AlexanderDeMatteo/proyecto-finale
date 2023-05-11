"""empty message

Revision ID: 51e6073e5a10
Revises: 
Create Date: 2023-05-02 12:13:41.703543

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '51e6073e5a10'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('last_name', sa.String(length=120), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=256), nullable=False),
    sa.Column('is_psicologo', sa.Boolean(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_online', sa.Boolean(), nullable=False),
    sa.Column('salt', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('salt')
    )
    op.create_table('psycho_consultation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('monto', sa.String(length=25), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('schedule',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('psychologist_id', sa.Integer(), nullable=False),
    sa.Column('start_time', sa.String(length=10), nullable=False),
    sa.Column('end_time', sa.String(length=10), nullable=False),
    sa.ForeignKeyConstraint(['psychologist_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_address',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('psychologist_id', sa.Integer(), nullable=False),
    sa.Column('country', sa.String(length=120), nullable=True),
    sa.Column('state', sa.String(length=120), nullable=True),
    sa.Column('city', sa.String(length=120), nullable=True),
    sa.Column('address', sa.String(length=300), nullable=True),
    sa.Column('status', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['psychologist_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('psychologist_id')
    )
    op.create_table('user_profile_info',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('profile_picture', sa.String(length=500), nullable=True),
    sa.Column('dob', sa.String(length=20), nullable=True),
    sa.Column('dni', sa.String(length=30), nullable=True),
    sa.Column('gender', sa.String(length=10), nullable=True),
    sa.Column('phone_number', sa.String(length=25), nullable=True),
    sa.Column('fpv_number', sa.String(length=25), nullable=True),
    sa.Column('specialty_area', sa.String(length=120), nullable=True),
    sa.Column('city', sa.String(length=25), nullable=True),
    sa.Column('state', sa.String(length=25), nullable=True),
    sa.Column('twitter', sa.String(length=25), nullable=True),
    sa.Column('facebook', sa.String(length=25), nullable=True),
    sa.Column('instagram', sa.String(length=25), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('facebook'),
    sa.UniqueConstraint('fpv_number'),
    sa.UniqueConstraint('instagram'),
    sa.UniqueConstraint('twitter'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('psych_academic_info',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=300), nullable=True),
    sa.Column('institute', sa.String(length=100), nullable=True),
    sa.Column('graduation_date', sa.String(length=30), nullable=True),
    sa.Column('certificate_url', sa.String(length=300), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user_profile_info.user_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('psych_experiences',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user_profile_info.user_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('psych_therapeutic_strategies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=300), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user_profile_info.user_id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id', 'url', 'description', name='unique_psych_image_url')
    )
    op.create_table('session',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('psychologist_id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=True),
    sa.Column('schedule_id', sa.Integer(), nullable=False),
    sa.Column('reserved', sa.Boolean(), nullable=True),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('date', sa.String(length=50), nullable=False),
    sa.Column('room_number', sa.String(length=200), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['psychologist_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['schedule_id'], ['schedule.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('room_number'),
    sa.UniqueConstraint('schedule_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('session')
    op.drop_table('psych_therapeutic_strategies')
    op.drop_table('psych_experiences')
    op.drop_table('psych_academic_info')
    op.drop_table('user_profile_info')
    op.drop_table('user_address')
    op.drop_table('schedule')
    op.drop_table('psycho_consultation')
    op.drop_table('user')
    # ### end Alembic commands ###